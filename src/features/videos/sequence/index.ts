import { CompositionInterface, LayerAttribute, PrimitiveType, SequenceMethod } from 'constant'
import { Layer } from 'features/videos/layer'
import { validateValueIsOfType, withValidation } from 'utils'

export class Sequence extends Layer {
  public layers: Layer[]

  constructor({ composition, id, layers }: { composition: CompositionInterface; id: string; layers: Layer[] }) {
    super({ composition, id })
    this.layers = layers
  }

  public [SequenceMethod.setStart](start = 0): this | void {
    return withValidation<this>(
      () => validateValueIsOfType(SequenceMethod.setStart, LayerAttribute.start, start, PrimitiveType.number, true),
      () => {
        this.layers.forEach((layer) => {
          layer.setStart(layer.start + (start - this.start))
        })

        return this._updateAttribute(LayerAttribute.start, start)
      }
    )
  }
}
