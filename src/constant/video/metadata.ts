export enum ApiVideoMetadataKey {
  bitrate = 'bitrate',
  codec = 'codec',
  duration = 'duration',
  fps = 'fps',
  height = 'height',
  samplerate = 'samplerate',
  size = 'size',
  width = 'width',
}

export type ApiVideoMetadata = {
  [ApiVideoMetadataKey.bitrate]: number
  [ApiVideoMetadataKey.codec]: string
  [ApiVideoMetadataKey.duration]: number
  [ApiVideoMetadataKey.fps]: number
  [ApiVideoMetadataKey.height]: number
  [ApiVideoMetadataKey.size]: number
  [ApiVideoMetadataKey.width]: number
}

export type ApiAudioMetadata = {
  [ApiVideoMetadataKey.bitrate]: number
  [ApiVideoMetadataKey.codec]: string
  [ApiVideoMetadataKey.duration]: number
  [ApiVideoMetadataKey.samplerate]: number
  [ApiVideoMetadataKey.size]: number
}

export type ApiImageMetadata = {
  [ApiVideoMetadataKey.codec]: string
  [ApiVideoMetadataKey.height]: string
  [ApiVideoMetadataKey.size]: string
  [ApiVideoMetadataKey.width]: string
}

export enum ApiVideoMetadataFormDataKey {
  type = 'type',
}

export enum ApiVideoMetadataType {
  audio = 'audio',
  image = 'image',
  video = 'video',
}

export type ApiMetadataTypes = ApiAudioMetadata | ApiImageMetadata | ApiVideoMetadata
