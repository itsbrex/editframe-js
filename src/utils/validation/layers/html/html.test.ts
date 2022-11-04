import { HtmlKey, HtmlPageKey, LayerKey, PrimitiveType } from 'constant'
import { mockHtmlLayer, mockHtmlLayerConfig, mockHtmlOptions } from 'mocks'
import { CompositionErrorText, ValidationErrorText } from 'strings'
import { deepMerge } from 'utils/objects'
import * as ValidationUtilsModule from 'utils/validation'
import * as LayerConfigValidationUtilsModule from 'utils/validation/layerConfigs'

import { validateHtml, validateHtmlLayer } from './'

describe('validateHtml', () => {
  const callerName = 'caller-name'
  const htmlLayerConfig = mockHtmlLayerConfig()
  let validateValueIsOfTypeSpy: jest.SpyInstance

  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    validateValueIsOfTypeSpy = jest.spyOn(ValidationUtilsModule, 'validateValueIsOfType')
  })

  it('adds the `htmlPageOrUrlRequired` error when neither `page` or `url` is provided', () => {
    const htmlOptions = mockHtmlOptions({ withHtml: false, withUrl: false })
    const layer = deepMerge({ html: htmlOptions }, htmlLayerConfig)
    const finalErrors = validateHtml({ callerName, layer })

    expect(finalErrors).toEqual([CompositionErrorText.htmlPageOrUrlRequired])
  })

  it('calls the `validateValueIsOfType` function with the correct arguments', () => {
    const htmlOptions = mockHtmlOptions({ withHtml: true, withUrl: false })
    const layer = deepMerge({ html: htmlOptions }, htmlLayerConfig)
    const finalErrors = validateHtml({ callerName, layer })
    const {
      html: { page, url, withTailwind, withTransparentBackground },
    } = layer

    expect(validateValueIsOfTypeSpy).toHaveBeenCalledTimes(5)

    expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.html, ValidationErrorText.SUB_FIELD(HtmlKey.page, HtmlPageKey.body)),
      page?.body,
      PrimitiveType.string
    )

    expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.html, ValidationErrorText.SUB_FIELD(HtmlKey.page, HtmlPageKey.styles)),
      page?.styles,
      PrimitiveType.string
    )

    expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.html, HtmlKey.withTailwind),
      withTailwind,
      PrimitiveType.boolean
    )

    expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.html, HtmlKey.withTransparentBackground),
      withTransparentBackground,
      PrimitiveType.boolean
    )

    expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.html, HtmlKey.url),
      url,
      PrimitiveType.string
    )

    expect(finalErrors).toEqual([])
  })
})

describe('validateHtmlLayer', () => {
  const callerName = 'caller-name'
  const layer = mockHtmlLayer()
  let validatePositionSpy: jest.SpyInstance
  let validateSizeSpy: jest.SpyInstance
  let validateTimelineSpy: jest.SpyInstance
  let validateTrimSpy: jest.SpyInstance

  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    validatePositionSpy = jest.spyOn(LayerConfigValidationUtilsModule, 'validatePosition')
    validateSizeSpy = jest.spyOn(LayerConfigValidationUtilsModule, 'validateSize')
    validateTimelineSpy = jest.spyOn(LayerConfigValidationUtilsModule, 'validateTimeline')
    validateTrimSpy = jest.spyOn(LayerConfigValidationUtilsModule, 'validateTrim')

    validateHtmlLayer(callerName, layer)
  })

  it('calls the `validatePosition` function with the correct arguments', () => {
    expect(validatePositionSpy).toHaveBeenCalledWith({ callerName, layer })
  })

  it('calls the `validateSize` function with the correct arguments', () => {
    expect(validateSizeSpy).toHaveBeenCalledWith({ callerName, layer })
  })

  it('calls the `validateTimeline` function with the correct arguments', () => {
    expect(validateTimelineSpy).toHaveBeenCalledWith({ callerName, layer })
  })

  it('calls the `validateTrim` function with the correct arguments', () => {
    expect(validateTrimSpy).toHaveBeenCalledWith({ callerName, layer })
  })
})
