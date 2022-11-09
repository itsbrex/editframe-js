import { PassThrough } from 'stream'

import {
  LayerType,
  SequenceableLayer,
  TransitionFadeOptions,
  TransitionOptions,
  TransitionType,
  defaultFilterLayer,
} from 'constant'
import { Videos } from 'features'
import { Composition } from 'features/videos/composition'
import {
  mockApi,
  mockAudioLayerConfig,
  mockAudioOptions,
  mockFilterOptions,
  mockHtmlLayerConfig,
  mockHtmlOptions,
  mockImageLayerConfig,
  mockLottieLayerConfig,
  mockLottieOptions,
  mockSequenceLayerConfig,
  mockSubtitlesLayerConfig,
  mockSubtitlesOptions,
  mockTextLayerConfig,
  mockTextOptions,
  mockVideoLayerConfig,
  mockWaveformLayerConfig,
  mockWaveformOptions,
} from 'mocks'
import { ValidationErrorText } from 'strings'
import { makeDefaultAudioLayer } from 'utils/defaults/audio'
import { makeDefaultHtmlLayer } from 'utils/defaults/html'
import { makeDefaultImageLayer } from 'utils/defaults/image'
import { makeDefaultLottieLayer } from 'utils/defaults/lottie'
import { makeDefaultSequenceLayer } from 'utils/defaults/sequence'
import { makeDefaultSubtitlesLayer } from 'utils/defaults/subtitles'
import { makeDefaultTextLayer } from 'utils/defaults/text'
import { makeDefaultVideoLayer } from 'utils/defaults/video'
import { makeDefaultWaveformLayer } from 'utils/defaults/waveform'
import * as FilesUtilsModule from 'utils/files'
import { deepMerge } from 'utils/objects'

import { formDataKey, processCompositionFile, processCrossfades, processKenBurns, setLayerDefaults } from './'

