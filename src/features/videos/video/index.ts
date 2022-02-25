import { CompositionInterface, FilterOptions, LayerAttribute, LayerAttributeValue, Size, Trim } from 'constant'
import { ValidationErrorText } from 'strings'
import { validateFilter, validatePresenceOf } from 'utils'

export class Video {
  private _composition: CompositionInterface
  private _id: string

  constructor({ composition, id }: { composition: CompositionInterface; id: string }) {
    this._composition = composition
    this._id = id
  }

  get id(): string {
    return this._id
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

  setTrim(trim: Trim): Video {
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

  setVolume(volume: number): Video {
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

  setMuted(): Video {
    return this._updateAttribute(LayerAttribute.volume, 0)
  }

  _updateAttribute(layerAttribute: LayerAttribute, value: LayerAttributeValue): Video {
    this._composition.updateLayerAttribute(this._id, layerAttribute, value)

    return this
  }
}
