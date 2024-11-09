import * as aas from "@aas-core-works/aas-core3.0-typescript";

import * as model from "./model";
import * as assert from './assert'

function exportDateTypeDefXsd(
  dateTypeDefXsd: string
): aas.types.DataTypeDefXsd {
  switch(dateTypeDefXsd) {
    case model.DATA_TYPE_DEF_XSD_DOUBLE:
      return aas.types.DataTypeDefXsd.Double;
    case model.DATA_TYPE_DEF_XSD_STRING:
      return aas.types.DataTypeDefXsd.String;
    default:
      throw new Error("Unhandled dateTypeDefXsd: " + dateTypeDefXsd)
  }
}

function exportPropertyCounter(
  prop: model.PropertyCounter
): aas.types.Property {
  const result = new aas.types.Property(
    exportDateTypeDefXsd(prop.valueType.val)
  )
  result.idShort = (prop.idShort.length > 0) ? prop.idShort : null;
  result.value = prop.value.value.toString();

  return result
}

function exportPropertyText(prop: model.PropertyText): aas.types.Property {
  const result = new aas.types.Property(
    exportDateTypeDefXsd(prop.valueType.val)
  )
  result.idShort = (prop.idShort.length > 0) ? prop.idShort : null;
  result.value = prop.value

  return result
}

function exportBlob(blob: model.Blob): aas.types.Blob {
  const result = new aas.types.Blob(
    blob.contentType
  )
  result.idShort = (blob.idShort.length > 0) ? blob.idShort : null;

  if (blob.value.val.length > 0) {
    assert.isString(blob.value.val)

    const valueOrError = aas.common.base64Decode(
      model.blobDataWithoutPrefix(
        blob.value.val
      )
    );
    if (valueOrError.error) {
      throw new Error(
        "Unexpected failure to base64-decode: " + valueOrError.error
        + "; the blob was: " + blob.value.val
      );
    }

    result.value = valueOrError.mustValue();
  }


  return result;
}

function exportSubmodelElementList(
  smel: model.SubmodelElementList,
  objectMap: model.Dictionary<Object>
): aas.types.SubmodelElementList {
  const result = new aas.types.SubmodelElementList(
    aas.types.AasSubmodelElements.SubmodelElement
  )
  result.idShort = (smel.idShort.length > 0) ? smel.idShort : null;

  if (model.countItemMap(smel.value) > 0) {
    result.value = []
    for (const objectId of model.sorted(smel.value)) {
      const item = objectMap[objectId];

      result.value.push(
        exportSubmodelElement(
          item as model.SubmodelElement,
          objectMap
        )
      )
    }
  }

  return result;
}

function exportSubmodelElement(
  sme: model.SubmodelElement,
  objectMap: model.Dictionary<Object>
): aas.types.ISubmodelElement {
  switch(sme.submodelElementType) {
    case "PropertyCounter":
      return exportPropertyCounter(sme as model.PropertyCounter)
    case "PropertyText":
      return exportPropertyText(sme as model.PropertyText)
    case "Blob":
      return exportBlob(sme as model.Blob)
    case "SubmodelElementList":
      return exportSubmodelElementList(
        sme as model.SubmodelElementList,
        objectMap
      )
    default:
      throw new Error(
        "Unhandled submodel element type: " + sme.submodelElementType
      )
  }
}

function exportSubmodel(
  submodel: model.Submodel,
  objectMap: model.Dictionary<Object>
): aas.types.Submodel {
  const result = new aas.types.Submodel(submodel.id)
  if (model.countItemMap(submodel.submodelElements)) {
    result.submodelElements = []
    for (const objectId of model.sorted(submodel.submodelElements)) {
      const item = objectMap[objectId];
      result.submodelElements.push(exportSubmodelElement(
        item as model.SubmodelElement,
        objectMap
      ));
    }
  }

  return result;
}

export function exportEnvironment(
  environment: model.Environment,
  objectMap: model.Dictionary<Object>
): aas.types.Environment {
  const result = new aas.types.Environment();

  if (model.countItemMap(environment.submodels)) {
    result.submodels = []
    for (const objectId of model.sorted(environment.submodels)) {
      const item = objectMap[objectId];

      result.submodels.push(exportSubmodel(item as model.Submodel, objectMap));
    }
  }

  return result;
}
