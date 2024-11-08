import * as an from '@automerge/automerge/next'
import * as model from './model'
import * as assert from './assert'

function TextField(
  props: {
    doc: model.Document;
    changeDoc: model.ChangeDoc;
    label: string;
    path: Array<string>;
  }
) {
  const value = model.traverseDocument(props.doc, props.path)
  assert.isString(value)

  return <label>
    {props.label}:
    <input
      value={value}
      onChange={e => {
        props.changeDoc(thatDoc => {
          an.updateText(
            thatDoc,
            props.path,
            e.target.value
          )
        })
      }}
    />
  </label>
}

export default TextField
