import { PassThrough } from 'stream'

import { ApiInterface, FormDataInterface, LayerAttribute, LayerHTML, LayerType, Routes } from 'constant'
import { Audio } from 'features/videos/audio'
import { Filter } from 'features/videos/filter'
import { HTML } from 'features/videos/html'
import { Lottie } from 'features/videos/lottie'
import { Subtitles } from 'features/videos/subtitles'
import { Text } from 'features/videos/text'
import { Video } from 'features/videos/video'
import { VisualMedia } from 'features/videos/visualMedia'
import {
  mockApi,
  mockApiAudioMetadata,
  mockApiVideoMetadata,
  mockAudioLayer,
  mockCompositionOptions,
  mockEncodeResponse,
  mockFilterLayer,
  mockHTMLLayer,
  mockImageLayer,
  mockLottieLayer,
  mockSubtitlesLayer,
  mockTextLayer,
  mockVideoLayer,
  mockWaveformLayer,
} from 'mocks'
import { CompositionErrorText } from 'strings'
import * as FilesUtilsModule from 'utils/files'
import * as SanitizationUtilsModule from 'utils/sanitization'
import * as StringsUtilsModule from 'utils/strings'
import * as ValidationUtilsModule from 'utils/validation'
import * as CompositionUtilsModule from 'utils/video/compositions'
import * as PreviewUtilsModule from 'utils/video/preview'

import { Composition } from './'

