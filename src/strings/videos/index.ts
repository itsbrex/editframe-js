export const VideoErrorText = {
  all: (message: string): string => `Error getting videos: ${message}`,
  get: (message: string): string => `Error getting video: ${message}`,
  malformedResponse: 'malformed `videos` response',
  new: (message: string): string => `Error creating new video: ${message}`,
}
