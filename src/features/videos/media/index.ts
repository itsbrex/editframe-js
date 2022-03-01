import { CompositionInterface, LayerAttribute, MediaMethod, PrimitiveType, Trim } from 'constant'
import { Layer } from 'features/videos/layer'
import { ValidationErrorText } from 'strings'
import { validatePresenceOf, validateValueIsOfType } from 'utils'

export class Media extends Layer {
  constructor({ composition, id }: { composition: CompositionInterface; id: string }) {
    super({ composition, id })
  }

  [MediaMethod.setTrim](trim: Trim): this {
    validatePresenceOf(trim.start, ValidationErrorText.REQUIRED_FIELD(LayerAttribute.start))
    validateValueIsOfType(MediaMethod.setTrim, LayerAttribute.start, trim.start, PrimitiveType.number)

    const start = trim.start < 0 ? 0 : trim.start

    this._updateAttribute(LayerAttribute.start, start)

    if (trim.end) {
      validateValueIsOfType(MediaMethod.setTrim, LayerAttribute.end, trim.end, PrimitiveType.number)
      this._updateAttribute(LayerAttribute.end, trim.end)
    }

    return this
  }
}
