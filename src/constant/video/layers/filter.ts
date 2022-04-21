import { PrimitiveType } from 'constant/common'
import { FilterName, FilterOptionKey, FilterOptions } from 'constant/shared'

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

export const defaultFilterOptions: FilterOptions = { name: undefined, options: undefined } as any

export const defaultFilterLayer = { filter: defaultFilterOptions }
