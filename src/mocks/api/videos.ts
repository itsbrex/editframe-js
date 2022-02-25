import { ApiVideo } from 'constant'

export const mockVideo = (): ApiVideo => ({
  createdAt: 'createdAt',
  downloadUrl: 'download-url',
  duration: 100,
  id: 'id',
  isReady: false,
  metadata: {},
  streamUrl: 'stream-url',
  thumbnailUrl: 'thumbnail-url',
  timestamp: 50,
  updatedAt: 'updated-at',
})
