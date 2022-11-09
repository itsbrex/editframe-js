import { PassThrough } from 'stream'

import { ApiInterface, ApiVideo, ApiVideoMethod, LayerType, Routes } from 'constant'
import { Composition } from 'features/videos/composition'
import { mockApi, mockApiVideo, mockApiVideoMetadata, mockCompositionOptions } from 'mocks'
import { VideoErrorText } from 'strings'
import { generatePath } from 'utils'
import * as FilesUtilsModule from 'utils/files'
import * as CompositionValidationUtilsModule from 'utils/validation/composition'
import * as VideosUtilsModule from 'utils/validation/videos'
import * as CompositionUtilsModule from 'utils/video/compositions'

import { Videos } from './'

describe('Videos', () => {
  const host = 'host'
  const videoMock = mockApiVideo()
  const videosMock: ApiVideo[] = [videoMock]

  let apiMock: ApiInterface
  let videos: Videos
  let consoleErrorSpy: jest.SpyInstance

  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    apiMock = mockApi({
      get: jest.fn().mockReturnValue(videosMock),
      post: jest.fn().mockReturnValue(mockApiVideoMetadata()),
    })

    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  describe('all', () => {
    beforeEach(() => {
      videos = new Videos({ api: apiMock, host })
    })

    it('makes a `get` request to the api with the correct arguments', async () => {
      await videos.all()

      expect(apiMock.get).toHaveBeenCalledWith({ url: Routes.videos.all })
    })

    describe('when the api response is malformed', () => {
      beforeEach(() => {
        apiMock = mockApi({
          get: jest.fn().mockReturnValue([{}]),
        })

        videos = new Videos({ api: apiMock, host })
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
      videos = new Videos({ api: apiMock, host })
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    })

    it('makes a `get` request to the api with the correct arguments', async () => {
      await videos.get({ id: videoMock.id })

      expect(apiMock.get).toHaveBeenCalledWith({
        url: generatePath(Routes.videos.get, { id: videoMock.id }),
      })
    })

    describe('when the api response is malformed', () => {
      beforeEach(() => {
        apiMock = mockApi({
          get: jest.fn().mockReturnValue([{}]),
        })

        videos = new Videos({ api: apiMock, host })
      })

      it('logs the correct error to the console', async () => {
        await videos.get({ id: videoMock.id })
        expect(consoleErrorSpy).toHaveBeenCalledWith(VideoErrorText.get(VideoErrorText.malformedResponse))
      })

      it('returns `undefined`', async () => {
        expect(await videos.get({ id: videoMock.id })).toBeUndefined()
      })
    })
  })

  describe('new', () => {
    let composition: Composition
    let validateNewVideoSpy: jest.SpyInstance
    let validateCompositionFileSpy: jest.SpyInstance
    const videoPath = './path/to/video.mp4'
    const compositionOptions = mockCompositionOptions()
    const readStreamMock = new PassThrough()

    beforeEach(() => {
      jest.spyOn(CompositionUtilsModule, 'processCompositionFile').mockResolvedValue({
        filepath: 'file-path.mp4',
        readStream: new PassThrough(),
      })
      jest.spyOn(FilesUtilsModule, 'createReadStream').mockReturnValue(readStreamMock)
      validateNewVideoSpy = jest.spyOn(VideosUtilsModule, 'validateNewVideo')
      validateCompositionFileSpy = jest.spyOn(CompositionValidationUtilsModule, 'validateCompositionFile')
      videos = new Videos({ api: apiMock, host })
    })

    describe('when a `videoPath` argument is provided', () => {
      beforeEach(async () => {
        composition = await videos.new(compositionOptions, videoPath)
      })

      it('calls the `validateNewVideo` function with the correct arguments', () => {
        expect(validateNewVideoSpy).toHaveBeenCalledWith(compositionOptions)
      })

      it('calls the `validateCompositionFile` function with the correct arguments', () => {
        expect(validateCompositionFileSpy).toHaveBeenCalledWith(ApiVideoMethod.new, videoPath)
      })

      it('returns an `Composition` instance instantiated with the correct options and a video layer', async () => {
        const { duration, height, width } = mockApiVideoMetadata()

        expect(composition.duration).toEqual(duration)
        expect(composition.dimensions).toEqual({ height, width })
        expect(composition.identifiedLayers[0].type).toEqual(LayerType.video)
      })
    })

    describe('when no `videoPath` argument is provided', () => {
      it('returns an `Composition` instance instantiated with the correct options and no layers', async () => {
        composition = await videos.new(compositionOptions)

        expect(composition.backgroundColor).toEqual(compositionOptions.backgroundColor)
        expect(composition.duration).toEqual(compositionOptions.duration)
        expect(composition.dimensions).toEqual(compositionOptions.dimensions)
        expect(composition.metadata).toEqual(compositionOptions.metadata)
        expect(composition.identifiedLayers).toHaveLength(0)
      })
    })
  })
})
