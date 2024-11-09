import * as am from '@automerge/automerge'
import * as an from '@automerge/automerge/next'
import * as aas from '@aas-core-works/aas-core3.0-typescript'

import * as model from './model'
import * as toAas from './toAas'
import Submodel from "./Submodel";
import ItemList from "./ItemList";

import './App.css'

function exportToFile(
  environment: model.Environment,
  objectMap: model.Dictionary<Object>
): void {
  const aasEnvironment = toAas.exportEnvironment(environment, objectMap);
  const jsonable = aas.jsonization.toJsonable(aasEnvironment);

  const text = JSON.stringify(jsonable);

  const element = document.createElement('a');
  element.setAttribute(
    'href',
    'data:text/json;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', "environment.json");

  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

export function Environment(props: {
  doc: model.Document;
  changeDoc: model.ChangeDoc;
}) {
  return (
    <div>
      <h1>Environment</h1>

      <button
        onClick={() => exportToFile(props.doc.environment, props.doc.objectMap)}
      >Export
      </button>

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