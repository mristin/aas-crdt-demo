import * as an from '@automerge/automerge/next'
import * as model from './model'
import * as assert from './assert'
import "./ItemList.css"

/**
 * Move and delete items in a list represented as an item map.
 */
function ItemList(
  props: {
    doc: model.Document;
    changeDoc: model.ChangeDoc;
    getItemMapFromDoc: (doc: model.Document) => model.Dictionary<an.Counter>;
    createComponentForItem: (objectId: string) => JSX.Element;
  }
) {
  const itemMap = props.getItemMapFromDoc(props.doc);
  const sortedItemObjectIds = model.sorted(itemMap);

  if (sortedItemObjectIds.length == 0) {
    return <div/>
  }

  return <div>
    {
      sortedItemObjectIds.map(
        (objectId: string, index: number) => {
          return <div key={objectId} className="item">
            <div className="buttonContainer">
              {
                (index < sortedItemObjectIds.length - 1) &&
                <button onClick={
                  () => {
                    props.changeDoc(thatDoc => {
                      const thatItemMap = props.getItemMapFromDoc(thatDoc);
                      const thatSorted = model.sorted(thatItemMap);

                      const nextObjectId = thatSorted[index + 1];

                      const currentWeight = thatItemMap[objectId]
                      assert.isDefined(currentWeight)

                      const nextWeight = thatItemMap[nextObjectId]
                      assert.isDefined(nextWeight)

                      currentWeight.increment(1);
                      nextWeight.decrement(1);
                    })
                  }
                }>
                  🡇
                </button>
              }

              {
                (index >= 1) &&
                <button onClick={
                  () => {
                    props.changeDoc(thatDoc => {
                      const thatItemMap = props.getItemMapFromDoc(thatDoc);
                      const thatSorted = model.sorted(thatItemMap);

                      const prevObjectId = thatSorted[index - 1];

                      const prevWeight = thatItemMap[prevObjectId];
                      assert.isDefined(prevWeight)

                      const currentWeight = thatItemMap[objectId]
                      assert.isDefined(currentWeight)

                      prevWeight.increment(1);
                      currentWeight.decrement(1);
                    })
                  }
                }>
                  🡅
                </button>
              }

              <button onClick={
                () => {
                  props.changeDoc(thatDoc => {
                    const thatItemMap = props.getItemMapFromDoc(thatDoc);
                    delete thatItemMap[objectId];
                    delete thatDoc.objectMap[objectId];
                  })
                }
              }>
                🗑
              </button>
            </div>

            {props.createComponentForItem(objectId)}
          </div>
        }
    )
    }
  </div>;
}

export default ItemList