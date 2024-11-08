import * as an from '@automerge/automerge/next'
import * as model from './model'
import * as am from "@automerge/automerge";

function createInstance(
  submodelElementType: model.SubmodelElementType
): model.SubmodelElement {
  switch (submodelElementType) {
    case "PropertyCounter": {
      // noinspection UnnecessaryLocalVariableJS
      const instance: model.PropertyCounter = {
        submodelElementType: "PropertyCounter",
        idShort: "",
        value: new an.Counter(),
        valueType: new an.RawString(model.VALUE_TYPE_DOUBLE)
      }

      return instance;
    }

    case "PropertyText": {
      // noinspection UnnecessaryLocalVariableJS
      const instance: model.PropertyText = {
        submodelElementType: "PropertyText",
        idShort: "",
        value: "",
        valueType: new an.RawString(model.VALUE_TYPE_STRING)
      }

      return instance;
    }

    case "Blob": {
      // noinspection UnnecessaryLocalVariableJS
      const instance: model.Blob = {
        submodelElementType: "Blob",
        idShort: "",
        value: new an.RawString("")
      }

      return instance;
    }

    case "SubmodelElementList": {
      // noinspection UnnecessaryLocalVariableJS
      const instance: model.SubmodelElementList = {
        submodelElementType: "SubmodelElementList",
        idShort: "",
        value: {}
      }

      return instance;
    }
    default:
      throw new Error(
        "Unexpected submodel element type: " + submodelElementType);

  }
}

function AddSubmodelElementButton(
  props: {
    doc: model.Document;
    changeDoc: model.ChangeDoc;
    getItemMapFromDoc: (doc: model.Document) => model.Dictionary<an.Counter>;
    submodelElementType: model.SubmodelElementType;
    label: string;
  }
) {
  return <button onClick={
    () => {
      props.changeDoc(thatDoc => {
        const instance = createInstance(props.submodelElementType);
        const uuid = am.uuid();

        thatDoc.objectMap[uuid] = instance;

        const thatItemMap = props.getItemMapFromDoc(thatDoc);
        thatItemMap[uuid] = new an.Counter(
          model.countItemMap(thatItemMap)
        );
      })
    }
  }>{props.label}</button>
}


function AddSubmodelElementButtons(
  props: {
    doc: model.Document;
    changeDoc: model.ChangeDoc;
    getItemMapFromDoc: (doc: model.Document) => model.Dictionary<an.Counter>;
  }
) {
  return (
    <div className="buttonContainer">
      <AddSubmodelElementButton
        doc={props.doc}
        changeDoc={props.changeDoc}
        getItemMapFromDoc={props.getItemMapFromDoc}
        submodelElementType="PropertyCounter"
        label="Add Property Counter"
      />

      <AddSubmodelElementButton
        doc={props.doc}
        changeDoc={props.changeDoc}
        getItemMapFromDoc={props.getItemMapFromDoc}
        submodelElementType="PropertyText"
        label="Add Property Text"
      />

      <AddSubmodelElementButton
        doc={props.doc}
        changeDoc={props.changeDoc}
        getItemMapFromDoc={props.getItemMapFromDoc}
        submodelElementType="Blob"
        label="Add Blob"
      />

      <AddSubmodelElementButton
        doc={props.doc}
        changeDoc={props.changeDoc}
        getItemMapFromDoc={props.getItemMapFromDoc}
        submodelElementType="SubmodelElementList"
        label="Add Submodel Element List"
      />
    </div>
  );
}

export default AddSubmodelElementButtons;