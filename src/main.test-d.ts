import { expectType } from 'tsd'

import setErrorStack from 'set-error-stack'

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
