import { CompositionInterface, FilterOptions, LayerAttribute } from 'constant'
import { Layer } from 'features/videos/layer'
import { validateFilter } from 'utils'

export class Filter extends Layer {
  constructor({ composition, id }: { composition: CompositionInterface; id: string }) {
    super({ composition, id })
  }

  public setFilter<FilterName extends keyof FilterOptions>({
    name,
    options,
  }: {
    name: FilterName
    options: FilterOptions[FilterName]
  }): this {
    const error = validateFilter(name, options)

    if (error) {
      throw new Error(error)
    }

    return this._updateAttribute(LayerAttribute.filter, { filterName: name, options })
  }
}
