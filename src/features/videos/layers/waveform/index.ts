import { Mixin } from 'ts-mixer'

import {
  ChildKey,
  CompositionInterface,
  LayerAttributeValue,
  LayerKey,
  LayerType,
  PrimitiveType,
  WaveformKey,
  WaveformMethod,
  WaveformStyle,
} from 'constant'
import { PositionMixin } from 'features/videos/mixins/positionMixin'
import { SizeMixin } from 'features/videos/mixins/sizeMixin'
import { TimelineMixin } from 'features/videos/mixins/timelineMixin'
import { TransitionsMixin } from 'features/videos/mixins/transitionMixin'
import { TrimMixin } from 'features/videos/mixins/trimMixin'
import { validateValueIsOfType, withValidation } from 'utils'

export class Waveform extends Mixin(PositionMixin, SizeMixin, TimelineMixin, TransitionsMixin, TrimMixin) {
  constructor({ composition, id }: { composition: CompositionInterface; id: string }) {
    super({ composition, id })
  }

  get type(): LayerType {
    return LayerType.waveform
  }

  get backgroundColor(): string | undefined {
    return this._getWaveformAttribute<string | undefined>(WaveformKey.backgroundColor)
  }

  get color(): string | undefined {
    return this._getWaveformAttribute<string | undefined>(WaveformKey.color)
  }

  get style(): WaveformStyle | undefined {
    return this._getWaveformAttribute<WaveformStyle | undefined>(WaveformKey.style)
  }

  [WaveformMethod.setBackgroundColor](color?: string): this {
    return withValidation<this>(
      () => {
        validateValueIsOfType(
          WaveformMethod.setBackgroundColor,
          WaveformKey.backgroundColor,
          color,
          PrimitiveType.string,
          true
        )
      },
      () => this._setWaveformAttribute(WaveformKey.backgroundColor, color)
    )
  }

  [WaveformMethod.setColor](color?: string): this {
    return withValidation<this>(
      () => {
        validateValueIsOfType(WaveformMethod.setColor, WaveformKey.color, color, PrimitiveType.string, true)
      },
      () => this._setWaveformAttribute(WaveformKey.color, color)
    )
  }

  [WaveformMethod.setStyle](style?: WaveformStyle): this {
    return withValidation<this>(
      () => {
        validateValueIsOfType(WaveformMethod.setStyle, WaveformKey.style, style, PrimitiveType.string, true)
      },
      () => this._setWaveformAttribute(WaveformKey.style, style)
    )
  }

  private _getWaveformAttribute<AttributeValue>(childKey: ChildKey): AttributeValue {
    return this.getAttribute<AttributeValue>({ childKey, layerKey: LayerKey.waveform })
  }

  private _setWaveformAttribute(childKey: ChildKey, value: LayerAttributeValue): this {
    return this.setAttribute({ childKey, layerKey: LayerKey.waveform, value })
  }
}
