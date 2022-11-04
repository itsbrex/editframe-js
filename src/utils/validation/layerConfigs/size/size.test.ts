import { FormatValue, LayerKey, PrimitiveType, SizeKey, SizeMethod } from 'constant'
import { mockSizeOptions } from 'mocks'
import { ValidationErrorText } from 'strings'
import * as ValidationUtilsModule from 'utils/validation'

import { validateSize, validateSizeMixin } from './'

describe('validateSize', () => {
  const callerName = 'caller-name'
  const format = 'fill'
  const height = 5
  const scale = 0.5
  const width = 10
  let validateValueIsInListSpy: jest.SpyInstance
  let validateValueIsOfTypeSpy: jest.SpyInstance

  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    validateValueIsInListSpy = jest.spyOn(ValidationUtilsModule, 'validateValueIsInList')
    validateValueIsOfTypeSpy = jest.spyOn(ValidationUtilsModule, 'validateValueIsOfType')

    validateSize({ callerName, layer: { size: { format, height, scale, width } } })
  })

  it('calls the `validateValueIsInList` function with the correct arguments', () => {
    expect(validateValueIsInListSpy).toHaveBeenCalledWith(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.size, SizeKey.format),
      format,
      Object.values(FormatValue)
    )
  })

  it('calls the `validateValueIsOfType` function with the correct arguments', () => {
    expect(validateValueIsOfTypeSpy).toHaveBeenCalledTimes(3)

    expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.size, SizeKey.height),
      height,
      PrimitiveType.number
    )

    expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.size, SizeKey.scale),
      scale,
      PrimitiveType.number
    )

    expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.size, SizeKey.width),
      width,
      PrimitiveType.number
    )
  })
})

describe('validateSizeMixin', () => {
  const callerName = SizeMethod.setHeight
  const size = mockSizeOptions()
  const layer = { size }
  let validateLayerSpy: jest.SpyInstance

  beforeEach(() => {
    validateLayerSpy = jest.spyOn(ValidationUtilsModule, 'validateLayer')
  })

  it('calls the `validateLayer` function with the correct arguments', () => {
    validateSizeMixin(callerName, layer)

    expect(validateLayerSpy).toHaveBeenCalledWith([validateSize], callerName, layer)
  })
})
