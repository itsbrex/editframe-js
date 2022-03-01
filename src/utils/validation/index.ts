import { CompositionFile, PrimitiveType } from 'constant'
import { ValidationErrorText } from 'strings'

export const validatePresenceOf = (
  value: string | number | CompositionFile | undefined,
  errorMessage: string
): void => {
  if (!value) {
    throw new Error(errorMessage)
  }
}

export const validateValueIsOfType = (
  caller: string,
  fieldName: string,
  value: number | string | undefined,
  type: PrimitiveType
): void => {
  if (value && typeof value !== type) {
    throw new Error(ValidationErrorText.MUST_BE_TYPE(caller, fieldName, value, type))
  }
}
