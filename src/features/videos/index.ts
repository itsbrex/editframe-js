import FormData from 'form-data'

import { ApiInterface, ApiVideo, CompositionOptions, Routes } from 'constant'
import { VideoErrorText } from 'strings'
import { generatePath, isVideo, isVideos, validateApiData } from 'utils'

import { Composition } from './composition'

export class Videos {
  private _api: ApiInterface

  constructor(api: ApiInterface) {
    this._api = api
  }

  public async all(): Promise<ApiVideo[]> {
    try {
      const data = await this._api.get({ url: Routes.videos.all })

      return validateApiData<ApiVideo[]>(data, {
        invalidDataError: VideoErrorText.malformedResponse,
        validate: isVideos,
      })
    } catch (error) {
      console.error(VideoErrorText.get(error.message))
    }

    return []
  }

  public async get(id: string): Promise<ApiVideo | undefined> {
    try {
      const data = await this._api.get({ url: generatePath(Routes.videos.get, { id }) })

      return validateApiData<ApiVideo>(data, {
        invalidDataError: VideoErrorText.malformedResponse,
        validate: isVideo,
      })
    } catch (error) {
      console.error(VideoErrorText.get(error.message))
    }

    return undefined
  }

  public new(options: CompositionOptions): Composition {
    return new Composition({ api: this._api, formData: new FormData(), options })
  }
}
