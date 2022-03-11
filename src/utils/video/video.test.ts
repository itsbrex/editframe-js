import { VisualMediaErrorText } from 'strings'

import { validateLayerFormat } from './'

describe('validateLayerFormat', () => {
  it('throws the correct error text when the provided `layerFormat` is invalid', () => {
    const invalidLayerFormat = 'invalid-layer-format'

    expect(() => validateLayerFormat(invalidLayerFormat as any)).toThrow(
      new Error(VisualMediaErrorText.invalidLayerFormat(invalidLayerFormat))
    )
  })
})
