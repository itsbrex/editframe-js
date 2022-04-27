import colors from 'colors/safe'

export const ValidationErrorText = {
  FILE_DOES_NOT_EXIST: (filepath: string): string => `\\${colors.white(filepath)}\\ is not a valid path`,
  INVALID_OPTIONS: (caller: string, expected_keys: string, actual_keys: string): string =>
    `\n  \\${colors.white('options')}\\ attribute in \\${colors.white(caller)}\\ should contain keys \\${colors.white(
      JSON.stringify(expected_keys)
    )}\\. Got: \\${colors.white(JSON.stringify(actual_keys))}\\`,
  INVALID_URL: (url: string): string => `\\${colors.white(url)}\\ is not valid url`,
  MUST_BE_TYPE: (caller: string, fieldName: string, value: any, type: string): string =>
    `\n  \\${colors.white(fieldName)}\\ attribute in \\${colors.white(caller)}\\ must be of type \\${colors.white(
      type
    )}\\. Got: \\${colors.white(JSON.stringify(value))}\\`,
  OR: (types: string[]): string => types.join(' | '),
  REQUIRED_FIELD: (name: string): string => `\\${colors.white(name)}\\ field is required`,
  SUB_FIELD: (parent: string, child: string): string => `${parent}: { ${child} }`,
}
