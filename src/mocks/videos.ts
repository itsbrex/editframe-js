import { ApiVideo } from 'constant'

export const mockApiVideo = (
  {
    createdAt,
    downloadUrl,
    duration,
    id,
    isFailed,
    isReady,
    metadata,
    streamUrl,
    thumbnailUrl,
    timestamp,
    updatedAt,
  }: ApiVideo = {
    createdAt: 'createdAt',
    downloadUrl: 'download-url',
    duration: 100,
    id: 'id',
    isFailed: false,
    isReady: false,
    metadata: {},
    streamUrl: 'stream-url',
    thumbnailUrl: 'thumbnail-url',
    timestamp: 50,
    updatedAt: 'updated-at',
  }
): ApiVideo => ({
  createdAt,
  downloadUrl,
  duration,
  id,
  isFailed,
  isReady,
  metadata,
  streamUrl,
  thumbnailUrl,
  timestamp,
  updatedAt,
})
