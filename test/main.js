import test from 'ava'
import setErrorStack from 'set-error-stack'

test('Dummy test', (t) => {
  t.true(setErrorStack(true))
})
