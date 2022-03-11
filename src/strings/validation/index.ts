import colors from 'colors/safe'
export const ValidationErrorText = {
  INVALID_URL: (url: string): string => `\\${colors.white(url)}\\ is not valid url`,
  MUST_BE_TYPE: (caller: string, fieldName: string, value: any, type: string): string =>
    `\n  \\${colors.white(fieldName)}\\ attribute in \\${colors.white(caller)}\\ must be of type \\${colors.white(
      type
    )}\\. Got: \\${colors.white(JSON.stringify(value))}\\`,
  OR: (types: string[]): string => types.join(' | '),
  REQUIRED_FIELD: (name: string): string => `\\${colors.white(name)}\\ field is required`,
  SUB_FIELD: (parent: string, child: string): string => `${parent}: { ${child} }`,
}
