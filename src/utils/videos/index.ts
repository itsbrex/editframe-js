import {
  ApiVideo,
  ApiVideoAttribute,
  ApiVideoMetadata,
  ApiVideoMetadataAttribute,
  CompositionFile,
  EncodeResponse,
  EncodeResponseAttribute,
  Paginated,
  PrimitiveType,
} from 'constant'
import { urlOrFile } from 'utils/forms'
import { isPaginated } from 'utils/pagination'
import { assertType } from 'utils/validation'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isEncodeResponse = (encodeResponse: any): encodeResponse is EncodeResponse =>
  EncodeResponseAttribute.id in encodeResponse &&
  assertType(encodeResponse[EncodeResponseAttribute.id], PrimitiveType.string) &&
  EncodeResponseAttribute.status in encodeResponse &&
  assertType(encodeResponse[EncodeResponseAttribute.status], PrimitiveType.string) &&
  EncodeResponseAttribute.timestamp in encodeResponse &&
  assertType(encodeResponse[EncodeResponseAttribute.timestamp], PrimitiveType.number)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isApiVideo = (video: any): video is ApiVideo =>
  ApiVideoAttribute.id in video &&
  assertType(video.id, PrimitiveType.string) &&
  ApiVideoAttribute.isReady in video &&
  assertType(video.isReady, PrimitiveType.boolean) &&
  ApiVideoAttribute.isFailed in video &&
  assertType(video.isFailed, PrimitiveType.boolean)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isApiVideos = (paginatedVideos: Paginated<any>): paginatedVideos is Paginated<ApiVideo> =>
  isPaginated<ApiVideo>(paginatedVideos, isApiVideo)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isApiVideoMetadata = (metadata: any): metadata is ApiVideoMetadata =>
  ApiVideoMetadataAttribute.bitrate in metadata &&
  assertType(metadata.bitrate, PrimitiveType.number) &&
  ApiVideoMetadataAttribute.codec in metadata &&
  assertType(metadata.codec, PrimitiveType.string) &&
  ApiVideoMetadataAttribute.duration in metadata &&
  assertType(metadata.duration, PrimitiveType.number) &&
  ApiVideoMetadataAttribute.fps in metadata &&
  assertType(metadata.fps, PrimitiveType.number) &&
  ApiVideoMetadataAttribute.height in metadata &&
  assertType(metadata.height, PrimitiveType.number) &&
  ApiVideoMetadataAttribute.size in metadata &&
  assertType(metadata.size, PrimitiveType.number) &&
  ApiVideoMetadataAttribute.width in metadata &&
  assertType(metadata.width, PrimitiveType.number)

export const formDataKey = (file: CompositionFile, id: string): string => `${urlOrFile(file)}${id}`
