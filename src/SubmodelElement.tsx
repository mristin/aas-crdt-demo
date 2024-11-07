import * as model from './model'
import PropertyCounter from "./PropertyCounter";
import PropertyText from "./PropertyText";
import Blob from "./Blob";
import SubmodelElementList from "./SubmodelElementList";

type Props = {
  doc: model.Document;
  changeDoc: model.ChangeDoc;
  objectId: string;
}

function SubmodelElement(
  props: Props
) {
  const sme = (
    props.doc.objectMap[props.objectId] as model.SubmodelElement
  );

  switch (sme.submodelElementType) {
    case "PropertyCounter":
      return <PropertyCounter
        doc={props.doc}
        changeDoc={props.changeDoc}
        objectId={props.objectId}
      />
    case "PropertyText":
      return <PropertyText
        doc={props.doc}
        changeDoc={props.changeDoc}
        objectId={props.objectId}
      />
    case "Blob":
      return <Blob
        doc={props.doc}
        changeDoc={props.changeDoc}
        objectId={props.objectId}
      />
    case "SubmodelElementList":
      return <SubmodelElementList
        doc={props.doc}
        changeDoc={props.changeDoc}
        objectId={props.objectId}
      />
    default:
      throw new Error(
        "Unexpected submodel element type: " + sme.submodelElementType
      );
  }
}

export default SubmodelElement
