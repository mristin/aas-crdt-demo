import * as model from './model'
import TextField from "./TextField";
import SelectField from "./SelectField";

function PropertyText(
  props: {
    doc: model.Document;
    changeDoc: model.ChangeDoc;
    objectId: string;
  }
) {
  const sme = props.doc.objectMap[props.objectId];
  model.assertIsPropertyText(sme)

  return (
    <div>
      <h5>Property Text {sme.idShort}</h5>

      <TextField
        doc={props.doc}
        changeDoc={props.changeDoc}
        label="ID-short"
        path={["objectMap", props.objectId, "idShort"]}
      />

      <TextField
        doc={props.doc}
        changeDoc={props.changeDoc}
        label="Value"
        path={["objectMap", props.objectId, "value"]}
      />

      <SelectField
        doc={props.doc}
        changeDoc={props.changeDoc}
        label="Value type"
        path={["objectMap", props.objectId, "valueType"]}
        options={model.VALUE_TYPES}
      />
    </div>
  )
}

export default PropertyText
