import { CompositionInterface, FilterMethod, FilterOptions, LayerAttribute } from 'constant'
import { Layer } from 'features/videos/layer'
import { validateFilter } from 'utils'

export class Filter extends Layer {
  constructor({ composition, id }: { composition: CompositionInterface; id: string }) {
    super({ composition, id })
  }

  public [FilterMethod.setFilter]<FilterName extends keyof FilterOptions>({
    filterName,
    options,
  }: {
    filterName: FilterName
    options: FilterOptions[FilterName]
  }): this {
    validateFilter(FilterMethod.setFilter, LayerAttribute.filter, { filterName, options })

    return this._updateAttribute(LayerAttribute.filter, { filterName, options })
  }
}
