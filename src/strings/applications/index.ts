export const ApplicationErrorText = {
  get: (message: string): string => `Error getting applications: ${message}`,
  malformedResponse: 'malformed `applications` response',
}
