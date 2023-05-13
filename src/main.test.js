import test from 'ava'
import setErrorStack from 'set-error-stack'
import { each } from 'test-each'

const setNewStack = (error, prefix = '') => {
  setErrorStack(error, error.stack.replace('Error: one', `${prefix}Error: two`))
}

each([null, true, undefined], ({ title }, stack) => {
  test(`Validate stack | ${title}`, (t) => {
    t.throws(setErrorStack.bind(undefined, new Error('one'), stack))
  })
})

each([undefined, null, '', {}], ({ title }, notAnError) => {
  test(`Normalizes the error | ${title}`, (t) => {
    t.true(setErrorStack(notAnError, '') instanceof Error)
  })
})

test('Returns the error', (t) => {
  const error = new Error('one')
  t.is(setErrorStack(error, ''), error)
})

test('Sets error stack', (t) => {
  const error = new Error('one')
  setErrorStack(error, 'test')
  t.is(error.stack, 'test')
  t.false(Object.getOwnPropertyDescriptor(error, 'stack').enumerable)
})

test('Sets error message', (t) => {
  const error = new Error('one')
  setNewStack(error)
  t.is(error.message, 'two')
  t.false(Object.getOwnPropertyDescriptor(error, 'message').enumerable)
})

test('Does not set error message if the stack has not changed', (t) => {
  const error = new Error('one')
  error.message = 'other'
  setErrorStack(error, error.stack)
  t.is(error.message, 'other')
})

test('Does not set error message if the old stack does not contain it', (t) => {
  const error = new Error('one')
  error.message = 'other'
  setNewStack(error)
  t.is(error.message, 'other')
})

test('Does not set error message if the old stack is invalid', (t) => {
  const error = new Error('one')
  error.stack = error.message
  setNewStack(error)
  t.is(error.message, 'one')
})

test('Sets error message even if stack includes message but does not start with it', (t) => {
  const error = new Error('one')
  setNewStack(error, 'prefix\n')
  t.is(error.message, 'two')
})

test('Does not set error message if stack includes message but does not start with it without a newline', (t) => {
  const error = new Error('one')
  setNewStack(error, 'prefix: ')
  t.is(error.message, 'one')
})

test('Does not set error message if the stack is missing a V8 first line', (t) => {
  const error = new Error('one')
  error.stack = 'Error:'
  setErrorStack(error, error.stack.replace('Error: one', 'two'))
  t.is(error.message, 'one')
})

test('Does not set error message if the stack is missing V8 stack lines', (t) => {
  const error = new Error('one')
  setErrorStack(error, 'Error: two')
  t.is(error.message, 'one')
})
