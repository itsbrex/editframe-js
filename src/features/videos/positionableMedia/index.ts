import { CompositionInterface, LayerAttribute, PositionableMediaMethod, X, Y } from 'constant'
import { Media } from 'features/videos/media'
import { validateX, validateY, withValidation } from 'utils'

export class PositionableMedia extends Media {
  constructor({ composition, id }: { composition: CompositionInterface; id: string }) {
    super({ composition, id })
  }

  public [PositionableMediaMethod.setX](x?: X): this | void {
    withValidation<this>(
      () => validateX(PositionableMediaMethod.setX, x),
      () => this._updateAttribute(LayerAttribute.x, x)
    )
  }

  public [PositionableMediaMethod.setY](y?: Y): this | void {
    withValidation<this>(
      () => validateY(PositionableMediaMethod.setY, y),
      () => this._updateAttribute(LayerAttribute.y, y)
    )
  }
}
