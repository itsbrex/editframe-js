import { CompositionInterface, LayerAttribute } from 'constant'
import { Media } from 'features/videos/media'
import { ValidationErrorText } from 'strings'
import { validatePresenceOf } from 'utils'

export class Audio extends Media {
  constructor({ composition, id }: { composition: CompositionInterface; id: string }) {
    super({ composition, id })
  }

  setVolume(volume: number): this {
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

  setMuted(): this {
    return this._updateAttribute(LayerAttribute.volume, 0)
  }
}
