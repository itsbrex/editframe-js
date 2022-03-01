import { Mixin } from 'ts-mixer'

import { CompositionInterface, FilterOptions, LayerAttribute, Size } from 'constant'
import { Audio } from 'features/videos/audio'
import { VisualMedia } from 'features/videos/visualMedia'
import { ValidationErrorText } from 'strings'
import { validateFilter, validatePresenceOf } from 'utils'

export class Video extends Mixin(Audio, VisualMedia) {
  constructor({ composition, id }: { composition: CompositionInterface; id: string }) {
    super({ composition, id })
  }

  setDimensions({ height, width }: Size): Video {
    let error = validatePresenceOf({
      errorMessage: ValidationErrorText.REQUIRED_FIELD(LayerAttribute.height),
      value: height,
    })

    error = validatePresenceOf({ errorMessage: ValidationErrorText.REQUIRED_FIELD(LayerAttribute.width), value: width })

    if (error) {
      throw new Error(error)
    }

    this._updateAttribute(LayerAttribute.height, height)

    return this._updateAttribute(LayerAttribute.width, width)
  }

  setFilter<FilterName extends keyof FilterOptions>({
    filterName,
    options,
  }: {
    filterName: FilterName
    options: FilterOptions[FilterName]
  }): Video {
    const error = validateFilter(filterName, options)

    if (error) {
      throw new Error(error)
    }

    return this._updateAttribute(LayerAttribute.filter, {
      filterName,
      options,
    })
  }
}
