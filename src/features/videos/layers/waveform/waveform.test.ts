import {
  Color,
  DefaultWaveformOptions,
  PrimitiveType,
  WaveformKey,
  WaveformLayerConfig,
  WaveformMethod,
  WaveformStyleValue,
} from 'constant'
import { Videos } from 'features'
import { Composition } from 'features/videos/composition'
import { mockApi } from 'mocks'
import { makeDefaultWaveformLayerConfig, translateColor } from 'utils'
import * as ValidationUtilsModule from 'utils/validation'

import { Waveform } from './'

describe('Waveform', () => {
  const host = 'host'
  let composition: Composition
  let waveform: Waveform
  let result: Waveform | void
  let validateColorSpy: jest.SpyInstance
  let validateValueIsOfTypeSpy: jest.SpyInstance
  let layerConfigDefaults: WaveformLayerConfig

  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(async () => {
    const api = mockApi({ get: jest.fn(), post: jest.fn(), put: jest.fn() })

    composition = new Composition({
      api,
      formData: { append: jest.fn() },
      host,
      options: { dimensions: { height: 1080, width: 1920 }, duration: 10 },
      videos: new Videos({ api, host }),
    })
    validateColorSpy = jest.spyOn(ValidationUtilsModule, 'validateColor')
    validateValueIsOfTypeSpy = jest.spyOn(ValidationUtilsModule, 'validateValueIsOfType')

    waveform = await composition.addWaveform('./package.json')
    layerConfigDefaults = makeDefaultWaveformLayerConfig(composition.dimensions)

    jest.clearAllMocks()
  })

  describe('initialization', () => {
    it('sets the volume to the correct value', () => {
      expect(waveform.backgroundColor).toEqual(DefaultWaveformOptions.backgroundColor)
      expect(waveform.color).toEqual(DefaultWaveformOptions.color)
      expect(waveform.style).toEqual(DefaultWaveformOptions.style)
    })

    it('sets the correct default layer configs', () => {
      expect(waveform.isRelative).toEqual(layerConfigDefaults.position.isRelative)
      expect(waveform.x).toEqual(layerConfigDefaults.position.x)
      expect(waveform.y).toEqual(layerConfigDefaults.position.y)
      expect(waveform.format).toEqual(layerConfigDefaults.size.format)
      expect(waveform.height).toEqual(layerConfigDefaults.size.height)
      expect(waveform.width).toEqual(layerConfigDefaults.size.width)
      expect(waveform.start).toEqual(layerConfigDefaults.timeline.start)
      expect(waveform.trim).toEqual(layerConfigDefaults.trim)
    })
  })

  describe('setBackgroundColor', () => {
    const backgroundColor = Color.black

    beforeEach(async () => {
      result = waveform.setBackgroundColor(backgroundColor)
    })

    it('calls the `validateColor` function with the correct arguments', () => {
      expect(validateColorSpy).toHaveBeenCalledWith(
        WaveformMethod.setBackgroundColor,
        WaveformKey.backgroundColor,
        backgroundColor,
        true
      )
    })

    it('sets `backgroundColor` to the correct value', () => {
      expect(waveform.backgroundColor).toEqual(translateColor(backgroundColor))
    })

    it('returns the `Waveform` instance', () => {
      expect(result).toBeInstanceOf(Waveform)
    })
  })

  describe('setColor', () => {
    const color = Color.black

    beforeEach(async () => {
      result = waveform.setColor(color)
    })

    it('calls the `validateColor` function with the correct arguments', () => {
      expect(validateColorSpy).toHaveBeenCalledWith(WaveformMethod.setColor, WaveformKey.color, color, true)
    })

    it('sets `color` to the correct value', () => {
      expect(waveform.color).toEqual(translateColor(color))
    })

    it('returns the `Waveform` instance', () => {
      expect(result).toBeInstanceOf(Waveform)
    })
  })

  describe('setStyle', () => {
    const style = WaveformStyleValue.lines

    beforeEach(async () => {
      result = waveform.setStyle(style)
    })

    it('calls the `validateValueIsOfType` function with the correct arguments', () => {
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        WaveformMethod.setStyle,
        WaveformKey.style,
        style,
        PrimitiveType.string,
        true
      )
    })

    it('sets `style` to the correct value', () => {
      expect(waveform.style).toEqual(style)
    })

    it('returns the `Waveform` instance', () => {
      expect(result).toBeInstanceOf(Waveform)
    })
  })
})
