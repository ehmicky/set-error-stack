type NormalizeError<ErrorArg> = ErrorArg extends Error ? ErrorArg : Error

/**
 * Sets `error.stack = stack`.
 * If needed, also modifies `error.message` accordingly.
 *
 * Returns `error`. If `error` is not an `Error` instance, it is converted to
 * one.
 *
 * @example
 * ```js
 * const error = new Error('one')
 * console.log(error.stack) // 'Error: one ...'
 * console.log(error.message) // 'one'
 *
 * setErrorStack(error, error.stack.replace('one', 'two'))
 * console.log(error.stack) // 'Error: two ...'
 * console.log(error.message) // 'two'
 * ```
 */
export default function setErrorStack<ErrorArg>(
  error: ErrorArg,
  stack: string,
): NormalizeError<ErrorArg>
