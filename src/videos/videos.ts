import { Video } from '../types/video'
import { ApiOptions, ApiFetchOptions } from '../api/types'
import Api from '../api/api'
import FetchError from '../api/Error'
import VideoBuilder from './builder'
import VideoClip from './clip'
import { VideoOptions } from '../types/video'
import { ClipRequestOptions } from 'types/clip'

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

  /**
  * Returns a new instance of an video clip which can be manipulated
  *
  * @example
  * 
  * ```
  * const newVideo = await videos.fromClip(fs.createReadStream('./files/video.mp4'))
  * ```
  */
  fromClip (source: Blob | string, options?: ClipRequestOptions): VideoClip {
    return new VideoClip(source, options, this._api)
  }
  
}

export default Videos