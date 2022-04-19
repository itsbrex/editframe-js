import { ApiAudioMetadata, ApiInterface, ApiVideoMetadata, ApiVideoMetadataAttribute } from 'constant'

export const mockApi = (
  { get = () => {}, post = () => {}, put = () => {} }: { get?: any; post?: any; put?: any } = {
    get: () => {},
    post: () => {},
    put: () => {},
  }
): ApiInterface => ({
  get,
  post,
  put,
})

const MockApiAudioMetadataAttribute = {
  [ApiVideoMetadataAttribute.bitrate]: 1_500,
  [ApiVideoMetadataAttribute.codec]: 'flac',
  [ApiVideoMetadataAttribute.duration]: 5,
  [ApiVideoMetadataAttribute.samplerate]: 48_100,
  [ApiVideoMetadataAttribute.size]: 20_000,
}

export const mockApiAudioMetadata = (
  {
    bitrate = MockApiAudioMetadataAttribute.bitrate,
    codec = MockApiAudioMetadataAttribute.codec,
    duration = MockApiAudioMetadataAttribute.duration,
    samplerate = MockApiAudioMetadataAttribute.samplerate,
    size = MockApiAudioMetadataAttribute.size,
  }: Partial<ApiAudioMetadata> = {
    bitrate: MockApiAudioMetadataAttribute.bitrate,
    codec: MockApiAudioMetadataAttribute.codec,
    duration: MockApiAudioMetadataAttribute.duration,
    samplerate: MockApiAudioMetadataAttribute.samplerate,
    size: MockApiAudioMetadataAttribute.size,
  }
): ApiAudioMetadata => ({
  bitrate,
  codec,
  duration,
  samplerate,
  size,
})

const MockApiVideoMetadataAttribute = {
  [ApiVideoMetadataAttribute.bitrate]: 1500,
  [ApiVideoMetadataAttribute.codec]: 'flac',
  [ApiVideoMetadataAttribute.duration]: 10,
  [ApiVideoMetadataAttribute.fps]: 30,
  [ApiVideoMetadataAttribute.height]: 1080,
  [ApiVideoMetadataAttribute.size]: 20000,
  [ApiVideoMetadataAttribute.width]: 1920,
}

export const mockApiVideoMetadata = (
  {
    bitrate = MockApiVideoMetadataAttribute.bitrate,
    codec = MockApiVideoMetadataAttribute.codec,
    duration = MockApiVideoMetadataAttribute.duration,
    fps = MockApiVideoMetadataAttribute.fps,
    height = MockApiVideoMetadataAttribute.height,
    size = MockApiVideoMetadataAttribute.size,
    width = MockApiVideoMetadataAttribute.width,
  }: Partial<ApiVideoMetadata> = {
    bitrate: MockApiVideoMetadataAttribute.bitrate,
    codec: MockApiVideoMetadataAttribute.codec,
    duration: MockApiVideoMetadataAttribute.duration,
    fps: MockApiVideoMetadataAttribute.fps,
    height: MockApiVideoMetadataAttribute.height,
    size: MockApiVideoMetadataAttribute.size,
    width: MockApiVideoMetadataAttribute.width,
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
