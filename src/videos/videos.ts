import { Video } from '../types/video'
import { ApiOptions, ApiFetchOptions } from '../api/types'
import Api from '../api/api'
import FetchError from '../api/Error'
import VideoBuilder from './builder'
import { VideoOptions } from '../types/video'

class Videos {
  protected _api: Api
  
  /**
  * @ignore
  */
  constructor(options: ApiOptions) {
    this._api = new Api(options)
  }

  /**
  * Get all videos created for the authenticated application
  *
  * @example
  * 
  * ```
  * const videos = await videos.all()
  * ```
  * 
  */
  async all (options?: ApiFetchOptions): Promise<[Video] | FetchError> {
    const response = await this._api.get(`videos`, options || {})
    return response.data
  }

  /**
  * Get specific video for authenticated application
  *
  * @example
  * 
  * ```
  * const video = videos.get('yKOqd7QnJZ')
  * ```
  */
  async get (id: string, options?: ApiFetchOptions): Promise<Video | undefined> {
    const response = await this._api.get(`videos/${id}`, options || {})
    return response.data
  }

  /**
  * Returns a new instance of the Editframe video builder
  *
  * @example
  * 
  * ```
  * const newVideo = await videos.build({ aspectRatio: '1:1', backgroundColor: 'black', duration: 10, hd: false })
  * ```
  */
  build (options: VideoOptions): VideoBuilder {
    return new VideoBuilder(options, this._api)
  }
  
}

export default Videos