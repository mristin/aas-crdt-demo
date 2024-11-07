import * as model from './model'
import ItemList from "./ItemList";
import AddSubmodelElementButtons from "./AddSubmodelElementButtons";
import SubmodelElement from "./SubmodelElement";
import TextField from "./TextField";

function Submodel(
  props: {
    doc: model.Document;
    changeDoc: model.ChangeDoc;
    objectId: string;
  }
) {
  const submodel = (
    props.doc.objectMap[props.objectId] as model.Submodel
  );


  return (
    <div>
      <h2>Submodel {submodel.id}</h2>
      <TextField
        doc={props.doc}
        changeDoc={props.changeDoc}
        label="ID"
        path={["objectMap", props.objectId, "id"]}
      />

      <h4>Submodel Elements</h4>

      <ItemList
        doc={props.doc}
        changeDoc={props.changeDoc}
        getItemMapFromDoc={(thatDoc) => {
          const submodel = (
            thatDoc.objectMap[props.objectId] as model.Submodel
          )
          return submodel.submodelElements;
        }}
        createComponentForItem={
          (objectId) => <SubmodelElement
            doc={props.doc}
            changeDoc={props.changeDoc}
            objectId={objectId}
          />
        }
      />

      <div>
        <AddSubmodelElementButtons
          doc={props.doc}
          changeDoc={props.changeDoc}
          getItemMapFromDoc={
            (thatDoc) => {
              const submodel = (
                thatDoc.objectMap[props.objectId] as model.Submodel
              );
              return submodel.submodelElements;
            }
          }
        />
      </div>

    </div>
  )
}

export default Submodel