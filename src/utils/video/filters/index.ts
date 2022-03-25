import {
  Filter,
  FilterAttribute,
  FilterBrightness,
  FilterContrast,
  FilterFade,
  FilterName,
  FilterOptionKey,
  FilterOptionTypes,
  FilterSaturation,
  PrimitiveType,
} from 'constant'
import { ValidationErrorText } from 'strings'
import { assertType } from 'utils/validation'

export const isFilterBrightness = (options: Record<string, any>): options is FilterBrightness =>
  options &&
  Object.keys(options).length === 1 &&
  FilterOptionKey.brightness in options &&
  assertType(options[FilterOptionKey.brightness], PrimitiveType.number)

export const isFilterContrast = (options: Record<string, any>): options is FilterContrast =>
  options &&
  Object.keys(options).length === 1 &&
  FilterOptionKey.contrast in options &&
  assertType(options[FilterOptionKey.contrast], PrimitiveType.number)

export const isFilterFade = (options: Record<string, any>): options is FilterFade =>
  options &&
  [1, 2, 3].includes(Object.keys(options).length) &&
  FilterOptionKey.color in options &&
  FilterOptionKey.duration in options &&
  FilterOptionKey.startTime in options &&
  assertType(options[FilterOptionKey.color], [PrimitiveType.string, PrimitiveType.undefined]) &&
  assertType(options[FilterOptionKey.duration], PrimitiveType.number) &&
  assertType(options[FilterOptionKey.startTime], [PrimitiveType.number, PrimitiveType.undefined])

export const isFilterSaturation = (options: Record<string, any>): options is FilterSaturation =>
  options &&
  Object.keys(options).length === 1 &&
  FilterOptionKey.saturation in options &&
  assertType(options[FilterOptionKey.saturation], PrimitiveType.number)

const filterValidators = {
  [FilterName.brightness]: isFilterBrightness,
  [FilterName.contrast]: isFilterContrast,
  [FilterName.fadeIn]: isFilterFade,
  [FilterName.fadeOut]: isFilterFade,
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
