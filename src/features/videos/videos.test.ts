import { PassThrough } from 'stream'

import { ApiInterface, ApiVideo, ApiVideoMetadataFormDataKey, ApiVideoMetadataType, LayerType, Routes } from 'constant'
import { Composition } from 'features/videos/composition'
import { mockApi, mockApiVideo, mockApiVideoMetadata, mockCompositionOptions } from 'mocks'
import { VideoErrorText } from 'strings'
import { generatePath, prepareFormData, urlOrFile } from 'utils'
import * as FileUtilsModule from 'utils/files'
import * as FormUtilsModule from 'utils/forms'

import { Videos } from './'

describe('Videos', () => {
  const videoMock = mockApiVideo()
  const videosMock: ApiVideo[] = [videoMock]

  let apiMock: ApiInterface
  let videos: Videos
  // let compositionSpy: jest.SpyInstance
  let consoleErrorSpy: jest.SpyInstance
  let createReadStreamSpy: jest.SpyInstance
  let downloadFileSpy: jest.SpyInstance
  let removeDirectorySpy: jest.SpyInstance
  let prepareFormDataSpy: jest.SpyInstance

  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    apiMock = mockApi({
      get: jest.fn().mockReturnValue(videosMock),
      post: jest.fn().mockReturnValue(mockApiVideoMetadata()),
      put: jest.fn(),
    })

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
    let composition: Composition
    let videoPath = './path/to/video.mp4'
    const prepareFormDataArgs: [string, any][] = [
      [urlOrFile(videoPath), videoPath],
      [ApiVideoMetadataFormDataKey.type, ApiVideoMetadataType.video],
    ]
    const formData = prepareFormData(prepareFormDataArgs)
    const compositionOptions = mockCompositionOptions()
    const createReadStreamResponse = new PassThrough()
    const downloadFileResponse = {
      temporaryFileDirectory: 'temporary-file-directory',
      temporaryFilePath: 'temporary-file-path',
    }

    beforeEach(() => {
      createReadStreamSpy = jest.spyOn(FileUtilsModule, 'createReadStream').mockReturnValue(createReadStreamResponse)
      downloadFileSpy = jest.spyOn(FileUtilsModule, 'downloadFile').mockResolvedValue(downloadFileResponse)
      prepareFormDataSpy = jest.spyOn(FormUtilsModule, 'prepareFormData').mockReturnValue(formData)
      removeDirectorySpy = jest.spyOn(FileUtilsModule, 'removeDirectory').mockImplementation(() => {})
      videos = new Videos(apiMock)
    })

    describe('when a `videoPath` argument is provided', () => {
      describe('when the provided `videoPath` is a local filepath', () => {
        beforeEach(async () => {
          videoPath = './path/to/video.mp4'

          composition = await videos.new({}, videoPath)
        })

        it('calls `createReadStream` twice with the provided `videoPath`', () => {
          expect(createReadStreamSpy).toHaveBeenCalledTimes(2)
          expect(createReadStreamSpy).toHaveBeenCalledWith(videoPath)
        })

        it('calls the `prepareFormData` function with the correct arguments', () => {
          expect(prepareFormDataSpy).toHaveBeenCalledWith([
            [urlOrFile(createReadStreamResponse), createReadStreamResponse],
            [ApiVideoMetadataFormDataKey.type, ApiVideoMetadataType.video],
          ])
        })

        it('makes a `post` request to the api with the correct arguments', () => {
          expect(apiMock.post).toHaveBeenCalledWith({
            data: formData,
            isForm: true,
            url: Routes.metadata,
          })
        })

        it('returns an `Composition` instance instantiated with the correct options and a video layer', () => {
          const { duration, height, width } = mockApiVideoMetadata()

          expect(composition.duration).toEqual(duration)
          expect(composition.dimensions).toEqual({ height, width })
          expect(composition.layers[0].type).toEqual(LayerType.video)
        })
      })

      describe('when the provided `videoPath` is an external url', () => {
        beforeEach(async () => {
          videoPath = 'https://www.fakedomain.com/video.mp4'

          await videos.new({}, videoPath)
        })

        it('calls `downloadFile` with the provided `videoPath`', () => {
          expect(downloadFileSpy).toHaveBeenCalledWith(videoPath)
        })

        it('calls `createReadStream` with the temporary file path returned by `downloadFile`', () => {
          expect(createReadStreamSpy).toHaveBeenCalledTimes(2)
          expect(createReadStreamSpy).toHaveBeenCalledWith(downloadFileResponse.temporaryFilePath)
        })

        it('calls `removeDirectory` with the temporary directory returned by `downloadFile`', () => {
          expect(removeDirectorySpy).toHaveBeenCalledWith(downloadFileResponse.temporaryFileDirectory)
        })

        it('makes a `post` request to the api with the correct arguments', () => {
          expect(apiMock.post).toHaveBeenCalledWith({
            data: formData,
            isForm: true,
            url: Routes.metadata,
          })
        })

        it('returns a `composition` instance instantiated with the correct options and a video layer', async () => {
          const { duration, height, width } = mockApiVideoMetadata()

          expect(composition.duration).toEqual(duration)
          expect(composition.dimensions).toEqual({ height, width })
          expect(composition.layers[0].type).toEqual(LayerType.video)
        })
      })
    })

    describe('when no `videoPath` argument is provided', () => {
      it('returns an `Composition` instance instantiated with the correct options and no layers', async () => {
        composition = await videos.new(compositionOptions)

        expect(composition.backgroundColor).toEqual(compositionOptions.backgroundColor)
        expect(composition.duration).toEqual(compositionOptions.duration)
        expect(composition.dimensions).toEqual(compositionOptions.dimensions)
        expect(composition.metadata).toEqual(compositionOptions.metadata)
        expect(composition.layers).toHaveLength(0)
      })
    })
  })
})
