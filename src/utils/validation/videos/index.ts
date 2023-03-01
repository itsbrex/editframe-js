import {
  ApiAudioMetadata,
  ApiImageMetadata,
  ApiVideo,
  ApiVideoKey,
  ApiVideoMetadata,
  ApiVideoMetadataKey,
  ApiVideoMethod,
  CompositionFile,
  CompositionKey,
  DimensionsKey,
  EncodeResponse,
  EncodeResponseKey,
  Paginated,
  PrimitiveType,
  VideoOptions,
} from 'constant'
import { ValidationErrorText } from 'strings'
import { urlOrFile } from 'utils/forms'
import { assertType, validateColor, validateValueIsOfType } from 'utils/validation'
import { isPaginated } from 'utils/validation/pagination'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isEncodeResponse = (encodeResponse: any): encodeResponse is EncodeResponse =>
  EncodeResponseKey.id in encodeResponse &&
  assertType(encodeResponse[EncodeResponseKey.id], PrimitiveType.string) &&
  EncodeResponseKey.status in encodeResponse &&
  assertType(encodeResponse[EncodeResponseKey.status], PrimitiveType.string) &&
  EncodeResponseKey.timestamp in encodeResponse &&
  assertType(encodeResponse[EncodeResponseKey.timestamp], PrimitiveType.number)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isApiVideo = (video: any): video is ApiVideo =>
  ApiVideoKey.id in video &&
  assertType(video.id, PrimitiveType.string) &&
  ApiVideoKey.isReady in video &&
  assertType(video.isReady, PrimitiveType.boolean) &&
  ApiVideoKey.isFailed in video &&
  assertType(video.isFailed, PrimitiveType.boolean)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isApiVideos = (paginatedVideos: Paginated<any>): paginatedVideos is Paginated<ApiVideo> =>
  isPaginated<ApiVideo>(paginatedVideos, isApiVideo)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isApiAudioMetadata = (metadata: any): metadata is ApiAudioMetadata =>
  ApiVideoMetadataKey.bitrate in metadata &&
  assertType(metadata.bitrate, PrimitiveType.number) &&
  ApiVideoMetadataKey.codec in metadata &&
  assertType(metadata.codec, PrimitiveType.string) &&
  ApiVideoMetadataKey.duration in metadata &&
  assertType(metadata.duration, PrimitiveType.number) &&
  ApiVideoMetadataKey.samplerate in metadata &&
  assertType(metadata.samplerate, PrimitiveType.number) &&
  ApiVideoMetadataKey.size in metadata &&
  assertType(metadata.size, PrimitiveType.number)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isApiImageMetadata = (metadata: any): metadata is ApiImageMetadata =>
  ApiVideoMetadataKey.codec in metadata &&
  assertType(metadata.codec, PrimitiveType.string) &&
  ApiVideoMetadataKey.height in metadata &&
  assertType(metadata.height, PrimitiveType.number) &&
  ApiVideoMetadataKey.size in metadata &&
  assertType(metadata.size, PrimitiveType.number) &&
  ApiVideoMetadataKey.width in metadata &&
  assertType(metadata.width, PrimitiveType.number)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isApiVideoMetadata = (metadata: any): metadata is ApiVideoMetadata =>
  ApiVideoMetadataKey.bitrate in metadata &&
  assertType(metadata.bitrate, PrimitiveType.number) &&
  ApiVideoMetadataKey.codec in metadata &&
  assertType(metadata.codec, PrimitiveType.string) &&
  ApiVideoMetadataKey.duration in metadata &&
  assertType(metadata.duration, PrimitiveType.number) &&
  ApiVideoMetadataKey.fps in metadata &&
  assertType(metadata.fps, PrimitiveType.number) &&
  ApiVideoMetadataKey.height in metadata &&
  assertType(metadata.height, PrimitiveType.number) &&
  ApiVideoMetadataKey.size in metadata &&
  assertType(metadata.size, PrimitiveType.number) &&
  ApiVideoMetadataKey.width in metadata &&
  assertType(metadata.width, PrimitiveType.number)

export const formDataKey = (file: CompositionFile, id: string): string => `${urlOrFile(file)}${id}`

export const validateNewVideo = ({ backgroundColor, dimensions, duration, fps, metadata }: VideoOptions): void => {
  if (backgroundColor) {
    validateColor(ApiVideoMethod.new, CompositionKey.backgroundColor, backgroundColor, true)
  }
  if (fps) {
    validateValueIsOfType(ApiVideoMethod.new, CompositionKey.fps, duration, PrimitiveType.number, true)
  }
  validateValueIsOfType(
    ApiVideoMethod.new,
    ValidationErrorText.SUB_FIELD(CompositionKey.dimensions, DimensionsKey.height),
    dimensions.height,
    PrimitiveType.number,
    true
  )
  validateValueIsOfType(
    ApiVideoMethod.new,
    ValidationErrorText.SUB_FIELD(CompositionKey.dimensions, DimensionsKey.width),
    dimensions.width,
    PrimitiveType.number,
    true
  )
  validateValueIsOfType(ApiVideoMethod.new, CompositionKey.duration, duration, PrimitiveType.number, true)
  validateValueIsOfType(ApiVideoMethod.new, CompositionKey.metadata, metadata, PrimitiveType.object, true)
}
