import setErrorStack from 'set-error-stack'
import { expectType } from 'tsd'

const error = new Error('test')
expectType<Error>(setErrorStack(error, ''))

// @ts-expect-error
setErrorStack(error)
// @ts-expect-error
setErrorStack(error, true)
// @ts-expect-error
setErrorStack(error, '', '')

expectType<Error>(setErrorStack(null, ''))
expectType<true>(setErrorStack(error as Error & { prop: true }, '').prop)
