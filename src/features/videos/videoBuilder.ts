import { Blob } from 'node:buffer'

import {
  ApiInterface,
  AudioLayer,
  ComposableLayer,
  EncodeResponse,
  FilterOptions,
  FormDataInterface,
  ImageLayer,
  Layer,
  LayerType,
  Routes,
  TextLayer,
  VideoLayer,
  VideoOptions,
  WaveformLayer,
} from 'constant'
import { MediaErrorText, VideoErrorText } from 'strings'
import { formDataKey, isEncodeResponse, uuid, validateFilter, validatePresenceOf } from 'utils'

export class VideoBuilder {
  private _api: ApiInterface
  private _formData: FormDataInterface
  private _layers: VideoLayer[] = []
  private _options: any

  constructor({ api, formData, options }: { api: ApiInterface; formData: FormDataInterface; options: VideoOptions }) {
    this._api = api
    this._formData = formData
    this._options = options || {}

    const errors = this._validateOptions()

    if (errors.length > 0) {
      throw new Error(`Error: ${errors.join(', ')}`)
    }
  }

  get layers(): VideoLayer[] {
    return this._layers
  }

  public addAudio(file: Blob | string, options: AudioLayer = {}): VideoBuilder {
    const error = validatePresenceOf(file, MediaErrorText.invalidFileSource)

    if (error) {
      throw new Error(error)
    }

    const layer = this._addLayer({ type: LayerType.audio, ...options })

    this._formData.append(formDataKey(file, layer.id), file)

    return this
  }

  public addFilter<FilterName extends keyof FilterOptions>({
    name,
    options,
  }: {
    name: FilterName
    options: FilterOptions[FilterName]
  }): VideoBuilder {
    const error = validateFilter(name, options)

    if (error) {
      throw new Error(error)
    }

    this._addLayer({ filter: { filterName: name, options }, type: LayerType.filter })

    return this
  }

  public addImage(file: Blob | string, options: ImageLayer): VideoBuilder {
    const error = validatePresenceOf(file, MediaErrorText.invalidFileSource)

    if (error) {
      throw new Error(error)
    }

    const layer = this._addLayer({ type: LayerType.image, ...options })

    this._formData.append(formDataKey(file, layer.id), file)

    return this
  }

  public addText(options: TextLayer): VideoBuilder {
    const error = validatePresenceOf(options.text, VideoErrorText.textRequired)

    if (error) {
      throw new Error(error)
    }

    this._addLayer({ type: LayerType.text, ...options })

    return this
  }

  public addVideo(file: Blob | string, options: VideoLayer): VideoBuilder {
    const error = validatePresenceOf(file, MediaErrorText.invalidFileSource)

    if (error) {
      throw new Error(error)
    }

    const layer = this._addLayer({ type: LayerType.video, ...options })

    this._formData.append(formDataKey(file, layer.id), file)

    return this
  }

  public addWaveform(options: WaveformLayer): VideoBuilder {
    this._addLayer({ type: LayerType.waveform, ...options })

    return this
  }

  public async encode(): Promise<EncodeResponse> {
    this._generateConfig()

    try {
      const encodeResponse = await this._api.post({ data: this._formData, isForm: true, url: Routes.videos.create })

      if (encodeResponse && isEncodeResponse(encodeResponse)) {
        return encodeResponse
      }

      throw new Error(VideoErrorText.malformedEncodingResponse)
    } catch (error) {
      console.error(VideoErrorText.errorEncoding(error.message))

      return undefined
    }
  }

  private _validateOptions(): string[] {
    const { aspectRatio, dimensions, duration } = this._options

    const errors = []

    if (!aspectRatio && !dimensions) {
      errors.push(VideoErrorText.aspectRatioDimensionsRequired)
    }

    if (!duration) {
      errors.push(VideoErrorText.durationRequired)
    }

    return errors
  }

  private _generateConfig(): void {
    this._formData.append(
      'config',
      JSON.stringify({
        ...this._options,
        layers: this._layers,
      })
    )
  }

  private _addLayer(options: ComposableLayer): Layer {
    const newLayer: Layer = { id: uuid(), ...options }

    this._layers.push(newLayer)

    return newLayer
  }
}
