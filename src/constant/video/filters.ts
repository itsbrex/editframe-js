import {
  Filter,
  FilterAttribute,
  FilterBrightness,
  FilterContrast,
  FilterFade,
  FilterName,
  FilterOptionKey,
  FilterOptions,
  FilterSaturation,
} from '@editframe/shared-types'

import { PrimitiveType } from 'constant/common'

export type { Filter as Filter }
export type { FilterBrightness as FilterBrightness }
export type { FilterContrast as FilterContrast }
export type { FilterFade as FilterFade }
export type { FilterOptions as FilterOptions }
export type { FilterSaturation as FilterSaturation }
export { FilterAttribute as FilterAttribute }
export { FilterName as FilterName }
export { FilterOptionKey as FilterOptionKey }

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
    [FilterOptionKey.startTime]: PrimitiveType.number,
  },
  [FilterName.fadeOut]: {
    [FilterOptionKey.color]: PrimitiveType.string,
    [FilterOptionKey.duration]: PrimitiveType.number,
    [FilterOptionKey.startTime]: PrimitiveType.number,
  },
  [FilterName.saturation]: {
    [FilterOptionKey.saturation]: PrimitiveType.number,
  },
}

export enum FilterMethod {
  setFilter = 'setFilter',
}
