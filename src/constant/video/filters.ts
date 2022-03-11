import {
  FilterBrightness,
  FilterContrast,
  FilterFadeIn,
  FilterName,
  FilterNames,
  FilterOptionKey,
  FilterOptions,
  FilterSaturation,
} from '@editframe/shared-types'

import { PrimitiveType } from 'constant/common'

export { FilterName as FilterName }
export { FilterOptionKey as FilterOptionKey }
export type { FilterOptions as FilterOptions }
export type { FilterBrightness as FilterBrightness }
export type { FilterContrast as FilterContrast }
export type { FilterFadeIn as FilterFadeIn }
export type { FilterSaturation as FilterSaturation }

export const FilterOptionTypes = {
  [FilterName.brightness]: {
    [FilterOptionKey.brightness]: PrimitiveType.number,
  },
  [FilterName.contrast]: {
    [FilterOptionKey.contrast]: PrimitiveType.number,
  },
  [FilterName.fadeIn]: {
    [FilterOptionKey.color]: PrimitiveType.string,
    [FilterOptionKey.duration]: PrimitiveType.number,
  },
  [FilterName.saturation]: {
    [FilterOptionKey.saturation]: PrimitiveType.number,
  },
}

export enum FilterAttribute {
  filterName = 'filterName',
  options = 'options',
}

export type Filter = {
  [FilterAttribute.filterName]: FilterNames
  [FilterAttribute.options]?: FilterBrightness | FilterContrast | FilterFadeIn | FilterSaturation
}

export enum FilterMethod {
  setFilter = 'setFilter',
}
