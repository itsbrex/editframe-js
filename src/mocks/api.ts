import { ApiAudioMetadata, ApiInterface, ApiOptions, ApiVideoMetadata, ApiVideoMetadataKey } from 'constant'

export const defaultMockApiOptions = {
  clientId: 'client-id',
  fetch: (): Promise<void> => Promise.resolve(),
  host: 'https://api.editframe.com',
  token: 'token',
  version: 2,
}

export const mockApi = (
  {
    get = () => {},
    options = defaultMockApiOptions,
    post = () => {},
    put = () => {},
  }: { get?: any; options?: ApiOptions; post?: any; put?: any } = {
    get: () => {},
    options: defaultMockApiOptions,
    post: () => {},
    put: () => {},
  }
): ApiInterface => ({
  get,
  options,
  post,
  put,
})

const MockApiAudioMetadataValue = {
  [ApiVideoMetadataKey.bitrate]: 1_500,
  [ApiVideoMetadataKey.codec]: 'flac',
  [ApiVideoMetadataKey.duration]: 5,
  [ApiVideoMetadataKey.samplerate]: 48_100,
  [ApiVideoMetadataKey.size]: 20_000,
}

export const mockApiAudioMetadata = ({
  bitrate = MockApiAudioMetadataValue.bitrate,
  codec = MockApiAudioMetadataValue.codec,
  duration = MockApiAudioMetadataValue.duration,
  samplerate = MockApiAudioMetadataValue.samplerate,
  size = MockApiAudioMetadataValue.size,
}: Partial<ApiAudioMetadata> = MockApiAudioMetadataValue): ApiAudioMetadata => ({
  bitrate,
  codec,
  duration,
  samplerate,
  size,
})

const MockApiVideoMetadataValue = {
  [ApiVideoMetadataKey.bitrate]: 1500,
  [ApiVideoMetadataKey.codec]: 'flac',
  [ApiVideoMetadataKey.duration]: 10,
  [ApiVideoMetadataKey.fps]: 30,
  [ApiVideoMetadataKey.height]: 1080,
  [ApiVideoMetadataKey.size]: 20000,
  [ApiVideoMetadataKey.width]: 1920,
}

export const mockApiVideoMetadata = ({
  bitrate = MockApiVideoMetadataValue.bitrate,
  codec = MockApiVideoMetadataValue.codec,
  duration = MockApiVideoMetadataValue.duration,
  fps = MockApiVideoMetadataValue.fps,
  height = MockApiVideoMetadataValue.height,
  size = MockApiVideoMetadataValue.size,
  width = MockApiVideoMetadataValue.width,
}: Partial<ApiVideoMetadata> = MockApiVideoMetadataValue): ApiVideoMetadata => ({
  bitrate,
  codec,
  duration,
  fps,
  height,
  size,
  width,
})
