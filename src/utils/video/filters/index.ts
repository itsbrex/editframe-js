import {
  Filter,
  FilterAttribute,
  FilterBrightness,
  FilterContrast,
  FilterFadeIn,
  FilterKey,
  FilterName,
  FilterSaturation,
} from 'constant'
import { ValidationErrorText } from 'strings'

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

export const validateFilter = (callerName: string, fieldName: string, { filterName, options }: Filter): void => {
  if (!Object.values(FilterName).includes(filterName)) {
    throw new Error(
      ValidationErrorText.MUST_BE_TYPE(
        callerName,
        ValidationErrorText.SUB_FIELD(fieldName, FilterAttribute.filterName),
        filterName,
        `${Object.values(FilterName).join(', ')}`
      )
    )
  }

  if (!filterValidators[filterName](options)) {
    throw new Error(
      ValidationErrorText.MUST_BE_TYPE(
        callerName,
        ValidationErrorText.SUB_FIELD(fieldName, FilterAttribute.options),
        options,
        JSON.stringify(options)
      )
    )
  }
}
