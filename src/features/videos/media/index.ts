import { CompositionInterface, LayerAttribute, MediaMethod, PrimitiveType, Trim } from 'constant'
import { Layer } from 'features/videos/layer'
import { ValidationErrorText } from 'strings'
import { validatePresenceOf, validateValueIsOfType, withValidation } from 'utils'

export class Media extends Layer {
  constructor({ composition, id }: { composition: CompositionInterface; id: string }) {
    super({ composition, id })
  }

  [MediaMethod.setTrim]({ end, start }: Trim): this | void {
    withValidation<this>(
      () => {
        validatePresenceOf(start, ValidationErrorText.REQUIRED_FIELD(LayerAttribute.start))
        validateValueIsOfType(MediaMethod.setTrim, LayerAttribute.start, start, PrimitiveType.number, true)
        validateValueIsOfType(MediaMethod.setTrim, LayerAttribute.end, end, PrimitiveType.number, true)
      },
      () => {
        this._updateAttribute(LayerAttribute.start, start < 0 ? 0 : start)

        if (end) {
          this._updateAttribute(LayerAttribute.end, end)
        }

        return this
      }
    )
  }
}
