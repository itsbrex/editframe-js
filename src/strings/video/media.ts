import chalk from 'chalk'

export const MediaErrorText = {
  invalidFileSource: (callerName: string): string => `Invalid file source provided for \\${chalk.white(callerName)}\\`,
}
