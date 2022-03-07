import * as ApiModule from 'api'
import { FetchFunction } from 'constant'
import * as ApplicationsModule from 'features/applications'
import * as VideosModule from 'features/videos'
import { EditframeErrorText } from 'strings'
import * as ApiUtilsModule from 'utils/api'

import { Editframe } from './'

describe('Editframe', () => {
  const clientId = 'client-id'
  const host = 'host'
  const token = 'token'
  const version = 2
  const apiMock = {}
  const fetchMock = {}

  let editframe: Editframe
  let apiSpy: jest.SpyInstance
  let initializeFetchSpy: jest.SpyInstance
  let applicationsSpy: jest.SpyInstance
  let videosSpy: jest.SpyInstance

  describe('when either `clientId` or `token` are not provided to the constructor', () => {
    it('throws an error', () => {
      expect(() => new Editframe({ clientId, token: undefined })).toThrow(EditframeErrorText.clientIdAndTokenRequired)
      expect(() => new Editframe({ clientId: undefined, token })).toThrow(EditframeErrorText.clientIdAndTokenRequired)
    })
  })

  describe('when both `clientId` and `token` are provided to the constructor', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    beforeEach(() => {
      apiSpy = jest.spyOn(ApiModule, 'Api').mockReturnValue(apiMock as ApiModule.Api)
      initializeFetchSpy = jest.spyOn(ApiUtilsModule, 'initializeFetchUtil').mockReturnValue(fetchMock as FetchFunction)
      applicationsSpy = jest.spyOn(ApplicationsModule, 'Applications')
      videosSpy = jest.spyOn(VideosModule, 'Videos')
      editframe = new Editframe({ clientId, host, token, version })
    })

    it('sets the `clientId` correctly', () => {
      expect(editframe.clientId).toEqual(clientId)
    })

    it('sets the `host` correctly', () => {
      expect(editframe.host).toEqual(host)
    })

    it('sets the `token` correctly', () => {
      expect(editframe.token).toEqual(token)
    })

    it('sets the `version` correctly', () => {
      expect(editframe.version).toEqual(version)
    })

    it('instantiates the `Api` instance with the correct arguments', () => {
      expect(initializeFetchSpy).toHaveBeenCalledWith(ApiUtilsModule.baseURL(host, version))

      expect(apiSpy).toHaveBeenCalledWith({
        clientId,
        fetch: fetchMock,
        host,
        token,
        version,
      })
    })

    it('instantiates the `Applications` instance with the correct arguments', () => {
      expect(applicationsSpy).toHaveBeenCalledWith(apiMock)
    })

    it('instantiates the `Videos` instance with the correct arguments', () => {
      expect(videosSpy).toHaveBeenCalledWith(apiMock)
    })
  })
})
