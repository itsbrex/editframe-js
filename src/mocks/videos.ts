import { ApiVideo } from 'constant'

export const mockApiVideo = (
  { downloadUrl, duration, id, isFailed, isReady, metadata, streamUrl, thumbnailUrl, timestamp }: ApiVideo = {
    downloadUrl: 'download-url',
    duration: 100,
    id: 'id',
    isFailed: false,
    isReady: false,
    metadata: {},
    streamUrl: 'stream-url',
    thumbnailUrl: 'thumbnail-url',
    timestamp: 50,
  }
): ApiVideo => ({
  downloadUrl,
  duration,
  id,
  isFailed,
  isReady,
  metadata,
  streamUrl,
  thumbnailUrl,
  timestamp,
})
