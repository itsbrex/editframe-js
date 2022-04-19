export enum ApiVideoMetadataAttribute {
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
  [ApiVideoMetadataAttribute.bitrate]: number
  [ApiVideoMetadataAttribute.codec]: string
  [ApiVideoMetadataAttribute.duration]: number
  [ApiVideoMetadataAttribute.fps]: number
  [ApiVideoMetadataAttribute.height]: number
  [ApiVideoMetadataAttribute.size]: number
  [ApiVideoMetadataAttribute.width]: number
}

export type ApiAudioMetadata = {
  [ApiVideoMetadataAttribute.bitrate]: number
  [ApiVideoMetadataAttribute.codec]: string
  [ApiVideoMetadataAttribute.duration]: number
  [ApiVideoMetadataAttribute.samplerate]: number
  [ApiVideoMetadataAttribute.size]: number
}

export type ApiImageMetadata = {
  [ApiVideoMetadataAttribute.codec]: string
  [ApiVideoMetadataAttribute.height]: string
  [ApiVideoMetadataAttribute.size]: string
  [ApiVideoMetadataAttribute.width]: string
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
