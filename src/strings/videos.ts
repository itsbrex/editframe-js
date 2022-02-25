export const VideoErrorText = {
  aspectRatioDimensionsRequired: 'Either `aspectRatio` or `dimensions` must be provided',
  durationRequired: '`duration` must be provided',
  errorEncoding: (error: string): string => `Error encoding video: ${error}`,
  get: (message: string): string => `Error getting videos: ${message}`,
  malformedEncodingResponse: 'malformed `encoding` response',
  malformedResponse: 'malformed `videos` response',
  textRequired: '`text` field required',
}
