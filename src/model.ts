import * as an from '@automerge/automerge/next'
import * as assert from "./assert";
import PropertyCounter from "./PropertyCounter";

// NOTE (mristin):
// This typing trick to represent plain JavaScript objects as dictionaries
// has been taken from:
// https://gist.github.com/ianmstew/2b60f54fc605f81bf53a46d6b6bc9868
type notUndefined = string | number | boolean | symbol | object;

export interface Dictionary<T extends notUndefined = notUndefined> {
  [key: string]: T | undefined;
}

/**
 * Sort a list of items.
 *
 * @param itemMap the keys are object IDs, the values are item weights.
 * @return items sorted first by weight, than by the object IDs.
 */
export function sorted(
  itemMap: Dictionary<an.Counter>
): Array<string> {
  const objectIdsWeights: Array<[string, number]> = [];

  for (const key in itemMap) {
    if (!itemMap.hasOwnProperty(key)) {
      continue;
    }

    const weightCounter = itemMap[key];
    assert.isDefined(weightCounter)
    objectIdsWeights.push([key, weightCounter.value]);
  }

  objectIdsWeights.sort(
    (
      a: [string, number],
      b: [string, number]
    ) => {
      if (a[1] < b[1]) {
        return -1
      } else if (a[1] > b[1]) {
        return 1
      } else {
        if (a[0] < b[0]) {
          return -1
        } else if (a[0] > b[0]) {
          return 1;
        } else {
          throw new Error(
            "Unexpected equal object ID for two items to be sorted"
          )
        }
      }
    });

  return objectIdsWeights.map(objectIdWeight => objectIdWeight[0]);
}

export function countItemMap(itemMap: Dictionary<an.Counter>) {
  return Object.keys(itemMap).length;
}

export type SubmodelElementType = (
  "PropertyCounter"
  | "PropertyText"
  | "Blob"
  | "SubmodelElementList"
  );

export const VALUE_TYPE_DOUBLE: string = "DOUBLE";
export const VALUE_TYPE_STRING: string = "STRING";
export const VALUE_TYPES: Array<string> = [
  VALUE_TYPE_DOUBLE,
  VALUE_TYPE_STRING
];

export interface SubmodelElement {
  idShort: string
  submodelElementType: SubmodelElementType
}

export interface PropertyCounter extends SubmodelElement {
  value: an.Counter;
  valueType: an.RawString;
}

export interface PropertyText extends SubmodelElement {
  value: string;
  valueType: an.RawString;
}

export interface Blob extends SubmodelElement {
  value: an.RawString;
}

export interface SubmodelElementList extends SubmodelElement {
  value: Dictionary<an.Counter>
}

function assertSubmodelElementType(
  something: unknown,
  expectedSubmodelElementType: SubmodelElementType
) {
  assert.isObject(something)
  const submodelElementType = something["submodelElementType"]
  assert.isString(submodelElementType)


  if (submodelElementType !== expectedSubmodelElementType) {
    throw new Error(
      "Expected " + expectedSubmodelElementType
      + ", but got: " + submodelElementType
    )
  }
}

export function assertIsPropertyCounter(
  something: unknown
): asserts something is PropertyCounter {
  assertSubmodelElementType(something, "PropertyCounter")
}

export function assertIsPropertyText(
  something: unknown
): asserts something is PropertyText {
  assertSubmodelElementType(something, "PropertyText")
}

export function assertIsBlob(
  something: unknown
): asserts something is Blob {
  assertSubmodelElementType(something, "Blob")
}

export function assertIsSubmodelElementList(
  something: unknown
): asserts something is SubmodelElementList {
  assertSubmodelElementType(
    something,
    "SubmodelElementList"
  )
}

export interface Submodel {
  id: string;

  /**
   * Map object IDs of the submodel elements to their weights in the list.
   */
  submodelElements: Dictionary<an.Counter>
}

export interface Environment {
  /**
   * Map object IDs of the submodels to their weights in the list.
   */
  submodels: Dictionary<an.Counter>
}

export interface State {
  environment: Environment;

  /**
   * Map object ID to the object.
   *
   * Each element in the environment is contained here, and referenced.
   */
  objectMap: Dictionary<Object>
}

export type Document = an.Doc<State>;
export type ChangeDoc = (
  changeFn: an.ChangeFn<State>,
  options?: an.ChangeOptions<State> | undefined
) => void;

export function traverseDocument(
  doc: Document,
  path: Array<string>
): unknown {
  let value: any = doc;
  for (const segment of path) {
    value = value[segment];
  }

  return value
}

export function blobDataWithoutPrefix(data: string): string {
  const marker = 'base64,'
  const i = data.indexOf(marker)
  if (i < 0) {
    return data;
  }

  return data.substring(i + marker.length);
}