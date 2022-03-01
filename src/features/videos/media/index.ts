import { CompositionInterface, LayerAttribute, LayerTrim, MediaMethod } from 'constant'
import { Layer } from 'features/videos/layer'
import { ValidationErrorText } from 'strings'
import { validatePresenceOf } from 'utils'

export class Media extends Layer {
  constructor({ composition, id }: { composition: CompositionInterface; id: string }) {
    super({ composition, id })
  }

  [MediaMethod.setTrim](trim: LayerTrim): this {
    const error = validatePresenceOf({
      errorMessage: ValidationErrorText.REQUIRED_FIELD(LayerAttribute.start),
      value: trim.start,
    })

    if (error) {
      throw new Error(error)
    }

    const { end } = trim
    const start = trim.start < 0 ? 0 : trim.start

    this._updateAttribute(LayerAttribute.start, start)

    if (end) {
      this._updateAttribute(LayerAttribute.end, end)
    }

    return this
  }
}
