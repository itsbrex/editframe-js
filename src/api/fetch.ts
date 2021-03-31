import fetch from 'cross-fetch'
import camelCaseKeys from 'camelcase-keys'
import FetchError from './Error'

type HeaderOption = { headers?: Record<string, string> }

export type FetchOptions = Omit<RequestInit, 'headers'> &
  HeaderOption

const fetchUtil = async <T = Response>(
  url: RequestInfo,
  options: FetchOptions = {},
  isForm: boolean = false
) => {

  const headers = !isForm
    ? { ...options.headers, 'Content-Type': 'application/json' }
    : { ...options.headers, 'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json' }

  const fetchOptions = options.body
    ? {
        ...options,
        method: options.method || 'get',
        headers,
        body: options.body,
      }
    : {
        ...options,
        method: options.method || 'get',
        headers,
      }

  const response = await fetch(`${url}`, fetchOptions)

  const responseJson = await response.json().catch(() => undefined)
  const json = responseJson
    ? camelCaseKeys(responseJson, { deep: true })
    : undefined

  if (!response.ok) {
    throw new FetchError(response, json['body'])
  }

  if (json) {
    return json as T
  }

  return response
}

export default fetchUtil