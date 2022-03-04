import {
  Filter,
  FilterAttribute,
  FilterBrightness,
  FilterContrast,
  FilterFadeIn,
  FilterName,
  FilterOptionKey,
  FilterOptionTypes,
  FilterSaturation,
} from 'constant'
import { ValidationErrorText } from 'strings'

const isFilterBrightness = (options: any): options is FilterBrightness =>
  options && Object.keys(options).length === 1 && FilterOptionKey.brightness in options

const isFilterContrast = (options: any): options is FilterContrast =>
  options && Object.keys(options).length === 1 && FilterOptionKey.contrast in options

const isFilterFadeIn = (options: any): options is FilterFadeIn =>
  options &&
  Object.keys(options).length === 2 &&
  FilterOptionKey.color in options &&
  FilterOptionKey.duration in options

const isFilterSaturation = (options: any): options is FilterSaturation =>
  options && Object.keys(options).length === 1 && FilterOptionKey.saturation in options

const filterValidators = {
  [FilterName.brightness]: isFilterBrightness,
  [FilterName.contrast]: isFilterContrast,
  [FilterName.fadeIn]: isFilterFadeIn,
  [FilterName.saturation]: isFilterSaturation,
}

export const validateFilter = (
  callerName: string,
  fieldName: string,
  { filterName, options }: Filter,
  shouldThrow = false
): string[] => {
  const errors = []

  const isFilterNameValid = Object.values(FilterName).includes(filterName)

  if (!isFilterNameValid) {
    const message = ValidationErrorText.MUST_BE_TYPE(
      callerName,
      ValidationErrorText.SUB_FIELD(fieldName, FilterAttribute.filterName),
      filterName,
      `${Object.values(FilterName).join(', ')}`
    )

    if (shouldThrow) {
      throw new TypeError(message)
    } else {
      errors.push(message)
    }
  }

  if (isFilterNameValid && filterName in FilterOptionTypes && !filterValidators[filterName](options)) {
    const message = ValidationErrorText.MUST_BE_TYPE(
      callerName,
      ValidationErrorText.SUB_FIELD(fieldName, FilterAttribute.options),
      options,
      JSON.stringify(FilterOptionTypes[filterName])
    )

    if (shouldThrow) {
      throw new TypeError(message)
    } else {
      errors.push(message)
    }
  }

  return errors
}
