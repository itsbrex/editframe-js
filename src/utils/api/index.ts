import camelCaseKeys from 'camelcase-keys'
import fetch from 'cross-fetch'

import { ApiHeaderKey, ApiHeaderValue, ApiHeaders, FetchOptions, HTTPMethod, MakeRequest, MimeType } from 'constant'

import { version } from '../../../package.json'

export const initializeFetchUtil = (baseURL: string): MakeRequest => {
  const fetchMethods = makeFetchMethods({ baseURL })

  return async ({ data, headers, method = HTTPMethod.get, url }): Promise<unknown> => {
    const response = await fetchMethods[method]({ body: data, headers, url })

    if (!response.ok) {
      throw new Error(`${response.url} - ${response.statusText}`)
    }

    const json = await response.json()
    const camelCasedJson = camelCaseKeys(json, { deep: true })

    if (camelCasedJson.data) {
      return camelCasedJson.data
    }

    return camelCasedJson
  }
}

const makeFetchMethods = ({
  baseURL,
}: {
  baseURL: string
}): Record<string, (args: { body?: any; headers?: ApiHeaders; url: string }) => Promise<Response>> => {
  const fetcher = (url: string, options?: FetchOptions) =>
    url.startsWith('/') ? fetch(`${baseURL}${url}`, options) : fetch(url, options)

  return {
    [HTTPMethod.get]: async ({ headers, url }) => fetcher(url, { headers }),
    [HTTPMethod.post]: async ({ body, headers, url }) => fetcher(url, { body, headers, method: HTTPMethod.post }),
    [HTTPMethod.put]: async ({ body, headers, url }) => fetcher(url, { body, headers, method: HTTPMethod.put }),
  }
}

export const baseURL = (host: string, version: number): string => `${host}/v${version}`

export const makeHeaders = ({
  clientId,
  isForm = false,
  token,
}: {
  clientId: string
  isForm?: boolean
  token: string
}): ApiHeaders => {
  const headers: ApiHeaders = {
    [ApiHeaderKey.userAgent]: `${ApiHeaderValue.editframeJs}${version}`,
    [ApiHeaderKey.editframeClientId]: clientId,
    [ApiHeaderKey.authorization]: `${ApiHeaderValue.bearer}${token}`,
  }

  if (isForm) {
    headers[ApiHeaderKey.accept] = MimeType.json
    headers[ApiHeaderKey.xRequestedWith] = ApiHeaderValue.xRequestedWithXML
  } else {
    headers[ApiHeaderKey.contentType] = MimeType.json
  }

  return headers
}
