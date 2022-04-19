import camelCaseKeys from 'camelcase-keys'
import fetch from 'cross-fetch'

import {
  ApiAudioMetadata,
  ApiDataValidator,
  ApiHeaderKey,
  ApiHeaderValue,
  ApiHeaders,
  ApiImageMetadata,
  ApiVideoMetadata,
  ApiVideoMetadataType,
  FetchFunction,
  Fetcher,
  MakeFetchFunction,
  MimeType,
} from 'constant'
import { ApiErrorText, VideoErrorText } from 'strings'
import { isApiAudioMetadata, isApiImageMetadata, isApiVideoMetadata } from 'utils/videos'

import { version } from '../../../package.json'

export const baseURL = (host: string, version: number): string => `${host}/v${version}`

export const initializeFetchUtil = (baseUrl: string): FetchFunction => makeRequest(makeFetcher(baseUrl))

const makeFetcher =
  (baseUrl: string): Fetcher =>
  (options) =>
    options.url.startsWith('/') ? fetch(`${baseUrl}${options.url}`, options) : fetch(options.url, options)

export const makeRequest: MakeFetchFunction =
  (fetcher) =>
  async ({ data, headers, method, url }) => {
    const response = await fetcher({ body: data, headers, method, url })

    if (!response.ok) {
      throw new Error(ApiErrorText.requestUnsuccessful(response.url, response.statusText))
    }

    const json = await response.json()
    const camelCasedJson = camelCaseKeys(json, { deep: true })

    if (camelCasedJson.data && !camelCasedJson.links && !camelCasedJson.meta) {
      return camelCasedJson.data
    }

    return camelCasedJson
  }

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

export const validateApiData = <DataType>(data: unknown, validator: ApiDataValidator<DataType>): DataType => {
  if (data && validator.validate(data)) {
    return data
  }

  throw new Error(validator.invalidDataError)
}

export const metadataValidatorsByType = {
  [ApiVideoMetadataType.audio]: (data: unknown): ApiAudioMetadata =>
    validateApiData<ApiAudioMetadata>(data, {
      invalidDataError: VideoErrorText.malformedResponse,
      validate: isApiAudioMetadata,
    }),
  [ApiVideoMetadataType.image]: (data: unknown): ApiImageMetadata =>
    validateApiData<ApiImageMetadata>(data, {
      invalidDataError: VideoErrorText.malformedResponse,
      validate: isApiImageMetadata,
    }),
  [ApiVideoMetadataType.video]: (data: unknown): ApiVideoMetadata =>
    validateApiData<ApiVideoMetadata>(data, {
      invalidDataError: VideoErrorText.malformedResponse,
      validate: isApiVideoMetadata,
    }),
}
