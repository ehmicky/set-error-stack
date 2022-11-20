import { expectType, expectError } from 'tsd'

import setErrorStack from 'set-error-stack'

const error = new Error('test')
expectType<Error>(setErrorStack(error, ''))

expectError(setErrorStack(error))
expectError(setErrorStack(error, true))
expectError(setErrorStack(error, '', ''))

expectType<Error>(setErrorStack(null, ''))
expectType<true>(setErrorStack(error as Error & { prop: true }, '').prop)
