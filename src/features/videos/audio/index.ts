import { CompositionInterface, LayerAttribute, LayerAttributeValue, Trim } from 'constant'
import { ValidationErrorText } from 'strings'
import { validatePresenceOf } from 'utils'

export class Audio {
  private _composition: CompositionInterface
  private _id: string

  constructor({ composition, id }: { composition: CompositionInterface; id: string }) {
    this._composition = composition
    this._id = id
  }

  get id(): string {
    return this._id
  }

  setTrim(trim: Trim): Audio {
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

  setVolume(volume: number): Audio {
    const error = validatePresenceOf({
      errorMessage: ValidationErrorText.REQUIRED_FIELD(LayerAttribute.volume),
      value: volume,
    })

    if (error) {
      throw new Error(error)
    }

    let newVolume = volume

    if (volume > 1) {
      newVolume = 1
    } else if (volume < 0) {
      newVolume = 0
    }

    return this._updateAttribute(LayerAttribute.volume, newVolume)
  }

  setMuted(): Audio {
    return this._updateAttribute(LayerAttribute.volume, 0)
  }

  _updateAttribute(layerAttribute: LayerAttribute, value: LayerAttributeValue): Audio {
    this._composition.updateLayerAttribute(this._id, layerAttribute, value)

    return this
  }
}
