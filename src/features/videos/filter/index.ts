import { FilterOptions } from '@editframe/shared-types'

import { CompositionInterface, FilterMethod, LayerAttribute } from 'constant'
import { Layer } from 'features/videos/layer'
import { validateFilter, withValidation } from 'utils'

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
    return withValidation<this>(
      () => validateFilter(FilterMethod.setFilter, LayerAttribute.filter, { filterName, options }, true),
      () => this._updateAttribute(LayerAttribute.filter, { filterName, options })
    )
  }
}
