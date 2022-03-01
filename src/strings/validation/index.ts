export const ValidationErrorText = {
  MUST_BE_TYPE: (fieldName: string, value: any, type: string): string =>
    `\`${fieldName}\` must be of type ${type}. Got: ${String(value)}`,
  REQUIRED_FIELD: (name: string): string => `\`${name}\` field is required`,
}