describe('setLayerDefaults', () => {
  const dimensions = { height: 10, width: 30 }

  describe('audio', () => {
    it('sets the correct layer defaults when no options or config are provided', () => {
      expect(setLayerDefaults(dimensions, LayerType.audio, {}, {})).toEqual(makeDefaultAudioLayer())
    })

    it('sets the correct layer defaults when options and config are provided', () => {
      const audioOptions = mockAudioOptions()
      const audioLayerConfig = mockAudioLayerConfig()

      expect(setLayerDefaults(dimensions, LayerType.audio, audioOptions, audioLayerConfig)).toEqual(
        deepMerge(makeDefaultAudioLayer(), { audio: audioOptions }, audioLayerConfig)
      )
    })
  })

  describe('filter', () => {
    it('sets the correct layer defaults when no options or config are provided', () => {
      expect(setLayerDefaults(dimensions, LayerType.filter, {}, {})).toEqual(defaultFilterLayer)
    })

    it('sets the correct layer defaults when options and config are provided', () => {
      const filterOptions = mockFilterOptions()

      expect(setLayerDefaults(dimensions, LayerType.filter, filterOptions)).toEqual(
        deepMerge(defaultFilterLayer, { filter: filterOptions })
      )
    })
  })

  describe('html', () => {
    const defaultHtmlLayer = makeDefaultHtmlLayer()

    it('sets the correct layer defaults when no options or config are provided', () => {
      expect(setLayerDefaults(dimensions, LayerType.html, {}, {})).toEqual(defaultHtmlLayer)
    })

    it('sets the correct layer defaults when options and config are provided', () => {
      const htmlOptions = mockHtmlOptions()
      const htmlLayerConfig = mockHtmlLayerConfig()

      expect(setLayerDefaults(dimensions, LayerType.html, htmlOptions, htmlLayerConfig)).toEqual(
        deepMerge(defaultHtmlLayer, { html: htmlOptions }, htmlLayerConfig)
      )
    })
  })

  describe('image', () => {
    const defaultImageLayer = makeDefaultImageLayer()

    it('sets the correct layer defaults when no options or config are provided', () => {
      expect(setLayerDefaults(dimensions, LayerType.image, {}, {})).toEqual(defaultImageLayer)
    })

    it('sets the correct layer defaults when options and config are provided', () => {
      const imageLayerConfig = mockImageLayerConfig()

      expect(setLayerDefaults(dimensions, LayerType.image, undefined, imageLayerConfig)).toEqual(
        deepMerge(defaultImageLayer, imageLayerConfig)
      )
    })
  })

  describe('lottie', () => {
    const defaultLottieLayer = makeDefaultLottieLayer()

    it('sets the correct layer defaults when no options or config are provided', () => {
      expect(setLayerDefaults(dimensions, LayerType.lottie, {}, {})).toEqual(defaultLottieLayer)
    })

    it('sets the correct layer defaults when options and config are provided', () => {
      const lottieOptions = mockLottieOptions()
      const lottieLayerConfig = mockLottieLayerConfig()

      expect(setLayerDefaults(dimensions, LayerType.lottie, lottieOptions, lottieLayerConfig)).toEqual(
        deepMerge(defaultLottieLayer, { lottie: lottieOptions }, lottieLayerConfig)
      )
    })
  })

  describe('sequence', () => {
    const defaultSequenceLayer = makeDefaultSequenceLayer()

    it('sets the correct layer defaults when no options or config are provided', () => {
      expect(setLayerDefaults(dimensions, LayerType.sequence, {}, {})).toEqual(defaultSequenceLayer)
    })

    it('sets the correct layer defaults when options and config are provided', () => {
      const sequenceLayerConfig = mockSequenceLayerConfig()

      expect(setLayerDefaults(dimensions, LayerType.sequence, undefined, sequenceLayerConfig)).toEqual(
        deepMerge(defaultSequenceLayer, sequenceLayerConfig)
      )
    })
  })

  describe('subtitles', () => {
    const defaultSubtitlesLayer = makeDefaultSubtitlesLayer()

    it('sets the correct layer defaults when no options or config are provided', () => {
      expect(setLayerDefaults(dimensions, LayerType.subtitles, {}, {})).toEqual(defaultSubtitlesLayer)
    })

    it('sets the correct layer defaults when options and config are provided', () => {
      const subtitlesOptions = mockSubtitlesOptions()
      const subtitlesLayerConfig = mockSubtitlesLayerConfig()

      expect(setLayerDefaults(dimensions, LayerType.subtitles, subtitlesOptions, subtitlesLayerConfig)).toEqual(
        deepMerge(defaultSubtitlesLayer, { subtitles: subtitlesOptions }, subtitlesLayerConfig)
      )
    })
  })

  describe('text', () => {
    const defaultTextLayer = makeDefaultTextLayer()

    it('sets the correct layer defaults when no options or config are provided', () => {
      expect(setLayerDefaults(dimensions, LayerType.text, {}, {})).toEqual(defaultTextLayer)
    })

    it('sets the correct layer defaults when options and config are provided', () => {
      const textOptions = mockTextOptions()
      const textLayerConfig = mockTextLayerConfig()

      expect(setLayerDefaults(dimensions, LayerType.text, textOptions, textLayerConfig)).toEqual(
        deepMerge(defaultTextLayer, { text: textOptions }, textLayerConfig)
      )
    })
  })

  describe('video', () => {
    const defaultVideoLayer = makeDefaultVideoLayer()

    it('sets the correct layer defaults when no options or config are provided', () => {
      expect(setLayerDefaults(dimensions, LayerType.video, {}, {})).toEqual(defaultVideoLayer)
    })

    it('sets the correct layer defaults when options and config are provided', () => {
      const videoLayerConfig = mockVideoLayerConfig()

      expect(setLayerDefaults(dimensions, LayerType.video, undefined, videoLayerConfig)).toEqual(
        deepMerge(defaultVideoLayer, videoLayerConfig)
      )
    })
  })

  describe('waveform', () => {
    const defaultWaveformLayer = makeDefaultWaveformLayer(dimensions)

    it('sets the correct layer defaults when no options or config are provided', () => {
      expect(setLayerDefaults(dimensions, LayerType.waveform, {}, {})).toEqual(defaultWaveformLayer)
    })

    it('sets the correct layer defaults when options and config are provided', () => {
      const waveformOptions = mockWaveformOptions()
      const waveformLayerConfig = mockWaveformLayerConfig()

      expect(setLayerDefaults(dimensions, LayerType.waveform, waveformOptions, waveformLayerConfig)).toEqual(
        deepMerge(defaultWaveformLayer, { waveform: waveformOptions }, waveformLayerConfig)
      )
    })
  })
})

