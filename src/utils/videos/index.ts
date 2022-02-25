import { Blob } from 'node:buffer'

import { EncodeResponse, EncodeResponseAttribute, Video, VideoAttribute } from 'constant'
import { urlOrFile } from 'utils/forms'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isEncodeResponse = (encodeResponse: any): encodeResponse is EncodeResponse =>
  EncodeResponseAttribute.id in encodeResponse &&
  EncodeResponseAttribute.status in encodeResponse &&
  EncodeResponseAttribute.timestamp in encodeResponse

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isVideo = (video: any): video is Video =>
  VideoAttribute.isReady in video && VideoAttribute.metadata in video && VideoAttribute.timestamp in video

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isVideos = (videos: any): videos is Video[] => isVideo(videos[0])

export const formDataKey = (file: string | Blob, id: string): string => `${urlOrFile(file)}${id}`
