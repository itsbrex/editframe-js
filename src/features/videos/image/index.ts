import { CompositionInterface, FilterOptions, LayerAttribute, LayerAttributeValue, Size, Trim } from 'constant'
import { ValidationErrorText } from 'strings'
import { validateFilter, validatePresenceOf } from 'utils'

export class Image {
  private _composition: CompositionInterface
  private _id: string

  constructor({ composition, id }: { composition: CompositionInterface; id: string }) {
    this._composition = composition
    this._id = id
  }

  get id(): string {
    return this._id
  }

  setDimensions({ height, width }: Size): Image {
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
  }): Image {
    const error = validateFilter(filterName, options)

    if (error) {
      throw new Error(error)
    }

    return this._updateAttribute(LayerAttribute.filter, {
      filterName,
      options,
    })
  }

  setTrim(trim: Trim): Image {
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

  _updateAttribute(layerAttribute: LayerAttribute, value: LayerAttributeValue): Image {
    this._composition.updateLayerAttribute(this._id, layerAttribute, value)

    return this
  }
}
