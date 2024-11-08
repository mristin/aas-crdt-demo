export function isString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new Error("Expected a string, but got: " + typeof value)
  }
}

export function isObject(value: unknown): asserts value is Record<string, unknown> {
  if (typeof value !== "object") {
    throw new Error("Expected an object, but got: " + typeof value)
  }
}

export function isDefined<T>(value: T | undefined): asserts value is T {
  if (value === undefined) {
    throw new Error("Unexpectedly undefined")
  }
}
