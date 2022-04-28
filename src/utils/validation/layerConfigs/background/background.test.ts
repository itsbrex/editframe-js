import { BackgroundKey, BackgroundMethod, Color, LayerKey, PrimitiveType } from 'constant'
import { mockBackgroundOptions } from 'mocks'
import { ValidationErrorText } from 'strings'
import * as ValidationUtilsModule from 'utils/validation'

import { validateBackground, validateBackgroundMixin } from './'

describe('validateBackground', () => {
  const callerName = 'caller-name'
  const color = Color.white
  const opacity = 1
  let validateValueIsOfTypeSpy: jest.SpyInstance

  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    validateValueIsOfTypeSpy = jest.spyOn(ValidationUtilsModule, 'validateValueIsOfType')

    validateBackground({ callerName, layer: { background: { color, opacity } } })
  })

  it('calls the `validateValueIsOfType` function with the correct arguments', () => {
    expect(validateValueIsOfTypeSpy).toHaveBeenCalledTimes(2)

    expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.background, BackgroundKey.color),
      color,
      PrimitiveType.string
    )

    expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.background, BackgroundKey.opacity),
      opacity,
      PrimitiveType.number
    )
  })
})

describe('validateBackgroundMixin', () => {
  const callerName = BackgroundMethod.setBackgroundColor
  const background = mockBackgroundOptions()
  const layer = { background }
  let validateLayerSpy: jest.SpyInstance

  beforeEach(() => {
    validateLayerSpy = jest.spyOn(ValidationUtilsModule, 'validateLayer')
  })

  it('calls the `validateLayer` function with the correct arguments', () => {
    validateBackgroundMixin(callerName, layer)

    expect(validateLayerSpy).toHaveBeenCalledWith([validateBackground], callerName, layer)
  })
})
