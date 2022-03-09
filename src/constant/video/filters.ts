import {
  FilterBrightness,
  FilterContrast,
  FilterFadeIn,
  FilterName,
  FilterOptionKey,
  FilterSaturation,
} from '@editframe/shared-types'

import { PrimitiveType } from 'constant/common'

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
  [FilterAttribute.filterName]: FilterName
  [FilterAttribute.options]?: FilterBrightness | FilterContrast | FilterFadeIn | FilterSaturation
}

export enum FilterMethod {
  setFilter = 'setFilter',
}
