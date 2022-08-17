import { Color, DefaultSubtitlesOptions, PrimitiveType, SubtitlesKey, SubtitlesMethod } from 'constant'
import { Videos } from 'features'
import { Composition } from 'features/videos/composition'
import { mockApi } from 'mocks'
import { makeDefaultSubtitlesLayerConfig, translateColor } from 'utils'
import * as ValidationUtilsModule from 'utils/validation'

import { Subtitles } from './'

describe('Subtitles', () => {
  const defaultSubtitlesLayerConfig = makeDefaultSubtitlesLayerConfig()
  const host = 'host'
  let composition: Composition
  let subtitles: Subtitles
  let result: Subtitles | void
  let validateColorSpy: jest.SpyInstance
  let validateValueIsOfTypeSpy: jest.SpyInstance

  afterEach(() => {
    jest.resetAllMocks()
  })

  beforeEach(async () => {
    const api = mockApi()

    validateColorSpy = jest.spyOn(ValidationUtilsModule, 'validateColor')
    validateValueIsOfTypeSpy = jest.spyOn(ValidationUtilsModule, 'validateValueIsOfType')
    composition = new Composition({
      api,
      formData: { append: jest.fn() },
      host,
      options: {
        dimensions: {
          height: 1920,
          width: 1080,
        },
        duration: 10,
      },
      videos: new Videos({ api, host }),
    })

    subtitles = await composition.addSubtitles('./package.json')

    jest.clearAllMocks()
  })

  describe('initialization', () => {
    it('sets the correct options and defaults', () => {
      expect(subtitles.backgroundColor).toEqual(DefaultSubtitlesOptions.backgroundColor)
      expect(subtitles.color).toEqual(DefaultSubtitlesOptions.color)
      expect(subtitles.fontSize).toEqual(DefaultSubtitlesOptions.fontSize)
    })

    it('sets the correct default layer configs', () => {
      expect(subtitles.isRelative).toEqual(defaultSubtitlesLayerConfig.position.isRelative)
      expect(subtitles.x).toEqual(defaultSubtitlesLayerConfig.position.x)
      expect(subtitles.y).toEqual(defaultSubtitlesLayerConfig.position.y)
      expect(subtitles.start).toEqual(defaultSubtitlesLayerConfig.timeline.start)
      expect(subtitles.trim).toEqual(defaultSubtitlesLayerConfig.trim)
    })
  })

  describe('setBackgroundColor', () => {
    const newBackgroundColor = Color.white

    beforeEach(() => {
      result = subtitles.setBackgroundColor(newBackgroundColor)
    })

    it('calls the `validateColor` function with the correct arguments', () => {
      expect(validateColorSpy).toHaveBeenCalledWith(
        SubtitlesMethod.setBackgroundColor,
        SubtitlesKey.backgroundColor,
        newBackgroundColor,
        true
      )
    })

    it('sets the `backgroundColor`', () => {
      expect(subtitles.backgroundColor).toEqual(translateColor(newBackgroundColor))
    })

    it('returns the `Subtitles` instance', () => {
      expect(result).toBeInstanceOf(Subtitles)
    })
  })

  describe('setColor', () => {
    const newColor = Color.black

    beforeEach(() => {
      result = subtitles.setColor(newColor)
    })

    it('calls the `validateColor` function with the correct arguments', () => {
      expect(validateColorSpy).toHaveBeenCalledWith(SubtitlesMethod.setColor, SubtitlesKey.color, newColor, true)
    })

    it('sets the `color`', () => {
      expect(subtitles.color).toEqual(translateColor(newColor))
    })

    it('returns the `Subtitles` instance', () => {
      expect(result).toBeInstanceOf(Subtitles)
    })
  })

  describe('setFontSize', () => {
    const newFontSize = 40

    beforeEach(() => {
      result = subtitles.setFontSize(newFontSize)
    })

    it('calls the `validateValueIsOfType` function with the correct arguments', () => {
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        SubtitlesMethod.setFontSize,
        SubtitlesKey.fontSize,
        newFontSize,
        PrimitiveType.number,
        true
      )
    })

    it('sets the `fontSize`', () => {
      expect(subtitles.fontSize).toEqual(newFontSize)
    })

    it('returns the `Subtitles` instance', () => {
      expect(result).toBeInstanceOf(Subtitles)
    })
  })
})
