import { LayerFormatValue, LayerHorizontalAlignmentValue } from 'constant'
import { TextErrorText, VisualMediaErrorText } from 'strings'

import { validateLayerFormat, validateTextAligment } from './'

describe('validateLayerFormat', () => {
  it('returns `undefined` when the provided `layerFormat` is valid', () => {
    expect(validateLayerFormat(LayerFormatValue.fit)).toBeUndefined()
  })

  it('returns the correct error text when the provided `layerFormat` is invalid', () => {
    const invalidLayerFormat = 'invalid-layer-format'

    expect(validateLayerFormat(invalidLayerFormat as any)).toEqual(
      VisualMediaErrorText.invalidLayerFormat(invalidLayerFormat)
    )
  })
})

describe('validateTextAligment', () => {
  it('returns `undefined` when the provided `textAlignment` is valid', () => {
    expect(validateTextAligment(LayerHorizontalAlignmentValue.center)).toBeUndefined()
  })

  it('returns the correct error text when the provided `textAlignment` is invalid', () => {
    const invalidTextAlignment = 'invalid-text-alignment'

    expect(validateTextAligment(invalidTextAlignment as any)).toEqual(
      TextErrorText.invalidTextAlignment(invalidTextAlignment)
    )
  })
})
