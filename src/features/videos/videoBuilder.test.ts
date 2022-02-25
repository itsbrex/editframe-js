import {
  ApiInterface,
  EncodeResponseAttribute,
  FilterName,
  FormDataInterface,
  LayerFormatValue,
  LayerHorizontalAlignmentValue,
  LayerType,
  Routes,
} from 'constant'
import { mockApi } from 'mocks'
import { VideoErrorText } from 'strings'
import { formDataKey } from 'utils'
import * as FilterUtilsModule from 'utils/filters'
import * as StringsUtilsModule from 'utils/strings'
import * as ValidationUtilsModule from 'utils/validation'

import { VideoBuilder } from './videoBuilder'

describe('VideoBuilder', () => {
  const audioOptions = { end: 20, start: 10 }
  const encodeResponse = {
    [EncodeResponseAttribute.id]: 'encode-id',
    [EncodeResponseAttribute.status]: 'encode-status',
    [EncodeResponseAttribute.timestamp]: 'encode-timestamp',
  }
  const error = 'error'
  const filename = 'file-name'
  const filterName = FilterName.brightness
  const filterOptions = { brightness: 10 }
  let formDataMock: FormDataInterface
  const imageOptions = { end: 20, format: LayerFormatValue.fill, height: 100, start: 10, width: 200, x: 10, y: 20 }
  const options = { dimensions: { height: 100, width: 200 }, duration: 10 }
  const textOptions = {
    end: 20,
    fontFamily: 'Arial',
    fontSize: 20,
    format: LayerFormatValue.fill,
    height: 100,
    maxFontSize: 25,
    maxHeight: 400,
    maxWidth: 800,
    start: 10,
    text: 'text',
    textAlignment: LayerHorizontalAlignmentValue.center,
    width: 200,
    x: 10,
    y: 20,
  }
  const uuidMock = '123456'
  const videoOptions = { end: 20, format: LayerFormatValue.fill, height: 100, start: 10, width: 200, x: 10, y: 20 }
  const waveformOptions = { backgroundColor: '#ffffff', color: '#000000', format: LayerFormatValue.fill, x: 10, y: 20 }
  let apiMock: ApiInterface
  let consoleErrorSpy: jest.SpyInstance
  let postMock: jest.Mock
  let validateFilterSpy: jest.SpyInstance
  let validatePresenceOfSpy: jest.SpyInstance
  let videoBuilder: VideoBuilder

  afterEach(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    postMock = jest.fn()
    apiMock = mockApi({ get: jest.fn(), post: postMock, put: jest.fn() })
    formDataMock = { append: jest.fn() }
    jest.spyOn(StringsUtilsModule, 'uuid').mockReturnValue(uuidMock)
    validatePresenceOfSpy = jest.spyOn(ValidationUtilsModule, 'validatePresenceOf')
    validateFilterSpy = jest.spyOn(FilterUtilsModule, 'validateFilter')
  })

  describe('addAudio', () => {
    describe('when `validatePresenceOf` returns an error', () => {
      beforeEach(() => {
        validatePresenceOfSpy.mockReturnValue(error)
        videoBuilder = new VideoBuilder({ api: apiMock, formData: formDataMock, options })
      })

      it('throws an error', () => {
        expect(() => videoBuilder.addAudio(filename, audioOptions)).toThrow(error)
      })
    })

    beforeEach(() => {
      videoBuilder = new VideoBuilder({ api: apiMock, formData: formDataMock, options })

      videoBuilder.addAudio(filename, audioOptions)
    })

    it('adds an `audio` layer with the correct attributes', () => {
      expect(videoBuilder.layers[0]).toEqual({
        id: uuidMock,
        type: LayerType.audio,
        ...audioOptions,
      })
    })

    it('calls the `append` method on the private `formData` attribute with the correct arguments', () => {
      expect(formDataMock.append).toHaveBeenCalledWith(formDataKey(filename, uuidMock), filename)
    })
  })

  describe('addFilter', () => {
    describe('when `validateFilter` returns an error', () => {
      beforeEach(() => {
        validateFilterSpy.mockReturnValue(error)
      })
      videoBuilder = new VideoBuilder({ api: apiMock, formData: formDataMock, options })

      it('throws an error', () => {
        expect(() => videoBuilder.addFilter({ name: filterName, options: filterOptions })).toThrow(error)
      })
    })

    beforeEach(() => {
      videoBuilder = new VideoBuilder({ api: apiMock, formData: formDataMock, options })

      videoBuilder.addFilter({ name: filterName, options: filterOptions })
    })

    it('calls `validateFilter` with the correct arguments', () => {
      expect(validateFilterSpy).toHaveBeenCalledWith(filterName, filterOptions)
    })

    it('adds a `filter` layer with the correct attributes', () => {
      expect(videoBuilder.layers[0]).toEqual({
        filter: {
          filterName,
          options: filterOptions,
        },
        id: uuidMock,
        type: LayerType.filter,
      })
    })
  })

  describe('addImage', () => {
    describe('when `validatePresenceOf` returns an error', () => {
      beforeEach(() => {
        validatePresenceOfSpy.mockReturnValue(error)
        videoBuilder = new VideoBuilder({ api: apiMock, formData: formDataMock, options })
      })

      it('throws an error', () => {
        expect(() => videoBuilder.addImage(filename, imageOptions)).toThrow(error)
      })
    })

    beforeEach(() => {
      videoBuilder = new VideoBuilder({ api: apiMock, formData: formDataMock, options })

      videoBuilder.addImage(filename, imageOptions)
    })

    it('adds an `image` layer with the correct attributes', () => {
      expect(videoBuilder.layers[0]).toEqual({
        id: uuidMock,
        type: LayerType.image,
        ...imageOptions,
      })
    })

    it('calls the `append` method on the private `formData` attribute with the correct arguments', () => {
      expect(formDataMock.append).toHaveBeenCalledWith(formDataKey(filename, uuidMock), filename)
    })
  })

  describe('addText', () => {
    describe('when `validatePresenceOf` returns an error', () => {
      beforeEach(() => {
        validatePresenceOfSpy.mockReturnValue(error)
        videoBuilder = new VideoBuilder({ api: apiMock, formData: formDataMock, options })
      })

      it('throws an error', () => {
        expect(() => videoBuilder.addText(textOptions)).toThrow(error)
      })
    })

    it('adds a `text` layer with the correct attributes', () => {
      videoBuilder = new VideoBuilder({ api: apiMock, formData: formDataMock, options })

      videoBuilder.addText(textOptions)

      expect(videoBuilder.layers[0]).toEqual({
        id: uuidMock,
        type: LayerType.text,
        ...textOptions,
      })
    })
  })

  describe('addVideo', () => {
    describe('when `validatePresenceOf` returns an error', () => {
      beforeEach(() => {
        validatePresenceOfSpy.mockReturnValue(error)
        videoBuilder = new VideoBuilder({ api: apiMock, formData: formDataMock, options })
      })

      it('throws an error', () => {
        expect(() => videoBuilder.addVideo(filename, videoOptions)).toThrow(error)
      })
    })

    beforeEach(() => {
      videoBuilder = new VideoBuilder({ api: apiMock, formData: formDataMock, options })

      videoBuilder.addVideo(filename, videoOptions)
    })

    it('adds a `video` layer with the correct attributes', () => {
      expect(videoBuilder.layers[0]).toEqual({
        id: uuidMock,
        type: LayerType.video,
        ...imageOptions,
      })
    })

    it('calls the `append` method on the private `formData` attribute with the correct arguments', () => {
      expect(formDataMock.append).toHaveBeenCalledWith(formDataKey(filename, uuidMock), filename)
    })
  })

  describe('addWaveform', () => {
    it('adds a `waveform` layer with the correct attributes', () => {
      videoBuilder = new VideoBuilder({ api: apiMock, formData: formDataMock, options })

      videoBuilder.addWaveform(waveformOptions)

      expect(videoBuilder.layers[0]).toEqual({
        id: uuidMock,
        type: LayerType.waveform,
        ...waveformOptions,
      })
    })
  })

  describe('encode', () => {
    describe('when the encode response is malformed', () => {
      beforeEach(() => {
        postMock.mockResolvedValue({})
        apiMock = mockApi({
          get: jest.fn(),
          post: postMock,
          put: jest.fn(),
        })
        videoBuilder = new VideoBuilder({ api: apiMock, formData: formDataMock, options })
      })

      it('logs the error to the console', async () => {
        videoBuilder.addAudio(filename, audioOptions)

        await videoBuilder.encode()

        expect(consoleErrorSpy).toHaveBeenCalledWith(
          VideoErrorText.errorEncoding(VideoErrorText.malformedEncodingResponse)
        )
      })
    })

    beforeEach(() => {
      postMock.mockResolvedValue(encodeResponse)
      apiMock = mockApi({
        get: jest.fn(),
        post: postMock,
        put: jest.fn(),
      })
      videoBuilder = new VideoBuilder({ api: apiMock, formData: formDataMock, options })

      videoBuilder.addAudio(filename, audioOptions)
      videoBuilder.addFilter({ name: filterName, options: filterOptions })
      videoBuilder.addImage(filename, imageOptions)
      videoBuilder.addText(textOptions)
      videoBuilder.addVideo(filename, videoOptions)
      videoBuilder.addWaveform(waveformOptions)
    })

    it('calls the `append` method on the private `formData` attribute with the correct arguments', async () => {
      await videoBuilder.encode()

      expect(formDataMock.append).toHaveBeenCalledWith(
        'config',
        JSON.stringify({
          ...options,
          layers: videoBuilder.layers,
        })
      )
    })

    it('calls the `post` method on the api with the correct arguments', async () => {
      await videoBuilder.encode()

      const { isForm, url } = postMock.mock.calls[0][0]

      expect(isForm).toEqual(true)
      expect(url).toEqual(Routes.videos.create)
    })

    it('returns the correct response', async () => {
      const response = await videoBuilder.encode()

      expect(response).toEqual(encodeResponse)
    })
  })
})
