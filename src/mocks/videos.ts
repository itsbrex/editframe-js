import { ApiVideo, ApiVideoMetadata } from 'constant'

export const mockApiVideo = (
  {
    createdAt,
    downloadUrl,
    duration,
    id,
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
  isReady,
  metadata,
  streamUrl,
  thumbnailUrl,
  timestamp,
  updatedAt,
})

export const mockApiVideoMetadata = (
  { bitrate, codec, duration, fps, height, size, width }: ApiVideoMetadata = {
    bitrate: 48100,
    codec: 'codec',
    duration: 1000,
    fps: 30,
    height: 1080,
    size: 9001,
    width: 1920,
  }
): ApiVideoMetadata => ({
  bitrate,
  codec,
  duration,
  fps,
  height,
  size,
  width,
})
