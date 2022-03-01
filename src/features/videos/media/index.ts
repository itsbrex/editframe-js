import { CompositionInterface, LayerAttribute, MediaMethod, PrimitiveType, Trim } from 'constant'
import { Layer } from 'features/videos/layer'
import { ValidationErrorText } from 'strings'
import { logValidationError, validatePresenceOf, validateValueIsOfType } from 'utils'

export class Media extends Layer {
  constructor({ composition, id }: { composition: CompositionInterface; id: string }) {
    super({ composition, id })
  }

  [MediaMethod.setTrim](trim: Trim): this | void {
    try {
      validatePresenceOf(trim.start, ValidationErrorText.REQUIRED_FIELD(LayerAttribute.start))
      validateValueIsOfType(MediaMethod.setTrim, LayerAttribute.start, trim.start, PrimitiveType.number, true)

      const { end } = trim
      const start = trim.start < 0 ? 0 : trim.start

      this._updateAttribute(LayerAttribute.start, start)

      if (end) {
        validateValueIsOfType(MediaMethod.setTrim, LayerAttribute.end, end, PrimitiveType.number, true)
        this._updateAttribute(LayerAttribute.end, end)
      }

      return this
    } catch ({ stack }) {
      logValidationError(stack)
    }
  }
}
