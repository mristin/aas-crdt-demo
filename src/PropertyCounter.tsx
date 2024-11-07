import * as model from './model'
import Counter from "./Counter";
import TextField from "./TextField";
import SelectField from "./SelectField";


function PropertyCounter(
  props: {
    doc: model.Document;
    changeDoc: model.ChangeDoc;
    objectId: string;
  }
) {
  const sme = props.doc.objectMap[props.objectId];
  model.assertIsPropertyCounter(sme)

  if (sme.submodelElementType != "PropertyCounter") {
    throw new Error("Unexpected runtime type: " + sme.submodelElementType);
  }

  return (
    <div>
      <h5>Property Counter {sme.idShort}</h5>

      <TextField
        doc={props.doc}
        changeDoc={props.changeDoc}
        label="ID-short"
        path={["objectMap", props.objectId, "idShort"]}
      />

      <label>
        Value:
        <Counter
          value={sme.value.value}
          onIncrement={
            () => {
              props.changeDoc(thatDoc => {
                const thatSme = thatDoc.objectMap[props.objectId];
                model.assertIsPropertyCounter(thatSme)
                thatSme.value.increment(1);
              })
            }
          }

          onDecrement={
            () => {
              props.changeDoc(thatDoc => {
                const thatSme = thatDoc.objectMap[props.objectId];
                model.assertIsPropertyCounter(thatSme);

                thatSme.value.decrement(1);
              })
            }
          }
        />
      </label>

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

export default PropertyCounter
