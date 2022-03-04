import { CompositionInterface, FilterMethod, FilterOptions, LayerAttribute } from 'constant'
import { Layer } from 'features/videos/layer'
import { logValidationError, validateFilter } from 'utils'

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
  }): this | void {
    try {
      validateFilter(FilterMethod.setFilter, LayerAttribute.filter, { filterName, options }, true)

      return this._updateAttribute(LayerAttribute.filter, { filterName, options })
    } catch ({ stack }) {
      logValidationError(stack)
    }
  }
}
