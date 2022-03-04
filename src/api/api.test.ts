import FormData from 'form-data'

import { HTTPMethod } from 'constant'
import { makeHeaders } from 'utils'

import { Api } from './'

describe('Api', () => {
  const clientId = 'client-id'
  const host = 'host'
  const token = 'token'
  const version = 2
  const mockFetch = jest.fn()
  const api = new Api({ clientId, fetch: mockFetch, host, token, version })

  describe('get', () => {
    it('calls the private `_fetch` method with the correct arguments', async () => {
      const url = '/url'

      await api.get({ url })

      expect(mockFetch).toHaveBeenCalledWith({ headers: makeHeaders({ clientId, token }), url })
    })
  })

  describe('post', () => {
    describe('when posting form data', () => {
      it('calls the private `_fetch` method with the correct arguments for form data', async () => {
        const data = new FormData()
        const url = '/url'
        const isForm = true

        await api.post({ data, isForm, url })

        expect(mockFetch).toHaveBeenCalledWith({
          data,
          headers: makeHeaders({ clientId, isForm, token }),
          method: HTTPMethod.post,
          url,
        })
      })
    })

    describe('when posting json', () => {
      it('calls the private `_fetch` method with the correct arguments for json data', async () => {
        const data = { key: 'value' }
        const url = '/url'
        const isForm = false

        await api.post({ data, isForm, url })

        expect(mockFetch).toHaveBeenCalledWith({
          data,
          headers: makeHeaders({ clientId, isForm, token }),
          method: HTTPMethod.post,
          url,
        })
      })
    })
  })

  describe('put', () => {
    describe('when putting form data', () => {
      it('calls the private `_fetch` method with the correct arguments for form data', async () => {
        const data = new FormData()
        const url = '/url'
        const isForm = true

        await api.put({ data, isForm, url })

        expect(mockFetch).toHaveBeenCalledWith({
          data,
          headers: makeHeaders({ clientId, isForm, token }),
          method: HTTPMethod.put,
          url,
        })
      })
    })

    describe('when putting json', () => {
      it('calls the private `_fetch` method with the correct arguments for json data', async () => {
        const data = { key: 'value' }
        const url = '/url'
        const isForm = false

        await api.put({ data, isForm, url })

        expect(mockFetch).toHaveBeenCalledWith({
          data,
          headers: makeHeaders({ clientId, isForm, token }),
          method: HTTPMethod.put,
          url,
        })
      })
    })
  })
})
