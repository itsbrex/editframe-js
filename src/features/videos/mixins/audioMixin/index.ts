import { AudioKey, AudioMethod, ChildKey, CompositionInterface, LayerAttributeValue, LayerKey } from 'constant'
import { Layer } from 'features/videos/layer'
import { validateAudioMixin, withValidation } from 'utils'

export class AudioMixin extends Layer {
  constructor({ composition, id }: { composition: CompositionInterface; id: string }) {
    super({ composition, id })
  }

  get volume(): number | undefined {
    return this._getAudioAttribute<number | undefined>(AudioKey.volume)
  }

  [AudioMethod.setVolume](volume?: number): this {
    return withValidation<this>(
      () => {
        validateAudioMixin(AudioMethod.setVolume, { audio: { volume } })
      },
      () => {
        let newVolume = volume

        if (volume > 1) {
          newVolume = 1
        } else if (volume < 0) {
          newVolume = 0
        }

        return this._setAudioAttribute(AudioKey.volume, newVolume)
      }
    )
  }

  setMuted(): this {
    return this._setAudioAttribute(AudioKey.volume, 0)
  }

  private _getAudioAttribute<AttributeValue>(childKey: ChildKey): AttributeValue {
    return this.getAttribute<AttributeValue>({ childKey, layerKey: LayerKey.audio })
  }

  private _setAudioAttribute(childKey: ChildKey, value: LayerAttributeValue): this {
    return this.setAttribute({ childKey, layerKey: LayerKey.audio, value })
  }
}
