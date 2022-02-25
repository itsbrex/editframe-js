import FormData from 'form-data'

import { ApiInterface, ApiVideo, CompositionOptions, Routes } from 'constant'
import { VideoErrorText } from 'strings'
import { generatePath, isVideo, isVideos } from 'utils'

import { Composition } from './composition'

export class Videos {
  private _api: ApiInterface

  constructor(api: ApiInterface) {
    this._api = api
  }

  public async all(): Promise<ApiVideo[]> {
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

  public async get(id: string): Promise<ApiVideo | undefined> {
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

  public new(options: CompositionOptions): Composition {
    return new Composition({ api: this._api, formData: new FormData(), options })
  }
}
