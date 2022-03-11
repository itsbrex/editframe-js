import { CompositionInterface, FilterMethod, Filter as FilterType, LayerAttribute } from 'constant'
import { Layer } from 'features/videos/layer'
import { validateFilter, withValidation } from 'utils'

export class Filter extends Layer {
  constructor({ composition, id }: { composition: CompositionInterface; id: string }) {
    super({ composition, id })
  }

  public [FilterMethod.setFilter]({ filterName, options }: FilterType): this | void {
    return withValidation<this>(
      () => validateFilter(FilterMethod.setFilter, LayerAttribute.filter, { filterName, options }, true),
      () => this._updateAttribute(LayerAttribute.filter, { filterName, options })
    )
  }
}
