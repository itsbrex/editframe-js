import { CompositionFile, PrimitiveType } from 'constant'
import { ValidationErrorText } from 'strings'

export const validatePresenceOf = ({
  errorMessage,
  value,
}: {
  errorMessage: string
  value?: string | number | CompositionFile
}): string | undefined => {
  if (!value) {
    return errorMessage || errorMessage
  }

  return undefined
}

export const validateValueIsOfType = (
  fieldName: string,
  value: number | string | undefined,
  type: PrimitiveType
): void => {
  if (typeof value !== type) {
    throw new Error(ValidationErrorText.MUST_BE_TYPE(fieldName, value, type))
  }
}
