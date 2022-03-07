import { Mixin } from 'ts-mixer'

import { CompositionInterface, FilterOptions, LayerAttribute, Size, VideoMethod } from 'constant'
import { Audio } from 'features/videos/audio'
import { VisualMedia } from 'features/videos/visualMedia'
import { ValidationErrorText } from 'strings'
import { validateFilter, validatePresenceOf, withValidation } from 'utils'

export class Video extends Mixin(Audio, VisualMedia) {
  constructor({ composition, id }: { composition: CompositionInterface; id: string }) {
    super({ composition, id })
  }

  [VideoMethod.setDimensions]({ height, width }: Size): Video | void {
    withValidation<Video>(
      () => {
        validatePresenceOf(height, ValidationErrorText.REQUIRED_FIELD(LayerAttribute.height))
        validatePresenceOf(width, ValidationErrorText.REQUIRED_FIELD(LayerAttribute.width))
      },
      () => {
        this._updateAttribute(LayerAttribute.height, height)

        return this._updateAttribute(LayerAttribute.width, width)
      }
    )
  }

  [VideoMethod.setFilter]<FilterName extends keyof FilterOptions>({
    filterName,
    options,
  }: {
    filterName: FilterName
    options?: FilterOptions[FilterName]
  }): Video | void {
    withValidation<Video>(
      () => validateFilter(VideoMethod.setFilter, LayerAttribute.filter, { filterName, options }, true),
      () =>
        this._updateAttribute(LayerAttribute.filter, {
          filterName,
          options,
        })
    )
  }
}
