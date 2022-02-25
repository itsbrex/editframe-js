import { ApiHeaderKey, ApiHeaderValue, MimeType } from 'constant'

import { baseURL, makeHeaders } from './'

describe('baseURL', () => {
  it('returns a well-formed `baseURL`', () => {
    const host = 'https://host.com'
    const version = 2

    expect(baseURL(host, version)).toEqual('https://host.com/v2')
  })
})

describe('makeHeaders', () => {
  describe('when the `isForm` argument evaluates to `true`', () => {
    it('generates headers with the correct `accept`, `xRequestedWith` and `contentType` values', () => {
      const clientId = 'client-id'
      const isForm = true
      const token = 'token'

      const headers = makeHeaders({ clientId, isForm, token })

      expect(headers[ApiHeaderKey.accept]).toEqual(MimeType.json)
      expect(headers[ApiHeaderKey.xRequestedWith]).toEqual(ApiHeaderValue.xRequestedWithXML)
      expect(headers[ApiHeaderKey.contentType]).toBeUndefined()
    })
  })

  describe('when the `isForm` argument evaluates to `false`', () => {
    it('generates headers with the correct `accept`, `xRequestedWith` and `contentType` values', () => {
      const clientId = 'client-id'
      const isForm = false
      const token = 'token'

      const headers = makeHeaders({ clientId, isForm, token })

      expect(headers[ApiHeaderKey.accept]).toBeUndefined()
      expect(headers[ApiHeaderKey.xRequestedWith]).toBeUndefined()
      expect(headers[ApiHeaderKey.contentType]).toEqual(MimeType.json)
    })
  })
})
