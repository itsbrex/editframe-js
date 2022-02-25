import FormData from 'form-data'

import { ApiInterface, Routes, Video, VideoOptions } from 'constant'
import { VideoErrorText } from 'strings'
import { generatePath, isVideo, isVideos } from 'utils'

import { VideoBuilder } from './videoBuilder'

export class Videos {
  private _api: ApiInterface

  constructor(api: ApiInterface) {
    this._api = api
  }

  public async all(): Promise<Video[]> {
    try {
      const videos = await this._api.get({ url: Routes.videos.all })

      if (videos && isVideos(videos)) {
        return videos
      }

      throw new Error(VideoErrorText.malformedResponse)
    } catch (error) {
      console.error(VideoErrorText.get(error.message))
    }

    return []
  }

  public async get(id: string): Promise<Video | undefined> {
    try {
      const video = await this._api.get({ url: generatePath(Routes.videos.get, { id }) })

      if (video && isVideo(video)) {
        return video
      }

      throw new Error(VideoErrorText.malformedResponse)
    } catch (error) {
      console.error(VideoErrorText.get(error.message))
    }

    return undefined
  }

  public build(options: VideoOptions): VideoBuilder {
    return new VideoBuilder({ api: this._api, formData: new FormData(), options })
  }
}
