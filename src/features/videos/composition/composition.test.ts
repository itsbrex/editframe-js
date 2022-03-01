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
import { Audio } from 'features/videos/audio'
import { Filter } from 'features/videos/filter'
import { Text } from 'features/videos/text'
import { Video } from 'features/videos/video'
import { VisualMedia } from 'features/videos/visualMedia'
import { mockApi } from 'mocks'
import { CompositionErrorText } from 'strings'
import { formDataKey } from 'utils'
import * as StringsUtilsModule from 'utils/strings'
import * as ValidationUtilsModule from 'utils/validation'
import * as FilterUtilsModule from 'utils/video/filters'

import { Composition } from './'

describe('Composition', () => {
  const audioOptions = { end: 20, start: 10 }
  const encodeResponse = {
    [EncodeResponseAttribute.id]: 'encode-id',
    [EncodeResponseAttribute.status]: 'encode-status',
    [EncodeResponseAttribute.timestamp]: 'encode-timestamp',
  }
  const error = 'error'
  const filenames = {
    [LayerType.audio]: 'audio-filename',
    [LayerType.image]: 'image-filename',
    [LayerType.video]: 'video-filename',
  }
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
  let composition: Composition

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

  describe('initialization', () => {
    it('throws an error if `duration` or `dimensions` are not provided', () => {
      expect(() => new Composition({ api: apiMock, formData: formDataMock, options: {} as any })).toThrow(
        new Error(
          CompositionErrorText.validationOptionsError(
            `${CompositionErrorText.dimensionsRequired}, ${CompositionErrorText.durationRequired}`
          )
        )
      )
    })

    describe('when a `videoFile` is provided in the options', () => {
      it('creates a video layer from the provided `videoFile`', () => {
        const composition = new Composition({
          api: apiMock,
          formData: formDataMock,
          options: {
            dimensions: { height: 1080, width: 1920 },
            duration: 10,
            videoFile: filenames[LayerType.video],
          } as any,
        })

        expect(composition.layers).toEqual([{ id: uuidMock, type: LayerType.video }])
      })
    })
  })

  describe('addAudio', () => {
    describe('when `validatePresenceOf` returns an error', () => {
      beforeEach(() => {
        validatePresenceOfSpy.mockReturnValue(error)
        composition = new Composition({ api: apiMock, formData: formDataMock, options })
      })

      it('throws an error', () => {
        expect(() => composition.addAudio(filenames.audio, audioOptions)).toThrow(error)
      })
    })

    beforeEach(() => {
      composition = new Composition({ api: apiMock, formData: formDataMock, options })

      composition.addAudio(filenames.audio, audioOptions)
    })

    it('adds an `audio` layer with the correct attributes', () => {
      expect(composition.layers[0]).toEqual({
        id: uuidMock,
        type: LayerType.audio,
        ...audioOptions,
      })
    })

    it('returns an `Audio` object', () => {
      const audio = composition.addAudio(filenames.audio, videoOptions)

      expect(audio instanceof Audio).toBe(true)
    })
  })

  describe('addFilter', () => {
    describe('when `validateFilter` returns an error', () => {
      beforeEach(() => {
        validateFilterSpy.mockReturnValue(error)
      })

      composition = new Composition({ api: apiMock, formData: formDataMock, options })

      it('throws an error', () => {
        expect(() => composition.addFilter({ name: filterName, options: filterOptions })).toThrow(error)
      })
    })

    beforeEach(() => {
      composition = new Composition({ api: apiMock, formData: formDataMock, options })

      composition.addFilter({ name: filterName, options: filterOptions })
    })

    it('calls `validateFilter` with the correct arguments', () => {
      expect(validateFilterSpy).toHaveBeenCalledWith(filterName, filterOptions)
    })

    it('adds a `filter` layer with the correct attributes', () => {
      expect(composition.layers[0]).toEqual({
        filter: {
          filterName,
          options: filterOptions,
        },
        id: uuidMock,
        type: LayerType.filter,
      })
    })

    it('returns a `Filter` object', () => {
      const filter = composition.addFilter({ name: filterName, options: filterOptions })

      expect(filter instanceof Filter).toBe(true)
    })
  })

  describe('addImage', () => {
    describe('when `validatePresenceOf` returns an error', () => {
      beforeEach(() => {
        validatePresenceOfSpy.mockReturnValue(error)
        composition = new Composition({ api: apiMock, formData: formDataMock, options })
      })

      it('throws an error', () => {
        expect(() => composition.addImage(filenames.image, imageOptions)).toThrow(error)
      })
    })

    beforeEach(() => {
      composition = new Composition({ api: apiMock, formData: formDataMock, options })

      composition.addImage(filenames.image, imageOptions)
    })

    it('adds an `image` layer with the correct attributes', () => {
      expect(composition.layers[0]).toEqual({
        id: uuidMock,
        type: LayerType.image,
        ...imageOptions,
      })
    })

    it('returns a `Video` object', () => {
      const image = composition.addImage(filenames.image, imageOptions)

      expect(image instanceof Video).toBe(true)
    })
  })

  describe('addText', () => {
    describe('when `validatePresenceOf` returns an error', () => {
      beforeEach(() => {
        validatePresenceOfSpy.mockReturnValue(error)
        composition = new Composition({ api: apiMock, formData: formDataMock, options })
      })

      it('throws an error', () => {
        expect(() => composition.addText(textOptions)).toThrow(error)
      })
    })

    it('adds a `text` layer with the correct attributes', () => {
      composition = new Composition({ api: apiMock, formData: formDataMock, options })

      composition.addText(textOptions)

      expect(composition.layers[0]).toEqual({
        id: uuidMock,
        type: LayerType.text,
        ...textOptions,
      })
    })

    it('returns a `Text` object', () => {
      const text = composition.addText(textOptions)

      expect(text instanceof Text).toBe(true)
    })
  })

  describe('addVideo', () => {
    describe('when `validatePresenceOf` returns an error', () => {
      beforeEach(() => {
        validatePresenceOfSpy.mockReturnValue(error)
        composition = new Composition({ api: apiMock, formData: formDataMock, options })
      })

      it('throws an error', () => {
        expect(() => composition.addVideo(filenames.video, videoOptions)).toThrow(error)
      })
    })

    beforeEach(() => {
      composition = new Composition({ api: apiMock, formData: formDataMock, options })

      composition.addVideo(filenames.video, videoOptions)
    })

    it('adds a `video` layer with the correct attributes', () => {
      expect(composition.layers[0]).toEqual({
        id: uuidMock,
        type: LayerType.video,
        ...imageOptions,
      })
    })

    it('returns a `Video` object', () => {
      const video = composition.addVideo(filenames.video, videoOptions)

      expect(video instanceof Video).toBe(true)
    })
  })

  describe('addWaveform', () => {
    it('adds a `waveform` layer with the correct attributes', () => {
      composition = new Composition({ api: apiMock, formData: formDataMock, options })

      composition.addWaveform(waveformOptions)

      expect(composition.layers[0]).toEqual({
        id: uuidMock,
        type: LayerType.waveform,
        ...waveformOptions,
      })
    })

    it('returns a `VisualMedia` object', () => {
      const waveform = composition.addWaveform(waveformOptions)

      expect(waveform instanceof VisualMedia).toBe(true)
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
        composition = new Composition({ api: apiMock, formData: formDataMock, options })
      })

      it('logs the error to the console', async () => {
        composition.addAudio(filenames.audio, audioOptions)

        await composition.encode()

        expect(consoleErrorSpy).toHaveBeenCalledWith(
          CompositionErrorText.errorEncoding(CompositionErrorText.malformedEncodingResponse)
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
      composition = new Composition({ api: apiMock, formData: formDataMock, options })

      composition.addAudio(filenames.audio, audioOptions)
      composition.addFilter({ name: filterName, options: filterOptions })
      composition.addImage(filenames.image, imageOptions)
      composition.addText(textOptions)
      composition.addVideo(filenames.video, videoOptions)
      composition.addWaveform(waveformOptions)
    })

    it('calls the `append` method on the private `formData` attribute with the correct arguments', async () => {
      await composition.encode()

      expect(formDataMock.append).toHaveBeenCalledWith(formDataKey(filenames.audio, uuidMock), filenames.audio)
      expect(formDataMock.append).toHaveBeenCalledWith(formDataKey(filenames.image, uuidMock), filenames.image)
      expect(formDataMock.append).toHaveBeenCalledWith(formDataKey(filenames.video, uuidMock), filenames.video)
      expect(formDataMock.append).toHaveBeenCalledWith(
        'config',
        JSON.stringify({
          ...options,
          layers: composition.layers,
        })
      )
    })

    it('calls the `post` method on the api with the correct arguments', async () => {
      await composition.encode()

      const { isForm, url } = postMock.mock.calls[0][0]

      expect(isForm).toEqual(true)
      expect(url).toEqual(Routes.videos.create)
    })

    it('returns the correct response', async () => {
      const response = await composition.encode()

      expect(response).toEqual(encodeResponse)
    })
  })
})