describe('Composition', () => {
  const uuids = {
    [LayerType.audio]: '123456',
    [LayerType.image]: '23456',
    [LayerType.video]: '345678',
    [LayerType.subtitles]: '456789',
    [LayerType.text]: '567890',
  }
  const filenames = {
    [LayerType.audio]: 'audio-filename.mp3',
    [LayerType.image]: 'image-filename.jpg',
    [LayerType.video]: 'video-filename.mp4',
    [LayerType.subtitles]: 'subtitles-filename.srt',
  }
  const readStreams = {
    [LayerType.audio]: new PassThrough(),
    [LayerType.image]: new PassThrough(),
    [LayerType.video]: new PassThrough(),
    [LayerType.subtitles]: new PassThrough(),
  }
  let formDataMock: FormDataInterface
  const temporaryDirectory = 'temporary-directory'
  const audioOptions = mockAudioLayer()
  const encodeResponse = mockEncodeResponse()
  const filterOptions = mockFilterLayer()
  const imageOptions = mockImageLayer()
  const lottieOptions = mockLottieLayer()
  const options = mockCompositionOptions()
  const subtitlesOptions = mockSubtitlesLayer()
  const textOptions = mockTextLayer()
  const videoOptions = mockVideoLayer()
  const waveformOptions = mockWaveformLayer()
  const sanitizedHTMLMock = 'sanitized-html'
  const uuidMock = '123456'
  const makeProcessedCompositionFile = (layerType: LayerType) => ({
    filepath: filenames[layerType],
    readStream: readStreams[layerType],
  })
  let htmlOptions: LayerHTML
  let apiMock: ApiInterface
  let consoleErrorSpy: jest.SpyInstance
  let postMock: jest.Mock
  let preparePreviewSpy: jest.SpyInstance
  let processCompositionFileSpy: jest.SpyInstance
  let removeDirectorySpy: jest.SpyInstance
  let sanitizeHTMLSpy: jest.SpyInstance
  let uuidSpy: jest.SpyInstance
  let validateAddAudioSpy: jest.SpyInstance
  let validateAddFilterSpy: jest.SpyInstance
  let validateAddHTMLSpy: jest.SpyInstance
  let validateAddImageSpy: jest.SpyInstance
  let validateAddLottieSpy: jest.SpyInstance
  let validateAddSubtitlesSpy: jest.SpyInstance
  let validateAddTextSpy: jest.SpyInstance
  let validateAddVideoSpy: jest.SpyInstance
  let validateAddWaveformSpy: jest.SpyInstance
  let validateCompositionFileSpy: jest.SpyInstance
  let validateCompositionOptionsSpy: jest.SpyInstance
  let validatePresenceOfSpy: jest.SpyInstance
  let composition: Composition

  const makeComposition = (customApiMock?: ApiInterface) =>
    new Composition({
      api: customApiMock ? customApiMock : apiMock,
      formData: formDataMock,
      options: { ...options },
      temporaryDirectory,
    })

  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.spyOn(FilesUtilsModule, 'createReadStream').mockReturnValue(new PassThrough())
    postMock = jest.fn()
    apiMock = mockApi()
    sanitizeHTMLSpy = jest.spyOn(SanitizationUtilsModule, 'sanitizeHTML').mockResolvedValue(sanitizedHTMLMock)
    formDataMock = { append: jest.fn() }
    uuidSpy = jest.spyOn(StringsUtilsModule, 'uuid').mockReturnValue(uuidMock)
    preparePreviewSpy = jest.spyOn(PreviewUtilsModule, 'preparePreview').mockResolvedValue(undefined)
    processCompositionFileSpy = jest.spyOn(CompositionUtilsModule, 'processCompositionFile')
    removeDirectorySpy = jest.spyOn(FilesUtilsModule, 'removeDirectory').mockReturnValue(undefined)
    validateAddAudioSpy = jest.spyOn(CompositionUtilsModule, 'validateAddAudio')
    validateAddFilterSpy = jest.spyOn(CompositionUtilsModule, 'validateAddFilter')
    validateAddHTMLSpy = jest.spyOn(CompositionUtilsModule, 'validateAddHTML')
    validateAddImageSpy = jest.spyOn(CompositionUtilsModule, 'validateAddImage')
    validateAddLottieSpy = jest.spyOn(CompositionUtilsModule, 'validateAddLottie')
    validateAddSubtitlesSpy = jest.spyOn(CompositionUtilsModule, 'validateAddSubtitles')
    validateAddTextSpy = jest.spyOn(CompositionUtilsModule, 'validateAddText')
    validateAddVideoSpy = jest.spyOn(CompositionUtilsModule, 'validateAddVideo')
    validateAddWaveformSpy = jest.spyOn(CompositionUtilsModule, 'validateAddWaveform')
    validateCompositionFileSpy = jest.spyOn(CompositionUtilsModule, 'validateCompositionFile')
    validateCompositionOptionsSpy = jest.spyOn(CompositionUtilsModule, 'validateCompositionOptions')
    validatePresenceOfSpy = jest.spyOn(ValidationUtilsModule, 'validatePresenceOf')
  })

  describe('initialization', () => {
    it('calls the `validateCompositionOptions` function with the correct arguments', () => {
      makeComposition()

      expect(validateCompositionOptionsSpy).toHaveBeenCalledWith(options)
    })
  })

  describe('backgroundColor', () => {
    it('returns the correct `backgroundColor`', () => {
      const composition = makeComposition()

      expect(composition.backgroundColor).toEqual(options.backgroundColor)
    })
  })

  describe('dimensions', () => {
    it('returns the correct `dimensions`', () => {
      const composition = makeComposition()

      expect(composition.dimensions).toEqual(options.dimensions)
    })
  })

  describe('duration', () => {
    it('returns the correct `duration`', () => {
      const composition = makeComposition()

      expect(composition.duration).toEqual(options.duration)
    })
  })

  describe('metadata', () => {
    it('returns the correct `metadata`', () => {
      const composition = makeComposition()

      expect(composition.metadata).toEqual(options.metadata)
    })
  })

  describe('layers', () => {
    it('returns all layers', () => {
      const composition = makeComposition()
      const text = 'text'

      composition.addText({ text })

      expect(composition.layers).toEqual([{ id: uuidMock, text, type: LayerType.text }])
    })
  })

  describe('layer', () => {
    it('returns a layer given an id', () => {
      const composition = makeComposition()
      const text = 'text'
      const layer = composition.addText({ text })

      expect(composition.layer(layer?.id)).toEqual({ id: uuidMock, text, type: LayerType.text })
    })
  })

  describe('setDuration', () => {
    it('sets the duration', () => {
      const duration = 123
      const composition = makeComposition()

      composition.setDuration(duration)

      expect(composition.duration).toEqual(duration)
    })
  })

  describe('getLayerAttribute', () => {
    it('returns a specific attribute from a given layer', () => {
      const composition = makeComposition()
      const text = 'text'
      const layer = composition.addText({ text })

      expect(composition.getLayerAttribute(layer?.id, LayerAttribute.text)).toEqual(text)
    })
  })

  describe('updateLayerAttribute', () => {
    it('updates an attribute on a given layer', () => {
      const composition = makeComposition()

      const text = 'text'
      const layer = composition.addText({ text })
      const newText = 'new-text'

      composition.updateLayerAttribute(layer.id, LayerAttribute.text, newText)

      expect(composition.layer(layer.id)).toEqual({ id: uuidMock, text: newText, type: LayerType.text })
    })
  })

  describe('addAudio', () => {
    beforeEach(async () => {
      processCompositionFileSpy.mockResolvedValue(makeProcessedCompositionFile(LayerType.audio))

      composition = makeComposition()

      await composition.addAudio(filenames.audio, audioOptions)
    })

    it('calls the `validateCompositionFile` function with the correct arguments', () => {
      expect(validateCompositionFileSpy).toHaveBeenCalledWith(filenames.audio)
    })

    it('calls the `validatePresenceOf` function with the correct arguments', () => {
      expect(validatePresenceOfSpy).toHaveBeenCalledWith(audioOptions, CompositionErrorText.optionsRequired)
    })

    it('calls the `validateAddAudio` function with the correct arguments', () => {
      expect(validateAddAudioSpy).toHaveBeenCalledWith(audioOptions)
    })

    it('adds an `audio` layer with the correct attributes', () => {
      expect(composition.layers[0]).toEqual({
        id: uuidMock,
        type: LayerType.audio,
        ...audioOptions,
      })
    })

    it('returns an `Audio` object', async () => {
      const audio = await composition.addAudio(filenames.audio, videoOptions)

      expect(audio).toBeInstanceOf(Audio)
    })
  })

  describe('addFilter', () => {
    beforeEach(() => {
      composition = makeComposition()

      composition.addFilter(filterOptions)
    })

    it('calls `validatePresenceOf` with the correct arguments', () => {
      expect(validatePresenceOfSpy).toHaveBeenCalledWith(filterOptions, CompositionErrorText.optionsRequired)
      expect(validatePresenceOfSpy).toHaveBeenCalledWith(filterOptions.filter, CompositionErrorText.filterRequired)
    })

    it('calls `validateAddFilter` with the correct arguments', () => {
      expect(validateAddFilterSpy).toHaveBeenCalledWith(filterOptions)
    })

    it('adds a `filter` layer with the correct attributes', () => {
      expect(composition.layers[0]).toEqual({
        ...filterOptions,
        id: uuidMock,
        type: LayerType.filter,
      })
    })

    it('returns a `Filter` object', () => {
      const filter = composition.addFilter(filterOptions)

      expect(filter).toBeInstanceOf(Filter)
    })
  })

  describe('addHTML', () => {
    beforeEach(() => {
      processCompositionFileSpy.mockResolvedValue(makeProcessedCompositionFile(LayerType.html))
    })

    describe('when a `url` is provided', () => {
      beforeEach(async () => {
        htmlOptions = mockHTMLLayer({ withHTML: false, withURL: true })
        composition = makeComposition()

        await composition.addHTML(htmlOptions)
      })

      it('does not sanitize html', () => {
        expect(sanitizeHTMLSpy).not.toHaveBeenCalled()
      })
    })

    describe('when a `page` is provided', () => {
      beforeEach(async () => {
        htmlOptions = mockHTMLLayer()
        composition = makeComposition()

        await composition.addHTML(htmlOptions)
      })

      it('sanitizes the provided html', () => {
        expect(sanitizeHTMLSpy).toHaveBeenCalledWith('html')
      })
    })

    describe('when no `height` or `width` is provided', () => {
      beforeEach(async () => {
        htmlOptions = mockHTMLLayer()
        composition = makeComposition()

        await composition.addHTML(htmlOptions)
      })

      it('uses the composition height and width', () => {
        expect(composition.layers[0]).toEqual({
          id: uuidMock,
          type: LayerType.html,
          ...{ ...htmlOptions, height: options.dimensions.height, width: options.dimensions.width },
        })
      })
    })

    describe('when no `withTransparentBackground` option is provided', () => {
      beforeEach(async () => {
        htmlOptions = mockHTMLLayer({
          height: 10,
          width: 20,
          withHTML: true,
          withTransparentBackground: undefined,
          withURL: false,
        })
        composition = makeComposition()

        await composition.addHTML(htmlOptions)
      })

      it('defaults `withTransparentBackground` to false', () => {
        expect(composition.layers[0]).toEqual({
          id: uuidMock,
          type: LayerType.html,
          ...htmlOptions,
          ...{ html: { ...htmlOptions.html, withTransparentBackground: false } },
        })
      })
    })

    describe('always', () => {
      const height = 50
      const width = 100

      beforeEach(async () => {
        htmlOptions = mockHTMLLayer({ height, width, withHTML: true, withURL: false })
        composition = makeComposition()

        await composition.addHTML({ ...htmlOptions, height, width })
      })

      it('calls the `validatePresenceOf` function with the correct arguments', () => {
        expect(validatePresenceOfSpy).toHaveBeenCalledWith(htmlOptions, CompositionErrorText.optionsRequired)
      })

      it('calls the `validateAddHTML` function with the correct arguments', () => {
        expect(validateAddHTMLSpy).toHaveBeenCalledWith(htmlOptions)
      })

      it('adds an `html` layer with the correct attributes', () => {
        expect(composition.layers[0]).toEqual({
          id: uuidMock,
          type: LayerType.html,
          ...{ height, width, ...htmlOptions },
        })
      })

      it('returns a `HTML` object', async () => {
        const html = await composition.addHTML(htmlOptions)

        expect(html).toBeInstanceOf(HTML)
      })
    })
  })

  describe('addImage', () => {
    beforeEach(async () => {
      processCompositionFileSpy.mockResolvedValue(makeProcessedCompositionFile(LayerType.image))

      composition = makeComposition()

      await composition.addImage(filenames.image, imageOptions)
    })

    it('calls the `validateCompositionFile` function with the correct arguments', () => {
      expect(validateCompositionFileSpy).toHaveBeenCalledWith(filenames.image)
    })

    it('calls the `validateAddSubtitles` function with the correct arguments', () => {
      expect(validateAddImageSpy).toHaveBeenCalledWith(imageOptions)
    })

    it('adds an `image` layer with the correct attributes', () => {
      expect(composition.layers[0]).toEqual({
        id: uuidMock,
        type: LayerType.image,
        ...imageOptions,
      })
    })

    it('returns a `Video` object', async () => {
      const image = await composition.addImage(filenames.image, imageOptions)

      expect(image).toBeInstanceOf(Video)
    })
  })

  describe('addLottie', () => {
    beforeEach(() => {
      composition = makeComposition()

      composition.addLottie(lottieOptions)
    })

    it('calls the `validatePresenceOf` function with the correct arguments', () => {
      expect(validatePresenceOfSpy).toHaveBeenCalledWith(lottieOptions, CompositionErrorText.optionsRequired)
      expect(validatePresenceOfSpy).toHaveBeenCalledWith(lottieOptions.data, CompositionErrorText.dataRequired)
    })

    it('calls the `validateAddLottie` function with the correct arguments', () => {
      expect(validateAddLottieSpy).toHaveBeenCalledWith(lottieOptions)
    })

    it('adds a `lottie` layer with the correct attributes', () => {
      expect(composition.layers[0]).toEqual({
        id: uuidMock,
        type: LayerType.lottie,
        ...lottieOptions,
      })
    })

    it('returns a `Lottie` object', () => {
      const lottie = composition.addLottie(lottieOptions)

      expect(lottie).toBeInstanceOf(Lottie)
    })
  })

  describe('addSequence', () => {
    describe('when a provided layer has a `trim` `start` but no `trim` `end`, and has no file to determine duration from', () => {
      it('logs an error', async () => {
        composition = makeComposition()
        const text = composition.addText({ text: 'text', trim: { start: 5 } })

        await composition.addSequence([text])

        expect(consoleErrorSpy).toHaveBeenCalledTimes(1)
      })
    })

    describe('when a provided layer has neither `trim` nor `duration`', () => {
      it('logs an error', async () => {
        composition = makeComposition()
        const text = composition.addText({ text: 'text' })

        await composition.addSequence([text])

        expect(consoleErrorSpy).toHaveBeenCalledTimes(1)
      })
    })

    describe('when all provided layers have `trim` `end` or `duration`', () => {
      const mockVideoMetadata = mockApiVideoMetadata()
      const postMock = jest.fn().mockResolvedValueOnce(mockApiAudioMetadata()).mockResolvedValueOnce(mockVideoMetadata)

      beforeEach(async () => {
        const apiMock = mockApi({ post: postMock })

        processCompositionFileSpy
          .mockResolvedValueOnce(makeProcessedCompositionFile(LayerType.audio))
          .mockResolvedValueOnce(makeProcessedCompositionFile(LayerType.video))
          .mockResolvedValueOnce(makeProcessedCompositionFile(LayerType.audio))
          .mockResolvedValueOnce(makeProcessedCompositionFile(LayerType.video))

        uuidSpy.mockReturnValueOnce(uuids[LayerType.audio])
        uuidSpy.mockReturnValueOnce(uuids[LayerType.text])
        uuidSpy.mockReturnValueOnce(uuids[LayerType.video])

        composition = makeComposition(apiMock)
      })

      it('sets the `start` attributes of the provided layers to the correct values', async () => {
        const audio = await composition.addAudio(filenames.audio, audioOptions)
        const text = composition.addText({ text: 'text', trim: { end: 5 } })
        const video = await composition.addVideo(filenames.video, videoOptions)

        await composition.addSequence([audio, text, video])

        expect(audio.start).toEqual(0)
        expect(text.start).toEqual(audio.trim.end - audio.trim.start)
        expect(video.start).toEqual(text.start + text.trim.end)
      })
    })
  })

  describe('addSubtitles', () => {
    beforeEach(async () => {
      processCompositionFileSpy.mockResolvedValue(makeProcessedCompositionFile(LayerType.subtitles))

      composition = makeComposition()

      await composition.addSubtitles(filenames.subtitles, subtitlesOptions)
    })

    it('calls the `validateCompositionFile` function with the correct arguments', () => {
      expect(validateCompositionFileSpy).toHaveBeenCalledWith(filenames.subtitles)
    })

    it('calls the `validateAddSubtitles` function with the correct arguments', () => {
      expect(validateAddSubtitlesSpy).toHaveBeenCalledWith(subtitlesOptions)
    })

    it('adds a `subtitles` layer with the correct attributes', () => {
      expect(composition.layers[0]).toEqual({
        id: uuidMock,
        type: LayerType.subtitles,
        ...subtitlesOptions,
      })
    })

    it('returns a `Subtitles` object', async () => {
      const subtitles = await composition.addSubtitles(filenames.subtitles, subtitlesOptions)

      expect(subtitles).toBeInstanceOf(Subtitles)
    })
  })

  describe('addText', () => {
    beforeEach(() => {
      composition = makeComposition()

      composition.addText(textOptions)
    })

    it('calls the `validatePresenceOf` function with the correct arguments', () => {
      expect(validatePresenceOfSpy).toHaveBeenCalledWith(textOptions.text, CompositionErrorText.textRequired)
    })

    it('calls the `validateAddText` function with the correct arguments', () => {
      expect(validateAddTextSpy).toHaveBeenCalledWith(textOptions)
    })

    it('adds a `text` layer with the correct attributes', () => {
      expect(composition.layers[0]).toEqual({
        id: uuidMock,
        type: LayerType.text,
        ...textOptions,
      })
    })

    it('returns a `Text` object', () => {
      const text = composition.addText(textOptions)

      expect(text).toBeInstanceOf(Text)
    })
  })

  describe('addVideo', () => {
    beforeEach(async () => {
      processCompositionFileSpy.mockResolvedValue(makeProcessedCompositionFile(LayerType.video))

      composition = makeComposition()

      await composition.addVideo(filenames.video, videoOptions)
    })

    it('calls the `validateCompositionFile` function with the correct arguments', () => {
      expect(validateCompositionFileSpy).toHaveBeenCalledWith(filenames.video)
    })

    it('calls the `validatePresenceOf` function with the correct arguments', () => {
      expect(validatePresenceOfSpy).toHaveBeenCalledWith(videoOptions, CompositionErrorText.optionsRequired)
    })

    it('calls the `validateAddVideo` function with the correct arguments', () => {
      expect(validateAddVideoSpy).toHaveBeenCalledWith(videoOptions)
    })

    it('adds a `video` layer with the correct attributes', () => {
      expect(composition.layers[0]).toEqual({
        id: uuidMock,
        type: LayerType.video,
        ...imageOptions,
      })
    })

    it('returns a `Video` object', async () => {
      const video = await composition.addVideo(filenames.video, videoOptions)

      expect(video).toBeInstanceOf(Video)
    })
  })

  describe('addWaveform', () => {
    describe('when a file is provided', () => {
      beforeEach(async () => {
        processCompositionFileSpy.mockResolvedValue(makeProcessedCompositionFile(LayerType.waveform))

        composition = makeComposition()

        await composition.addWaveform(waveformOptions, filenames.audio)
      })

      it('calls the `validateCompositionFile` function with the correct arguments', () => {
        expect(validateCompositionFileSpy).toHaveBeenCalledWith(filenames.audio)
      })
    })

    describe('when no file is provided', () => {
      beforeEach(async () => {
        composition = makeComposition()

        await composition.addWaveform(waveformOptions)
      })

      it('does not call the `validateCompositionFile` function', () => {
        expect(validateCompositionFileSpy).not.toHaveBeenCalled()
      })

      it('calls the `validateAddWaveform` function with the correct arguments', () => {
        expect(validateAddWaveformSpy).toHaveBeenCalledWith(waveformOptions)
      })

      it('adds a `waveform` layer with the correct attributes', () => {
        expect(composition.layers[0]).toEqual({
          id: uuidMock,
          type: LayerType.waveform,
          ...waveformOptions,
        })
      })

      it('returns a `VisualMedia` object', async () => {
        const waveform = await composition.addWaveform(waveformOptions)

        expect(waveform).toBeInstanceOf(VisualMedia)
      })
    })
  })

  describe('preview', () => {
    it('calls the `preparePreview` function with the correct arguments', async () => {
      processCompositionFileSpy.mockResolvedValue(makeProcessedCompositionFile(LayerType.video))
      composition = makeComposition()
      await composition.addVideo(filenames.video, videoOptions)

      await composition.preview()

      // eslint-disable-next-line jest/prefer-called-with
      expect(preparePreviewSpy).toHaveBeenCalled()
    })
  })

  describe('encode', () => {
    describe('when the encode response is malformed', () => {
      beforeEach(() => {
        postMock.mockResolvedValue({})
        apiMock = mockApi({ post: postMock })

        processCompositionFileSpy.mockResolvedValue(makeProcessedCompositionFile(LayerType.audio))
        composition = makeComposition()
      })

      it('logs the error to the console', async () => {
        await composition.addAudio(filenames.audio, audioOptions)

        await composition.encode()

        expect(consoleErrorSpy).toHaveBeenCalledWith(
          CompositionErrorText.errorEncoding(CompositionErrorText.malformedEncodingResponse)
        )
      })
    })

    beforeEach(async () => {
      postMock.mockResolvedValue(encodeResponse)
      apiMock = mockApi({ post: postMock })
      processCompositionFileSpy.mockResolvedValueOnce(makeProcessedCompositionFile(LayerType.audio))
      processCompositionFileSpy.mockResolvedValueOnce(makeProcessedCompositionFile(LayerType.image))
      processCompositionFileSpy.mockResolvedValueOnce(makeProcessedCompositionFile(LayerType.subtitles))
      processCompositionFileSpy.mockResolvedValueOnce(makeProcessedCompositionFile(LayerType.video))
      processCompositionFileSpy.mockResolvedValueOnce(makeProcessedCompositionFile(LayerType.waveform))
      composition = makeComposition()

      await composition.addAudio(filenames.audio, audioOptions)
      composition.addFilter(filterOptions)
      await composition.addImage(filenames.image, imageOptions)
      composition.addText(textOptions)
      await composition.addSubtitles(filenames.subtitles, subtitlesOptions)
      await composition.addVideo(filenames.video, videoOptions)
      await composition.addWaveform(waveformOptions, filenames.audio)
    })

    it('calls the `append` method on the private `formData` attribute with the correct arguments', async () => {
      await composition.encode()

      expect(formDataMock.append).toHaveBeenCalledTimes(6)

      expect(formDataMock.append).toHaveBeenCalledWith(
        CompositionUtilsModule.formDataKey(readStreams[LayerType.audio], uuidMock),
        readStreams[LayerType.audio]
      )
      expect(formDataMock.append).toHaveBeenCalledWith(
        CompositionUtilsModule.formDataKey(readStreams[LayerType.image], uuidMock),
        readStreams[LayerType.image]
      )
      expect(formDataMock.append).toHaveBeenCalledWith(
        CompositionUtilsModule.formDataKey(readStreams[LayerType.subtitles], uuidMock),
        readStreams[LayerType.subtitles]
      )
      expect(formDataMock.append).toHaveBeenCalledWith(
        CompositionUtilsModule.formDataKey(readStreams[LayerType.video], uuidMock),
        readStreams[LayerType.video]
      )
      expect(formDataMock.append).toHaveBeenCalledWith(
        CompositionUtilsModule.formDataKey(readStreams[LayerType.waveform], uuidMock),
        readStreams[LayerType.waveform]
      )

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

    it('removes the temporary directory', async () => {
      await composition.encode()

      expect(removeDirectorySpy).toHaveBeenCalledWith(temporaryDirectory)
    })

    it('returns the correct response', async () => {
      const response = await composition.encode()

      expect(response).toEqual(encodeResponse)
    })
  })
})
