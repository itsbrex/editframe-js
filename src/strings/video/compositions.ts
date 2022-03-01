export const CompositionErrorText = {
  dimensionsRequired: '`dimensions` must be provided',
  durationRequired: '`duration` must be provided',
  errorEncoding: (error: string): string => `Error encoding video: ${error}`,
  malformedEncodingResponse: 'malformed `encoding` response',
  textRequired: '`text` field required',
  validationOptionsError: (errors: string): string => `Error: ${errors}`,
}
