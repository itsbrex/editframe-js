import {
  ChildKey,
  CompositionInterface,
  FilterKey,
  FilterMethod,
  FilterOptionKey,
  FilterOptions,
  Filters,
  LayerKey,
  LayerType,
} from 'constant'
import { Layer } from 'features/videos/layer'
import { translateColor, validateFilterLayer, withValidation } from 'utils'

export class Filter extends Layer {
  constructor({ composition, id }: { composition: CompositionInterface; id: string }) {
    super({ composition, id })
  }

  get type(): LayerType {
    return LayerType.filter
  }

  get name(): string {
    return this._getFilterAttribute<string>(FilterKey.name)
  }

  get options(): FilterOptions[FilterKey.options] {
    return this._getFilterAttribute<FilterOptions[FilterKey.options]>(FilterKey.options)
  }

  public [FilterMethod.setFilter]<FilterName extends keyof Filters>({
    name,
    options,
  }: {
    name: FilterName
    options?: Filters[FilterName]
  }): this {
    return withValidation<this>(
      () => validateFilterLayer(FilterMethod.setFilter, { filter: { name, options } }),
      () => {
        if (FilterOptionKey.color in options) {
          options.color = translateColor(options.color)
        }

        return this.setAttribute({ layerKey: LayerKey.filter, value: { name, options } })
      }
    )
  }

  private _getFilterAttribute<AttributeValue>(childKey: ChildKey): AttributeValue {
    return this.getAttribute<AttributeValue>({ childKey, layerKey: LayerKey.filter })
  }
}
