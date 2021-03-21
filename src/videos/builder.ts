import Api from 'api/api'
import FetchError from 'api/Error'
import { sizeForApsectRatio, uuid } from '../shared/utils'
import { AudioLayer, ComposableLayer, ImageLayer, VideoLayer, WaveformLayer, Layer, VideoOptions } from '../types/video'
const FormData = require('form-data')

type EncodeConfig = VideoOptions & {
  dimensions: { height: number, width: number }
  layers: Array<VideoLayer>
}

type EncodeResponse = {
  id: string
  status: string
  timestamp: number
}

class VideoBuilder {
  protected _api: Api
  protected _form : FormData
  protected _layers : Array<VideoLayer> = []
  protected _options : any

  /**
  * @ignore
  */
  constructor(options: VideoOptions, api: Api){
    this._api = api
    this._form = new FormData()
    this._options = options || {}
  }

  /**
   * Returns all layers currently added to the video composition
   */
  get layers () : Array<VideoLayer> {
    return this._layers
  }

  protected addLayer (options: ComposableLayer) : Layer {
    let newLayer : Layer = { id: uuid(), ...options }
    this._layers.push(newLayer)
    return newLayer
  }

  /**
   * Add an audio layer to your video composition
   *
   * @example
   * 
   * ```
   * const newVideo = await videos.build({ aspectRatio: '1:1', backgroundColor: 'black', duration: 10, hd: false })
   * newVideo.addAudio(fs.createReadStream('./files/audio.mp3'))
   * ```
   */
  addAudio (file: Blob | string, options: AudioLayer = {}) : Layer {
    const layer = this.addLayer({ type: 'audio', ...options })
    // if(file instanceof String){
    //   this._form.append(`url${layer.id}`, file)
    // } else {
    //   this._form.append(`file${layer.id}`, file)
    // } 
    this._form.append(`file${layer.id}`, file)
    return layer
  }

  /**
   * Add an image layer to your video composition
   *
   * @example
   * 
   * ```
   * const newVideo = await videos.build({ aspectRatio: '1:1', backgroundColor: 'black', duration: 10, hd: false })
   * newVideo.addImage(fs.createReadStream('./files/image.png'), { format: 'fit' })
   * ```
   */
  addImage (file: Blob | string, options: ImageLayer) : Layer {
    const layer = this.addLayer({ type: 'image', ...options })
    // if(file instanceof String){
    //   this._form.append(`url${layer.id}`, file)
    // } else {
    //   this._form.append(`file${layer.id}`, file)
    // } 
    this._form.append(`file${layer.id}`, file)
    return layer
  }

  /**
   * Add a video layer to your video composition
   *
   * @example
   * 
   * ```
   * const newVideo = await videos.build({ aspectRatio: '1:1', backgroundColor: 'black', duration: 10, hd: false })
   * newVideo.addVideo(fs.createReadStream('./files/video.mp4'), { format: 'fit' })
   * ```
   */
  addVideo (file: Blob, options: VideoLayer) : Layer {
    const layer = this.addLayer({ type: 'video', ...options })
    this._form.append(`file${layer.id}`, file)
    return layer
  }

  /**
   * Add a waveform layer to your video composition
   *
   * @example
   * 
   * ```
   * const newVideo = await videos.build({ aspectRatio: '1:1', backgroundColor: 'black', duration: 10, hd: false })
   * video.addWaveform({ style: 'line', height: 100, color: '#be5c5c', backgroundColor: 'transparent', y: 'b:40' })
   * ```
   */
  addWaveform (options: WaveformLayer) : Layer {
    const layer = this.addLayer({ type: 'waveform', ...options })
    return layer
  }

  /**
  * Send your video composition the the API to be encoded
  *
  * @example
  * 
  * ```
  * const newVideo = videos.build({ aspectRatio: '1:1', backgroundColor: 'black', duration: 10, hd: false })
  * const response = await videos.encode()
  * ```
  * 
  */
  async encode (): Promise<EncodeResponse | FetchError> {
    let config = this.generateConfig()
    this._form.append('config', JSON.stringify(config))
    try {
      const response = await this._api.post(`videos`, { body: this._form }, true)
      return response
    } catch (error) {
      throw error
    }
  }

  /**
  * Set/update main video composition options
  *
  * @example
  * 
  * ```
  * const newVideo = videos.build({ aspectRatio: '1:1', backgroundColor: 'black', duration: 10, hd: false })
  * newVideo.updateOptions({ aspectRatio: '9:16', backgroundColor: 'white', duration: 10, hd: false })
  * ```
  * 
  */
  updateOptions (options: Partial<VideoOptions>) : VideoBuilder {
    const { aspectRatio, backgroundColor, duration, hd, resolution } = options
    this._options = { aspectRatio, backgroundColor, duration, hd, resolution }
    return this
  }

  protected generateConfig () : EncodeConfig { 
    const { aspectRatio, hd, resolution } = this._options
    let options = {  ...this._options }
    let dimensions = resolution
    if(typeof(resolution) == 'undefined') 
      dimensions = sizeForApsectRatio(aspectRatio, hd)
    if(typeof (dimensions) == 'string'){
      const values = dimensions.split('x')
      dimensions = { width: parseInt(values[0]), height: parseInt(values[1]) }
      options['hd'] = dimensions.width >= 1024
    }
    delete options['resolution']
    const config : EncodeConfig = { ...options, dimensions, layers: this._layers }
    return config 
  }
}

export default VideoBuilder
