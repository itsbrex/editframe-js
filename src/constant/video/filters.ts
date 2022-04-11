import { FilterName, FilterOptionKey } from '@editframe/shared-types'

import { PrimitiveType } from 'constant/common'

export {
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
