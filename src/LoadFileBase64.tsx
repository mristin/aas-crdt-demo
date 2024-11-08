import * as assert from './assert'
import * as model from "./model";
import * as an from '@automerge/automerge/next'

import "./LoadFileBase64.css"

export default function LoadFileBase64(
  props: {
    doc: model.Document;
    changeDoc: model.ChangeDoc;
    label: string;
    path: Array<string>;
  }
) {
  const rawString = model.traverseDocument(props.doc, props.path)
  assert.isObject(rawString)

  const data = rawString.val
  assert.isString(data)

  return (
    <>
      {
        (data.length > 0)
        && (
          <div className="content">
            {
              (data.startsWith('data:image'))
                ? <img src={data} alt="Content"/>
                :
                <span>Some {model.blobDataWithoutPrefix(data).length} byte(s)</span>
            }
          </div>
        )
      }

      <button onClick={
        () => {
          const inputEl = document.createElement("input")
          inputEl.style.display = 'none';
          inputEl.type = 'file';

          inputEl.onchange = (e: Event) => {
            const target = e.target as HTMLInputElement;

            if (
              target.files === null
              || target.files === undefined
              || target.files.length === 0
            ) {
              return;
            }

            const file = target.files[0];

            const reader = new FileReader()

            reader.onload = () => {
              assert.isString(reader.result)

              const data = reader.result;

              props.changeDoc(thatDoc => {
                let thatInstance: any = thatDoc;
                for (let i = 0; i < props.path.length - 1; i++) {
                  thatInstance = thatInstance[props.path[i]];
                }

                const lastSegment: string = props.path[props.path.length - 1];

                assert.isObject(thatInstance);

                thatInstance[lastSegment] = new an.RawString(data);
              })
            }

            reader.readAsDataURL(file);
          }

          inputEl.click()
        }
      }
      >Upload
      </button>
    </>
  );
}
