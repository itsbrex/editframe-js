import { LayerKey, PrimitiveType, TrimKey, TrimMethod } from 'constant'
import { mockTrimOptions } from 'mocks'
import { ValidationErrorText } from 'strings'
import * as ValidationUtilsModule from 'utils/validation'

import { validateTrim, validateTrimMixin } from './'

describe('validateTrim', () => {
  const end = 10
  const start = 5
  const callerName = 'caller-name'
  let validateValueIsOfTypeSpy: jest.SpyInstance

  beforeEach(() => {
    validateValueIsOfTypeSpy = jest.spyOn(ValidationUtilsModule, 'validateValueIsOfType')
  })

  it('calls the `validateValueIsOfType` function with the correct arguments', () => {
    validateTrim({ callerName, layer: { trim: { end, start } } })

    expect(validateValueIsOfTypeSpy).toHaveBeenCalledTimes(2)

    expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.trim, TrimKey.start),
      start,
      PrimitiveType.number
    )

    expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.trim, TrimKey.end),
      end,
      PrimitiveType.number
    )
  })
})

describe('validateTrimMixin', () => {
  const callerName = TrimMethod.setTrim
  const trim = mockTrimOptions()
  const layer = { trim }
  let validateLayerSpy: jest.SpyInstance

  beforeEach(() => {
    validateLayerSpy = jest.spyOn(ValidationUtilsModule, 'validateLayer')
  })

  it('calls the `validateLayer` function with the correct arguments', () => {
    validateTrimMixin(callerName, layer)

    expect(validateLayerSpy).toHaveBeenCalledWith([validateTrim], callerName, layer)
  })
})
