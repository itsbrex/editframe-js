import { PassThrough } from 'stream'

import { LayerType, defaultFilterLayer } from 'constant'
import {
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

import { formDataKey, processCompositionFile, setLayerDefaults } from './'

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
    const defaultHtmlLayer = makeDefaultHtmlLayer(dimensions)

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
    const defaultImageLayer = makeDefaultImageLayer(dimensions)

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
    const defaultTextLayer = makeDefaultTextLayer(dimensions)

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
    const defaultVideoLayer = makeDefaultVideoLayer(dimensions)

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
