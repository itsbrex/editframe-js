export const ValidationErrorText = {
  MUST_BE_TYPE: (caller: string, fieldName: string, value: any, type: string): string =>
    `\`${fieldName}\` in \`${caller}\` must be of type \`${type}\`. Got: ${String(value)}`,
  REQUIRED_FIELD: (name: string): string => `\`${name}\` field is required`,
}
