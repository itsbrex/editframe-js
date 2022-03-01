import { FilterBrightness, FilterContrast, FilterFadeIn, FilterKey, FilterName, FilterSaturation } from 'constant'
import { FilterErrorText } from 'strings'

const isFilterBrightness = (options: any): options is FilterBrightness =>
  options && Object.keys(options).length === 1 && FilterKey.brightness in options

const isFilterContrast = (options: any): options is FilterContrast =>
  options && Object.keys(options).length === 1 && FilterKey.contrast in options

const isFilterFadeIn = (options: any): options is FilterFadeIn =>
  options && Object.keys(options).length === 2 && FilterKey.color in options && FilterKey.duration in options

const isFilterSaturation = (options: any): options is FilterSaturation =>
  options && Object.keys(options).length === 1 && FilterKey.saturation in options

const filterValidators = {
  [FilterName.brightness]: isFilterBrightness,
  [FilterName.contrast]: isFilterContrast,
  [FilterName.fadeIn]: isFilterFadeIn,
  [FilterName.saturation]: isFilterSaturation,
}

export const validateFilter = (
  name: FilterName,
  options: FilterBrightness | FilterContrast | FilterFadeIn | FilterSaturation
): void => {
  if (!Object.values(FilterName).includes(name)) {
    throw new Error(FilterErrorText.invalidFilterName(name))
  }

  if (!filterValidators[name](options)) {
    throw new Error(FilterErrorText.invalidFilterOptions(name, JSON.stringify(options)))
  }
}
