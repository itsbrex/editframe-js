export const exitProcess = (): void => {
  if (process.env.NODE_ENV !== 'test') {
    process.exit(1)
  }
}
