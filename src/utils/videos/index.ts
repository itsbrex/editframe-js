import {
  ApiVideo,
  ApiVideoAttribute,
  ApiVideoMetadata,
  ApiVideoMetadataAttribute,
  CompositionFile,
  EncodeResponse,
  EncodeResponseAttribute,
} from 'constant'
import { urlOrFile } from 'utils/forms'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isEncodeResponse = (encodeResponse: any): encodeResponse is EncodeResponse =>
  EncodeResponseAttribute.id in encodeResponse &&
  EncodeResponseAttribute.status in encodeResponse &&
  EncodeResponseAttribute.timestamp in encodeResponse

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isApiVideo = (video: any): video is ApiVideo =>
  ApiVideoAttribute.isReady in video && ApiVideoAttribute.metadata in video && ApiVideoAttribute.timestamp in video

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isApiVideos = (videos: any): videos is ApiVideo[] => isApiVideo(videos[0])

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isApiVideoMetadata = (metadata: any): metadata is ApiVideoMetadata =>
  ApiVideoMetadataAttribute.bitrate in metadata &&
  ApiVideoMetadataAttribute.codec in metadata &&
  ApiVideoMetadataAttribute.duration in metadata &&
  ApiVideoMetadataAttribute.fps in metadata &&
  ApiVideoMetadataAttribute.height in metadata &&
  ApiVideoMetadataAttribute.size in metadata &&
  ApiVideoMetadataAttribute.width in metadata

export const formDataKey = (file: CompositionFile, id: string): string => `${urlOrFile(file)}${id}`
