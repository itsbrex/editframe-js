import colors from 'colors/safe'
export const ValidationErrorText = {
  MUST_BE_TYPE: (caller: string, fieldName: string, value: any, type: string): string =>
    `\n  \\${colors.white(fieldName)}\\ attribute in \\${colors.white(caller)}\\ must be of type \\${colors.white(
      type
    )}\\. Got: \\${colors.white(JSON.stringify(value))}\\`,
  REQUIRED_FIELD: (name: string): string => `\\${name}\\ field is required`,
  SUB_FIELD: (parent: string, child: string): string => `${parent}: { ${child} }`,
}
