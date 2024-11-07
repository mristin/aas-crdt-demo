import * as model from './model'
import TextField from "./TextField";
import LoadFileBase64 from "./LoadFileBase64";

function Blob(
  props: {
    doc: model.Document;
    changeDoc: model.ChangeDoc;
    objectId: string;
  }
) {
  const sme = props.doc.objectMap[props.objectId];
  model.assertIsBlob(sme)

  return (
    <div>
      <h5>Blob {sme.idShort}</h5>

      <TextField
        doc={props.doc}
        changeDoc={props.changeDoc}
        label="ID-short"
        path={["objectMap", props.objectId, "idShort"]}
      />

      <LoadFileBase64
        doc={props.doc}
        changeDoc={props.changeDoc}
        label="Value"
        path={["objectMap", props.objectId, "value"]}
      />
    </div>
  )
}

export default Blob
