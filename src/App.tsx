import '@picocss/pico/css/pico.min.css'
import './App.css'
import {useDocument} from '@automerge/automerge-repo-react-hooks'
import type {AutomergeUrl} from '@automerge/automerge-repo'
import * as model from './model'
import Environment from "./Environment";

type Props = {
  docUrl: AutomergeUrl
}

function App(props: Props) {
  const [doc, changeDoc] = useDocument<model.State>(props.docUrl);

  if (doc === undefined) {
    return <div>
      The document for the {props.docUrl} could not be found.
    </div>
  }

  return <Environment doc={doc} changeDoc={changeDoc}/>
}

export default App
