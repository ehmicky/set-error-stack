import setErrorStack, { Options } from 'set-error-stack'
import { expectType, expectAssignable } from 'tsd'

expectType<object>(setErrorStack(true))

setErrorStack(true, {})
expectAssignable<Options>({})
