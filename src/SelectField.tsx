import * as model from './model'
import * as assert from './assert'
import * as an from '@automerge/automerge/next'

function SelectField(
  props: {
    doc: model.Document;
    changeDoc: model.ChangeDoc;
    label: string;
    path: Array<string>;
    options: Array<string>;
  }
) {
  const rawString = model.traverseDocument(props.doc, props.path);
  assert.isObject(rawString);

  const value = rawString.val;
  assert.isString(value);

  return <label>
    {props.label}:

    <select
      onChange={
        (e) => {
          props.changeDoc((thatDoc) => {
            let thatInstance: any = thatDoc;
            assert.isObject(thatInstance)

            for (let i = 0; i < props.path.length - 1; i++) {
              thatInstance = thatInstance[props.path[i]];
              assert.isObject(thatInstance)
            }
            assert.isObject(thatInstance)

            const lastSegment:string = props.path[props.path.length - 1];

            assert.isObject(thatInstance);

            thatInstance[lastSegment] = new an.RawString(e.target.value);
          })
        }
      }

      defaultValue={value}
    >
      {
        props.options.map(
          (optionValue) => <option
            key={optionValue}
          >{optionValue}</option>
        )
      }
    </select>
  </label>
}

export default SelectField