describe('formDataKey', () => {
  it('returns the correct string for strings', () => {
    const file = 'file'
    const id = 'id'

    expect(formDataKey(file, id)).toEqual(`url${id}`)
  })

  it('returns the correct string for Blobs', () => {
    const file = new Blob([])
    const id = 'id'

    expect(formDataKey(file, id)).toEqual(`file${id}`)
  })
})

describe('processCompositionFile', () => {
  const temporaryDirectory = 'temporary-directory/'

  describe('when the provided `file` is a `Readable`', () => {
    it('throws an error if the provided `file` does not exist', async () => {
      const file = {
        path: './fake/path/fake-file.ts',
      }

      await expect(async () => await processCompositionFile(file as any, temporaryDirectory)).rejects.toThrow(
        ValidationErrorText.FILE_DOES_NOT_EXIST(file.path)
      )
    })

    it('returns the correct values', async () => {
      const file = {
        path: './package.json',
      }

      expect(await processCompositionFile(file as any, temporaryDirectory)).toEqual({
        filepath: file.path,
        readStream: file,
      })
    })
  })

  describe('when the provided `file` is a `url`', () => {
    const file = 'https://www.editframe.com'
    const temporaryFilePath = 'temporary-file-path'
    const readStreamMock = new PassThrough()

    beforeEach(() => {
      jest.spyOn(FilesUtilsModule, 'createReadStream').mockReturnValue(readStreamMock)
      jest.spyOn(FilesUtilsModule, 'downloadFile').mockResolvedValue({ temporaryFilePath })
    })

    it('returns the correct values', async () => {
      expect(await processCompositionFile(file, temporaryDirectory)).toEqual({
        filepath: temporaryFilePath,
        readStream: readStreamMock,
      })
    })
  })

  describe('when the provided `file` is not a `url`', () => {
    const readStreamMock = new PassThrough()

    beforeEach(() => {
      jest.spyOn(FilesUtilsModule, 'createReadStream').mockReturnValue(readStreamMock)
    })

    it('throws an error if the provided `file` does not exist', async () => {
      const file = './fake-path/package.json'

      await expect(async () => await processCompositionFile(file, temporaryDirectory)).rejects.toThrow(
        ValidationErrorText.FILE_DOES_NOT_EXIST(file)
      )
    })

    it('returns the correct values', async () => {
      const file = './package.json'

      expect(await processCompositionFile(file, temporaryDirectory)).toEqual({
        filepath: file,
        readStream: readStreamMock,
      })
    })
  })
})

