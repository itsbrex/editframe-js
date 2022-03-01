import { TextErrorText, VisualMediaErrorText } from 'strings'

import { validateLayerFormat, validateTextAligment } from './'

describe('validateLayerFormat', () => {
  it('throws the correct error text when the provided `layerFormat` is invalid', () => {
    const invalidLayerFormat = 'invalid-layer-format'

    expect(() => validateLayerFormat(invalidLayerFormat as any)).toThrow(
      new Error(VisualMediaErrorText.invalidLayerFormat(invalidLayerFormat))
    )
  })
})

describe('validateTextAligment', () => {
  it('throws the correct error text when the provided `textAlignment` is invalid', () => {
    const invalidTextAlignment = 'invalid-text-alignment'

    expect(() => validateTextAligment(invalidTextAlignment as any)).toThrow(
      new Error(TextErrorText.invalidTextAlignment(invalidTextAlignment))
    )
  })
})
