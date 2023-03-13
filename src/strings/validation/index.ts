import chalk from 'chalk'

export const ValidationErrorText = {
  FILE_DOES_NOT_EXIST: (filepath: string): string => `\\${chalk.white(filepath)}\\ is not a valid path`,
  INVALID_COLOR: (caller: string, fieldName: string, value: string): string =>
    `\\${chalk.white(fieldName)} attribute in \\${chalk.white(caller)}\\ is not a valid color. Got \\${chalk.white(
      value
    )}\\`,
  INVALID_OPTIONS: (caller: string, expected_keys: string, actual_keys: string): string =>
    `\n  \\${chalk.white('options')}\\ attribute in \\${chalk.white(caller)}\\ should contain keys \\${chalk.white(
      JSON.stringify(expected_keys)
    )}\\. Got: \\${chalk.white(JSON.stringify(actual_keys))}\\`,
  INVALID_URL: (url: string): string => `\\${chalk.white(url)}\\ is not valid url`,
  INVALID_VIDEO_EXTENSIONS: (caller: string, expected_keys: string, actual_keys: string): string =>
    `\n  \\${chalk.white(caller)}\\ attribute should contain one these keys \\${chalk.white(
      JSON.stringify(expected_keys)
    )}\\. Got: \\${chalk.white(JSON.stringify(actual_keys))}\\`,
  MUST_BE_TYPE: (caller: string, fieldName: string, value: any, type: string): string =>
    `\n  \\${chalk.white(fieldName)}\\ attribute in \\${chalk.white(caller)}\\ must be of type \\${chalk.white(
      type
    )}\\. Got: \\${chalk.white(JSON.stringify(value))}\\`,
  OR: (types: string[]): string => types.join(' | '),
  REQUIRED_FIELD: (name: string): string => `\\${chalk.white(name)}\\ field is required`,
  SUB_FIELD: (parent: string, child: string): string => `${parent}: { ${child} }`,
  TWO_TRANSITIONS_REQUIRED: (type: string, layerType: string): string =>
    `Only one transition of type \\${chalk.white(type)}\\ has been added to layer of type \\${chalk.white(
      layerType
    )}\\. There must be at least two transitions added in order to interpolate between the transition values`,
}