describe('processCrossfades', () => {
  const host = 'host'
  const currentTime = 0
  const currentLayerCrossfadeDuration = 1
  const previousLayerCrossfadeDuration = 2
  const nextLayerCrossfadeDuration = 3
  let composition: Composition
  let currentLayer: SequenceableLayer
  let previousLayer: SequenceableLayer
  let nextLayer: SequenceableLayer
  let transition: TransitionOptions
  let result: number

  beforeEach(async () => {
    const api = mockApi({ get: jest.fn(), post: jest.fn(), put: jest.fn() })

    composition = new Composition({
      api,
      formData: { append: jest.fn() },
      host,
      options: { dimensions: { height: 1080, width: 1920 }, duration: 10 },
      videos: new Videos({ api, host }),
    })

    currentLayer = composition.addText({ text: 'currentLayer' }, { trim: { end: 3 } })
    previousLayer = composition.addText({ text: 'previousLayer' }, { trim: { end: 4 } })
    nextLayer = composition.addText({ text: 'nextLayer' }, { trim: { end: 5 } })

    await composition.addSequence([previousLayer, currentLayer, nextLayer])
  })

  describe('when the previous layer is crossfading out from the current layer', () => {
    beforeEach(() => {
      previousLayer.addTransition({
        options: { duration: previousLayerCrossfadeDuration },
        type: TransitionType.crossfadeOut,
      })

      result = processCrossfades(currentTime, currentLayer, previousLayer, undefined)

      transition = currentLayer.transitions[0]
    })

    it('adds a `fadeIn` transition on the current layer with the correct duration', () => {
      expect((transition.options as TransitionFadeOptions)?.duration).toEqual(previousLayerCrossfadeDuration)
      expect(transition.type).toEqual(TransitionType.fadeIn)
    })

    it('adjusts the start time of the current layer', () => {
      expect(currentLayer.start).toEqual(currentTime - previousLayerCrossfadeDuration)
    })

    it('returns the correct adjusted current time', () => {
      expect(result).toEqual(currentTime - previousLayerCrossfadeDuration)
    })
  })

  describe('when the next layer is crossfading in from the current layer', () => {
    beforeEach(() => {
      nextLayer.addTransition({ options: { duration: nextLayerCrossfadeDuration }, type: TransitionType.crossfadeIn })

      result = processCrossfades(currentTime, currentLayer, previousLayer, nextLayer)

      transition = currentLayer.transitions[0]
    })

    it('adds a `fadeOut` transition on the current layer with the correct duration', () => {
      expect((transition.options as TransitionFadeOptions)?.duration).toEqual(nextLayerCrossfadeDuration)
      expect(transition.type).toEqual(TransitionType.fadeOut)
    })

    it('keeps the start time of the current layer', () => {
      expect(currentLayer.start).toEqual(currentTime)
    })

    it('returns the correct adjusted current time', () => {
      expect(result).toEqual(currentTime - nextLayerCrossfadeDuration)
    })
  })

  describe('when the current layer is crossfading in from the previous layer', () => {
    beforeEach(() => {
      currentLayer.addTransition({
        options: { duration: currentLayerCrossfadeDuration },
        type: TransitionType.crossfadeIn,
      })

      result = processCrossfades(currentTime, currentLayer, previousLayer, nextLayer)

      transition = previousLayer.transitions[0]
    })

    it('adds a `fadeOut` transition on the previous layer with the correct duration', () => {
      expect((transition.options as TransitionFadeOptions)?.duration).toEqual(currentLayerCrossfadeDuration)
      expect(transition.type).toEqual(TransitionType.fadeOut)
    })

    it('adjusts the start time of the current layer', () => {
      expect(currentLayer.start).toEqual(currentTime - currentLayerCrossfadeDuration)
    })

    it('returns the correct adjusted current time', () => {
      expect(result).toEqual(currentTime - currentLayerCrossfadeDuration)
    })
  })

  describe('when there is no crossfade', () => {
    beforeEach(() => {
      result = processCrossfades(currentTime, currentLayer, previousLayer, nextLayer)

      transition = previousLayer.transitions[0]
    })

    it('keeps the start time of the current layer', () => {
      expect(currentLayer.start).toEqual(currentTime)
    })

    it('returns the normal current time', () => {
      expect(result).toEqual(currentTime)
    })
  })
})

describe('processKenBurns', () => {
  it('adds the correct transitions', () => {
    const host = 'host'
    const api = mockApi({ get: jest.fn(), post: jest.fn(), put: jest.fn() })
    const composition = new Composition({
      api,
      formData: { append: jest.fn() },
      host,
      options: { dimensions: { height: 1080, width: 1920 }, duration: 10 },
      videos: new Videos({ api, host }),
    })
    const layer = composition.addText({ text: 'currentLayer' }, { trim: { end: 3 } })

    const end = 1
    const scale1 = 1
    const scale2 = 2
    const start = 0
    const x1 = 0
    const x2 = 10
    const y1 = 0
    const y2 = 10

    processKenBurns({ end, layer, scale1, scale2, start, x1, x2, y1, y2 })

    expect(layer.transitions).toEqual([
      {
        options: {
          time: start,
          value: scale1,
        },
        type: TransitionType.scale,
      },
      {
        options: {
          time: end,
          value: scale2,
        },
        type: TransitionType.scale,
      },
      {
        options: {
          time: start,
          value: x1,
        },
        type: TransitionType.x,
      },
      {
        options: {
          time: end,
          value: x2,
        },
        type: TransitionType.x,
      },
      {
        options: {
          time: start,
          value: y1,
        },
        type: TransitionType.y,
      },
      {
        options: {
          time: end,
          value: y2,
        },
        type: TransitionType.y,
      },
    ])
  })
})
