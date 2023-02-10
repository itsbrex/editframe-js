import fetchMock from 'jest-fetch-mock'

import { ApiHeaderKey, ApiHeaderValue, FetchFunction, HTTPMethod, MimeType } from 'constant'
import { ApiErrorText } from 'strings'

import { baseUrl, initializeFetchUtil, makeHeaders, makeRequest } from './'

describe('baseUrl', () => {
  it('returns a well-formed `baseUrl`', () => {
    const host = 'https://host.com'
    const version = 2

    expect(baseUrl(host, version)).toEqual('https://host.com/v2')
  })
})

describe('initializeFetchUtil', () => {
  const baseUrl = 'https://baseurl.com'
  const url = '/route'
  const data = JSON.stringify({ key: 'value' })
  const request = initializeFetchUtil(baseUrl)
  const postHeaders = makeHeaders({ isForm: true, token: 'token' })

  beforeEach(() => {
    fetchMock.resetMocks()
    fetchMock.mockResponse(data)
  })

  describe('get requests', () => {
    it('calls the underlying fetch implementation with the correct arguments', async () => {
      await request({ method: HTTPMethod.get, url })

      expect(fetchMock).toHaveBeenCalledWith(`${baseUrl}${url}`, {
        body: undefined,
        headers: undefined,
        method: HTTPMethod.get,
        url,
      })
    })
  })

  describe('post requests', () => {
    it('calls the underlying fetch implementation with the correct arguments', async () => {
      await request({ data, headers: postHeaders, method: HTTPMethod.post, url })

      expect(fetchMock).toHaveBeenCalledWith(`${baseUrl}${url}`, {
        body: data,
        headers: postHeaders,
        method: HTTPMethod.post,
        url,
      })
    })
  })

  describe('put requests', () => {
    it('calls the underlying fetch implementation with the correct arguments', async () => {
      await request({ data, headers: postHeaders, method: HTTPMethod.put, url })

      expect(fetchMock).toHaveBeenCalledWith(`${baseUrl}${url}`, {
        body: data,
        headers: postHeaders,
        method: HTTPMethod.put,
        url,
      })
    })
  })
})

describe('makeRequest', () => {
  const url = '/route'
  const statusText = 'error'
  let fetcherMock: jest.Mock
  let request: FetchFunction

  describe('when the response is not `ok`', () => {
    beforeEach(() => {
      fetcherMock = jest.fn()
      fetcherMock.mockReturnValue({ ok: false, statusText: 'error', url })
      request = makeRequest(fetcherMock)
    })

    it('throws an error', async () => {
      await expect(async () => await request({ url })).rejects.toEqual(
        new Error(ApiErrorText.requestUnsuccessful(url, statusText))
      )
    })
  })

  describe('when the response contains JSON with a data field', () => {
    const value = 'value'

    beforeEach(() => {
      fetcherMock = jest.fn()
      fetcherMock.mockReturnValue({
        json: () => ({
          data: {
            snake_cased_key: value,
          },
        }),
        ok: true,
      })
      request = makeRequest(fetcherMock)
    })

    it('camelCases the data and returns it', async () => {
      expect(await request({ url })).toEqual({ snakeCasedKey: value })
    })
  })

  describe('when the response does not contain data field', () => {
    const value = 'value'

    beforeEach(() => {
      fetcherMock = jest.fn()
      fetcherMock.mockReturnValue({
        json: () => ({
          snake_cased_key: value,
        }),
        ok: true,
      })
      request = makeRequest(fetcherMock)
    })

    it('returns the json', async () => {
      expect(await request({ url })).toEqual({ snakeCasedKey: value })
    })
  })
})

describe('makeHeaders', () => {
  describe('when the `isForm` argument evaluates to `true`', () => {
    it('generates headers with the correct `accept`, `xRequestedWith` and `contentType` values', () => {
      const isForm = true
      const token = 'token'

      const headers = makeHeaders({ isForm, token })

      expect(headers[ApiHeaderKey.accept]).toEqual(MimeType.json)
      expect(headers[ApiHeaderKey.xRequestedWith]).toEqual(ApiHeaderValue.xRequestedWithXML)
      expect(headers[ApiHeaderKey.contentType]).toBeUndefined()
    })
  })

  describe('when the `isForm` argument evaluates to `false`', () => {
    it('generates headers with the correct `accept`, `xRequestedWith` and `contentType` values', () => {
      const isForm = false
      const token = 'token'

      const headers = makeHeaders({ isForm, token })

      expect(headers[ApiHeaderKey.accept]).toBeUndefined()
      expect(headers[ApiHeaderKey.xRequestedWith]).toBeUndefined()
      expect(headers[ApiHeaderKey.contentType]).toEqual(MimeType.json)
    })
  })
})
