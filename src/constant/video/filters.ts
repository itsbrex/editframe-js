import { PrimitiveType } from 'constant/common'

export enum FilterName {
  brightness = 'brightness',
  contrast = 'contrast',
  fadeIn = 'fadein',
  fadeOut = 'fadeout',
  grayscale = 'grayscale',
  lighten = 'lighten',
  negative = 'negative',
  saturation = 'saturation',
  sobel = 'sobel',
  vintage = 'vintage',
}

export enum FilterOptionKey {
  brightness = 'brightness',
  color = 'color',
  contrast = 'contrast',
  duration = 'duration',
  saturation = 'saturation',
}

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

export interface FilterBrightness {
  [FilterOptionKey.brightness]: number
}

export interface FilterContrast {
  [FilterOptionKey.contrast]: number
}

export interface FilterFadeIn {
  [FilterOptionKey.color]: string
  [FilterOptionKey.duration]: number
}

export interface FilterSaturation {
  [FilterOptionKey.saturation]: number
}

export interface FilterOptions {
  [FilterName.brightness]: FilterBrightness
  [FilterName.contrast]: FilterContrast
  [FilterName.fadeIn]: FilterFadeIn
  [FilterName.fadeOut]: undefined
  [FilterName.grayscale]: undefined
  [FilterName.lighten]: undefined
  [FilterName.negative]: undefined
  [FilterName.saturation]: FilterSaturation
  [FilterName.sobel]: undefined
  [FilterName.vintage]: undefined
}

export enum FilterAttribute {
  filterName = 'filterName',
  options = 'options',
}

export type Filter = {
  [FilterAttribute.filterName]: FilterName
  [FilterAttribute.options]: FilterBrightness | FilterContrast | FilterFadeIn | FilterSaturation | undefined
}

export enum FilterMethod {
  setFilter = 'setFilter',
}
