import './App.css'
import * as model from './model'
import * as am from '@automerge/automerge'
import * as an from '@automerge/automerge/next'
import Submodel from "./Submodel";
import ItemList from "./ItemList";

type Props = {
  doc: model.Document;
  changeDoc: model.ChangeDoc;
}

export function Environment(props: Props) {
  return (
    <div>
      <h1>Environment</h1>

      <h2>Submodels</h2>

      <ItemList
        doc={props.doc}
        changeDoc={props.changeDoc}
        getItemMapFromDoc={(thatDoc) => thatDoc.environment.submodels}
        createComponentForItem={
          (objectId: string) => {
            return <div key={objectId}>
              <Submodel
                doc={props.doc}
                changeDoc={props.changeDoc}
                objectId={objectId}
              />
            </div>;
          }
        }
      />

      <div>
        <button onClick={
          () => {
            props.changeDoc(thatDoc => {
              const submodel: model.Submodel = {id: "", submodelElements: {}}
              const uuid = am.uuid();

              thatDoc.objectMap[uuid] = submodel;

              const thatItemMap = thatDoc.environment.submodels;
              thatItemMap[uuid] = new an.Counter(
                model.countItemMap(thatItemMap)
              );
            })
          }
        }>Add Submodel
        </button>
      </div>
    </div>
  )
}

export default Environment