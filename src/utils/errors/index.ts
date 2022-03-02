import colors from 'colors/safe'

export const logError = (message: string): void => console.error(colors.yellow(message))
