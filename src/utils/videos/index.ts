import {
  ApiAudioMetadata,
  ApiImageMetadata,
  ApiVideo,
  ApiVideoAttribute,
  ApiVideoMetadata,
  ApiVideoMetadataAttribute,
  ApiVideoMethod,
  CompositionFile,
  CompositionOptionAttribute,
  EncodeResponse,
  EncodeResponseAttribute,
  LayerAttribute,
  Paginated,
  PrimitiveType,
  VideoOptions,
} from 'constant'
import { ValidationErrorText } from 'strings'
import { urlOrFile } from 'utils/forms'
import { isPaginated } from 'utils/pagination'
import { assertType, validateValueIsOfType } from 'utils/validation'

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
export const isApiAudioMetadata = (metadata: any): metadata is ApiAudioMetadata =>
  ApiVideoMetadataAttribute.bitrate in metadata &&
  assertType(metadata.bitrate, PrimitiveType.number) &&
  ApiVideoMetadataAttribute.codec in metadata &&
  assertType(metadata.codec, PrimitiveType.string) &&
  ApiVideoMetadataAttribute.duration in metadata &&
  assertType(metadata.duration, PrimitiveType.number) &&
  ApiVideoMetadataAttribute.samplerate in metadata &&
  assertType(metadata.samplerate, PrimitiveType.number) &&
  ApiVideoMetadataAttribute.size in metadata &&
  assertType(metadata.size, PrimitiveType.number)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isApiImageMetadata = (metadata: any): metadata is ApiImageMetadata =>
  ApiVideoMetadataAttribute.codec in metadata &&
  assertType(metadata.codec, PrimitiveType.string) &&
  ApiVideoMetadataAttribute.height in metadata &&
  assertType(metadata.height, PrimitiveType.number) &&
  ApiVideoMetadataAttribute.size in metadata &&
  assertType(metadata.size, PrimitiveType.number) &&
  ApiVideoMetadataAttribute.width in metadata &&
  assertType(metadata.width, PrimitiveType.number)

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

export const validateNewVideo = ({ backgroundColor, dimensions, duration, metadata }: VideoOptions): void => {
  validateValueIsOfType(
    ApiVideoMethod.new,
    CompositionOptionAttribute.backgroundColor,
    backgroundColor,
    PrimitiveType.string,
    true
  )
  validateValueIsOfType(
    ApiVideoMethod.new,
    ValidationErrorText.SUB_FIELD(CompositionOptionAttribute.dimensions, LayerAttribute.height),
    dimensions.height,
    PrimitiveType.number,
    true
  )
  validateValueIsOfType(
    ApiVideoMethod.new,
    ValidationErrorText.SUB_FIELD(CompositionOptionAttribute.dimensions, LayerAttribute.width),
    dimensions.width,
    PrimitiveType.number,
    true
  )
  validateValueIsOfType(ApiVideoMethod.new, CompositionOptionAttribute.duration, duration, PrimitiveType.number, true)
  validateValueIsOfType(ApiVideoMethod.new, CompositionOptionAttribute.metadata, metadata, PrimitiveType.object, true)
}
