import FormData from 'form-data'

import { ApiVideo, Routes } from 'constant'
import * as CompositionModule from 'features/videos/composition'
import { mockApi, mockCompositionOptions, mockVideo } from 'mocks'
import { VideoErrorText } from 'strings'
import { generatePath } from 'utils'

import { Videos } from './'

describe('Videos', () => {
  const videoMock = mockVideo()
  const videosMock: ApiVideo[] = [videoMock]
  const compositionMock = {}

  let apiMock = mockApi({ get: jest.fn().mockReturnValue(videosMock), post: jest.fn(), put: jest.fn() })
  let videos: Videos
  let compositionSpy: jest.SpyInstance
  let consoleErrorSpy: jest.SpyInstance

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  describe('all', () => {
    beforeEach(() => {
      videos = new Videos(apiMock)
    })

    it('makes a `get` request to the api with the correct arguments', async () => {
      await videos.all()

      expect(apiMock.get).toHaveBeenCalledWith({ url: Routes.videos.all })
    })

    describe('when the api response is malformed', () => {
      beforeEach(() => {
        apiMock = mockApi({
          get: jest.fn().mockReturnValue([{}]),
          post: jest.fn(),
          put: jest.fn(),
        })

        videos = new Videos(apiMock)
      })

      it('logs the correct error to the console', async () => {
        await videos.all()
        expect(consoleErrorSpy).toHaveBeenCalledWith(VideoErrorText.all(VideoErrorText.malformedResponse))
      })

      it('returns an empty array', async () => {
        expect(await videos.all()).toEqual([])
      })
    })
  })

  describe('get', () => {
    beforeEach(() => {
      videos = new Videos(apiMock)
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    })

    it('makes a `get` request to the api with the correct arguments', async () => {
      await videos.get(videoMock.id)

      expect(apiMock.get).toHaveBeenCalledWith({
        url: generatePath(Routes.videos.get, { id: videoMock.id }),
      })
    })

    describe('when the api response is malformed', () => {
      beforeEach(() => {
        apiMock = mockApi({
          get: jest.fn().mockReturnValue([{}]),
          post: jest.fn(),
          put: jest.fn(),
        })

        videos = new Videos(apiMock)
      })

      it('logs the correct error to the console', async () => {
        await videos.get(videoMock.id)
        expect(consoleErrorSpy).toHaveBeenCalledWith(VideoErrorText.get(VideoErrorText.malformedResponse))
      })

      it('returns `undefined`', async () => {
        expect(await videos.get(videoMock.id)).toBeUndefined()
      })
    })
  })

  describe('new', () => {
    beforeEach(() => {
      compositionSpy = jest
        .spyOn(CompositionModule, 'Composition')
        .mockReturnValue(compositionMock as CompositionModule.Composition)

      videos = new Videos(apiMock)
    })

    it('returns an `Composition` instance instantiated with the correct arguments', () => {
      const options = mockCompositionOptions()

      videos.new(options)

      expect(compositionSpy).toHaveBeenCalledWith({ api: apiMock, formData: new FormData(), options })
    })
  })
})
