import { CompositionInterface, LayerAttribute, SubtitlesMethod, SubtitlesOptions } from 'constant'
import { PositionableMedia } from 'features/videos/positionableMedia'
import { validateLayerSubtitles, withValidation } from 'utils'

export class Subtitles extends PositionableMedia {
  constructor({ composition, id }: { composition: CompositionInterface; id: string }) {
    super({ composition, id })
  }

  public [SubtitlesMethod.setSubtitlesOptions](subtitles?: SubtitlesOptions): this | void {
    withValidation<this>(
      () => validateLayerSubtitles(SubtitlesMethod.setSubtitlesOptions, { [LayerAttribute.subtitles]: subtitles }),
      () => this._updateAttribute(LayerAttribute.subtitles, subtitles)
    )
  }
}
