import { Mixin } from 'ts-mixer'

import { CompositionInterface, FilterOptions, LayerAttribute, Size, VideoMethod } from 'constant'
import { Audio } from 'features/videos/audio'
import { VisualMedia } from 'features/videos/visualMedia'
import { ValidationErrorText } from 'strings'
import { logValidationError, validateFilter, validatePresenceOf } from 'utils'

export class Video extends Mixin(Audio, VisualMedia) {
  constructor({ composition, id }: { composition: CompositionInterface; id: string }) {
    super({ composition, id })
  }

  [VideoMethod.setDimensions]({ height, width }: Size): Video | void {
    try {
      validatePresenceOf(height, ValidationErrorText.REQUIRED_FIELD(LayerAttribute.height))
      validatePresenceOf(width, ValidationErrorText.REQUIRED_FIELD(LayerAttribute.width))

      this._updateAttribute(LayerAttribute.height, height)

      return this._updateAttribute(LayerAttribute.width, width)
    } catch ({ stack }) {
      logValidationError(stack)
    }
  }

  [VideoMethod.setFilter]<FilterName extends keyof FilterOptions>({
    filterName,
    options,
  }: {
    filterName: FilterName
    options: FilterOptions[FilterName]
  }): Video | void {
    try {
      validateFilter(VideoMethod.setFilter, LayerAttribute.filter, { filterName, options }, true)

      return this._updateAttribute(LayerAttribute.filter, {
        filterName,
        options,
      })
    } catch ({ stack }) {
      logValidationError(stack)
    }
  }
}
