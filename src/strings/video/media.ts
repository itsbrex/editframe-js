import colors from 'colors/safe'

export const MediaErrorText = {
  invalidFileSource: (callerName: string): string => `Invalid file source provided for \\${colors.white(callerName)}\\`,
}
