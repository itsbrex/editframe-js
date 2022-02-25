import { Blob } from 'node:buffer'

import { ApiVideo, ApiVideoAttribute, EncodeResponse, EncodeResponseAttribute } from 'constant'
import { urlOrFile } from 'utils/forms'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isEncodeResponse = (encodeResponse: any): encodeResponse is EncodeResponse =>
  EncodeResponseAttribute.id in encodeResponse &&
  EncodeResponseAttribute.status in encodeResponse &&
  EncodeResponseAttribute.timestamp in encodeResponse

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isVideo = (video: any): video is ApiVideo =>
  ApiVideoAttribute.isReady in video && ApiVideoAttribute.metadata in video && ApiVideoAttribute.timestamp in video

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isVideos = (videos: any): videos is ApiVideo[] => isVideo(videos[0])

export const formDataKey = (file: string | Blob, id: string): string => `${urlOrFile(file)}${id}`
