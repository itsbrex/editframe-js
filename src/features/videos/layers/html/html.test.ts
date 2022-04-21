import { HtmlKey, HtmlLayerConfig, HtmlMethod, PrimitiveType, defaultHtmlOptions } from 'constant'
import { Composition } from 'features/videos/composition'
import { mockApi } from 'mocks'
import { makeDefaultHtmlLayerConfig } from 'utils'
import * as ValidationUtilsModule from 'utils/validation'

import { Html } from './'

describe('Html', () => {
  const text = 'text'
  const page = `<html>${text}</html>`
  let composition: Composition
  let html: Html
  let result: Html | void
  let validateValueIsOfTypeSpy: jest.SpyInstance
  let layerConfigDefaults: HtmlLayerConfig

  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(async () => {
    composition = new Composition({
      api: mockApi({ get: jest.fn(), post: jest.fn(), put: jest.fn() }),
      formData: { append: jest.fn() },
      options: { dimensions: { height: 1080, width: 1920 }, duration: 10 },
    })
    validateValueIsOfTypeSpy = jest.spyOn(ValidationUtilsModule, 'validateValueIsOfType')

    html = await composition.addHtml({ page })
    layerConfigDefaults = makeDefaultHtmlLayerConfig(composition.dimensions)

    jest.clearAllMocks()
  })

  describe('initialization', () => {
    it('sets the correct options and defaults', () => {
      expect(html.page).toEqual(`<html><head></head><body>${text}</body></html>`)
      expect(html.url).toEqual(defaultHtmlOptions.url)
      expect(html.withTransparentBackground).toEqual(defaultHtmlOptions.withTransparentBackground)
    })

    it('sets the correct default layer configs', () => {
      expect(html.backgroundColor).toEqual(layerConfigDefaults.background.color)
      expect(html.backgroundOpacity).toEqual(layerConfigDefaults.background.opacity)
      expect(html.isRelative).toEqual(layerConfigDefaults.position.isRelative)
      expect(html.x).toEqual(layerConfigDefaults.position.x)
      expect(html.y).toEqual(layerConfigDefaults.position.y)
      expect(html.format).toEqual(layerConfigDefaults.size.format)
      expect(html.height).toEqual(layerConfigDefaults.size.height)
      expect(html.width).toEqual(layerConfigDefaults.size.width)
      expect(html.start).toEqual(layerConfigDefaults.timeline.start)
      expect(html.trim).toEqual(layerConfigDefaults.trim)
    })
  })

  describe('setPage', () => {
    const newText = 'new-text'
    const newPage = `<html>${newText}</html>`

    beforeEach(async () => {
      result = await html.setPage(newPage)
    })

    it('calls the `validateValueIsOfType` function with the correct arguments', () => {
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        HtmlMethod.setPage,
        HtmlKey.page,
        newPage,
        PrimitiveType.string,
        true
      )
    })

    it('sets `page` to the correct value', () => {
      expect(html.page).toEqual(`<html><head></head><body>${newText}</body></html>`)
    })

    it('sets `url` to the correct value', () => {
      expect(html.url).toBeUndefined()
    })

    it('returns the `Html` instance', () => {
      expect(result).toBeInstanceOf(Html)
    })
  })

  describe('setUrl', () => {
    const url = 'https://www.editframe.com'

    beforeEach(async () => {
      result = html.setUrl(url)
    })

    it('calls the `validateValueIsOfType` function with the correct arguments', () => {
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        HtmlMethod.setUrl,
        HtmlKey.url,
        url,
        PrimitiveType.string,
        true
      )
    })

    it('sets `url` to the correct value', () => {
      expect(html.url).toEqual(url)
    })

    it('sets `page` to the correct value', () => {
      expect(html.page).toBeUndefined()
    })

    it('returns the `Html` instance', () => {
      expect(result).toBeInstanceOf(Html)
    })
  })

  describe('setWithTransparentBackground', () => {
    beforeEach(() => {
      result = html.setWithTransparentBackground(true)
    })

    it('sets `withTransparentBackground` to the correct value', () => {
      expect(html.withTransparentBackground).toEqual(true)
    })

    it('returns the `Html` instance', () => {
      expect(result).toBeInstanceOf(Html)
    })
  })
})
