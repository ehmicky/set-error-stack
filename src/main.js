import normalizeException from 'normalize-exception'

// Properly update an error's stack
const setErrorStack = (error, newStack) => {
  if (typeof newStack !== 'string') {
    throw new TypeError(`Stack trace must be a string: ${newStack}`)
  }

  const errorA = normalizeException(error)
  const { name, stack: currentStack } = errorA

  if (newStack === currentStack) {
    return errorA
  }

  setNonEnumProp(errorA, 'stack', newStack)
  updateMessage({ error: errorA, newStack, currentStack, name })
  return errorA
}

export default setErrorStack

// In V8, `error.stack` includes `error.message`, but `error.message` is not
// updated when `error.stack` is modified.
// This fixes this.
// This is a noop in other JavaScript engines.
const updateMessage = ({ error, newStack, currentStack, name }) => {
  if (getStackMessage(currentStack, name) === undefined) {
    return
  }

  const message = getStackMessage(newStack, name)

  if (message !== undefined) {
    setNonEnumProp(error, 'message', message)
  }
}

const getStackMessage = (stack, name) => {
  const startIndex = getStartIndex(stack, name)

  if (startIndex === -1) {
    return
  }

  const stackA = stack.slice(startIndex)
  const endIndex = stackA.indexOf('\n    at ')

  if (endIndex === -1) {
    return
  }

  return stackA.slice(0, endIndex)
}

const getStartIndex = (stack, name) => {
  const namePrefix = `${name}: `

  if (stack.startsWith(namePrefix)) {
    return namePrefix.length
  }

  const startIndex = stack.indexOf(`\n${namePrefix}`)
  return startIndex === -1 ? startIndex : startIndex + namePrefix.length + 1
}

const setNonEnumProp = (error, propName, value) => {
  Object.defineProperty(error, propName, {
    value,
    enumerable: false,
    writable: true,
    configurable: true,
  })
}
