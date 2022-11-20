type NormalizeError<ErrorArg> = ErrorArg extends Error ? ErrorArg : Error

/**
 * Sets `error.message = newMessage`.
 *
 * Returns `error`. If `error` is not an `Error` in
 * stance, it is converted to one.
 *
 * If `error.stack` contains `currentMessage`, it is replaced by `newMessage`.
 * `currentMessage` is the error message currently included in `error.stack`. It
 * defaults to `error.message`, which is usually best.
 *
 * @example
 * ```js
 * const error = new Error('one')
 * console.log(error.message) // 'one'
 * console.log(error.stack) // 'Error: one ...'
 *
 * setErrorStack(error, 'two')
 * console.log(error.message) // 'two'
 * console.log(error.stack) // 'Error: two ...'
 * ```
 */
export default function setErrorStack<ErrorArg>(
  error: ErrorArg,
  stack: string,
): NormalizeError<ErrorArg>
