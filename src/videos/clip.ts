import Api from 'api/api'
import FetchError from 'api/Error'
import { uuid } from 'shared/utils'
import { ClipRequestOptions, ClipEncodeConfig } from 'types/clip'
import { Size } from 'types/common'
import { VideoLayer } from 'types/video'
const FormData = require('form-data')

type EncodeResponse = {
  id: string
  status: string
  timestamp: number
}

class VideoClip {
  protected _api: Api
  protected _form: FormData
  protected _filters: Array<any>
  protected _id: any
  protected _layers: Array<VideoLayer> = []
  protected _resolution: Size
  protected _options: ClipRequestOptions
  protected _source: any
  protected _trim: { start: Number, end?: Number }
  protected _volume: Number

  /**
  * @ignore
  */
  constructor(source: Blob | string, options: ClipRequestOptions, api: Api){
    this._api = api
    this._filters = []
    this._form = new FormData()
    this._id = uuid()
    this._options = options || {}
    this._volume = 1.0
    this._configureSource(source)
  }

  protected _configureSource(source: Blob | string) {
    this._source = source
    if(typeof(source) == 'string'){
      this._form.append(`url${this._id}`, source)
    } else {
      this._form.append(`file${this._id}`, source)
    } 
  }

  /**
   * Set the resolution of the video clip
   *
   * @example
   * 
   * ```
   * const clip = videos.fromClip(fs.createReadStream('./files/video.mp4'))
   * clip.setResolution('1080x1080')
   * clip.resize('1080x1080')
   * ```
   */
  setResolution (value: String): VideoClip {
    let values = value.split('x')
    if((values.length < 2)) throw 'Invalid video resolution'
    this._resolution = { width: parseInt(values[0]), height: parseInt(values[1]) }
    return this
  }
  resize (value: String) { this.setResolution(value) }

  /**
   * Set the volume of the video clip
   *
   * @example
   * 
   * ```
   * const clip = videos.fromClip(fs.createReadStream('./files/video.mp4'))
   * clip.setVolume(.9)
   * clip.volume(.5)
   * clip.mute()
   * ```
   */
  setVolume (value: Number): VideoClip {
    this._volume = value
    if(value > 1) this._volume = 1
    if(value < 1) this._volume = 0
    return this
  }
  mute () { this.setVolume(0) }
  volume (value: Number) { this.setVolume (value) }

  /**
   * Trim the video clip
   *
   * @example
   * 
   * ```
   * const clip = videos.fromClip(fs.createReadStream('./files/video.mp4'))
   * clip.trim(0, 60)
   * ```
   */
   trim (start: Number, end? : Number): VideoClip {
    this._trim = { start, end }
    if(this._trim['start'] < 0) this._trim['start'] = 0
    if(this._trim['end'] && this._trim['end'] < 0) delete this._trim['end']
    return this
  }

  /**
   * Add a filter to the video clip
   *
   * @example
   * 
   * ```
   * const clip = videos.fromClip(fs.createReadStream('./files/video.mp4'))
   * clip.filter('fadein', { duration: 3, color: 'black' })
   * ```
   */
  filter (name: string, options: object): VideoClip {
    this._filters.push({ name, options: options || {} })
    return this
  } 

  /**
  * Send your video clip to the API to be encoded
  *
  * @example
  * 
  * ```
  * const clip = videos.fromClip(fs.createReadStream('./files/video.mp4'))
  * const response = await clip.encode()
  * ```
  * 
  */
  async encode (): Promise<EncodeResponse | FetchError> {
    let config = this.generateConfig()
    this._form.append('config', JSON.stringify(config))
    try {
      const response = await this._api.post(`videos/clip`, { body: this._form }, true)
      return response
    } catch (error) {
      throw(error.message)
    }
  }

  protected generateConfig () : ClipEncodeConfig { 
    let clip = { id: this._id, filters: this._filters }
    let options = {  ...this._options }
    if(this._trim) clip['trim'] = this._trim
    if(this._resolution) clip['resolution'] = this._resolution
    clip['volume'] = this._volume
    const config : ClipEncodeConfig = { ...options, layers: this._layers, clip  }
    return config 
  }
}

export default VideoClip
