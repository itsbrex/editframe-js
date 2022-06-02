import chalk from 'chalk'

export const logError = (message: string): void => console.error(chalk.yellow(message))
