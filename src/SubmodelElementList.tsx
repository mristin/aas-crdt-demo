import * as model from './model'
import ItemList from "./ItemList";
import SubmodelElement from "./SubmodelElement";
import TextField from "./TextField";
import AddSubmodelElementButtons from "./AddSubmodelElementButtons";

function SubmodelElementList(
  props: {
    doc: model.Document;
    changeDoc: model.ChangeDoc;
    objectId: string;
  }
) {
  const sme = props.doc.objectMap[props.objectId];
  model.assertIsSubmodelElementList(sme)

  return (
    <div>
      <h5>Submodel Element List {sme.idShort}</h5>

      <TextField
        doc={props.doc}
        changeDoc={props.changeDoc}
        label="ID-short"
        path={["objectMap", props.objectId, "idShort"]}
      />

      <label>
        Items

        <ItemList
          doc={props.doc}
          changeDoc={props.changeDoc}

          getItemMapFromDoc={(thatDoc) => {
            const thatSme = thatDoc.objectMap[props.objectId];
            model.assertIsSubmodelElementList(thatSme);

            return thatSme.value;
          }}

          createComponentForItem={
            (objectId) => <SubmodelElement
              doc={props.doc}
              changeDoc={props.changeDoc}
              objectId={objectId}
            />
          }
        />
      </label>

      <div>
        <AddSubmodelElementButtons
          doc={props.doc}
          changeDoc={props.changeDoc}
          getItemMapFromDoc={
            (thatDoc) => {
              const thatSme = thatDoc.objectMap[props.objectId];
              model.assertIsSubmodelElementList(thatSme);
              return thatSme.value;
            }
          }
        />
      </div>
    </div>
  )
}

export default SubmodelElementList