import {
  FilterBrightness,
  FilterContrast,
  FilterKey,
  FilterLayer,
  FilterName,
  FilterOptionKey,
  FilterOptionTypes,
  FilterSaturation,
  LayerKey,
  LayerValidator,
  PrimitiveType,
} from 'constant'
import { ValidationErrorText } from 'strings'
import { assertType, filterUndefined, validateLayer } from 'utils/validation'

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

export const isFilterSaturation = (options: Record<string, any>): options is FilterSaturation =>
  options &&
  Object.keys(options).length === 1 &&
  FilterOptionKey.saturation in options &&
  assertType(options[FilterOptionKey.saturation], PrimitiveType.number)

const filterValidators = {
  [FilterName.brightness]: isFilterBrightness,
  [FilterName.contrast]: isFilterContrast,
  [FilterName.saturation]: isFilterSaturation,
}

export const validateFilter: LayerValidator<FilterLayer> = ({
  callerName,
  layer: {
    filter: { name, options },
  },
}): string[] => {
  const errors = []

  const isFilterNameValid = Object.values(FilterName).includes(name)

  if (!isFilterNameValid) {
    const message = ValidationErrorText.MUST_BE_TYPE(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.filter, FilterKey.name),
      name,
      `${Object.values(FilterName).join(', ')}`
    )

    errors.push(message)
  }

  if (isFilterNameValid && name in FilterOptionTypes && !filterValidators[name](options)) {
    const message = ValidationErrorText.MUST_BE_TYPE(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.filter, FilterKey.options),
      options,
      JSON.stringify(FilterOptionTypes[name])
    )

    errors.push(message)
  }

  return errors.filter(filterUndefined)
}

export const validateFilterLayer = (callerName: string, layer: FilterLayer): void =>
  validateLayer<FilterLayer>([validateFilter], callerName, layer)
