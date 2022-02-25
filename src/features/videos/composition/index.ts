import { Blob } from 'node:buffer'

import {
  ApiInterface,
  AudioLayer,
  ComposableLayer,
  CompositionInterface,
  CompositionOptions,
  EncodeResponse,
  FilterOptions,
  FormDataInterface,
  ImageLayer,
  Layer,
  LayerAttribute,
  LayerType,
  Routes,
  TextLayer,
  VideoLayer,
  WaveformLayer,
} from 'constant'
import { Video } from 'features/videos/video'
import { MediaErrorText, VideoErrorText } from 'strings'
import { formDataKey, isEncodeResponse, uuid, validateFilter, validatePresenceOf } from 'utils'

export class Composition implements CompositionInterface {
  private _api: ApiInterface
  private _files: {
    file: string | Blob
    id: string
  }[]
  private _formData: FormDataInterface
  private _layers: Layer[] = []
  private _options: any

  constructor({
    api,
    formData,
    options,
  }: {
    api: ApiInterface
    formData: FormDataInterface
    options: CompositionOptions
  }) {
    this._api = api
    this._files = []
    this._formData = formData
    this._options = options || {}

    const errors = this._validateOptions()

    if (errors.length > 0) {
      throw new Error(`Error: ${errors.join(', ')}`)
    }
  }

  get layers(): Layer[] {
    return this._layers
  }

  public layer(id: string): Layer {
    return this._layers.find((layer) => layer.id && layer.id === id)
  }

  public addAudio(file: Blob | string, options: AudioLayer = {}): Composition {
    const error = validatePresenceOf({ errorMessage: MediaErrorText.invalidFileSource, value: file })

    if (error) {
      throw new Error(error)
    }

    const layer = this._addLayer({ type: LayerType.audio, ...options })

    this._files.push({ file, id: layer.id })

    return this
  }

  public addFilter<FilterName extends keyof FilterOptions>({
    name,
    options,
  }: {
    name: FilterName
    options: FilterOptions[FilterName]
  }): Composition {
    const error = validateFilter(name, options)

    if (error) {
      throw new Error(error)
    }

    this._addLayer({ filter: { filterName: name, options }, type: LayerType.filter })

    return this
  }

  public addImage(file: Blob | string, options: ImageLayer): Composition {
    const error = validatePresenceOf({ errorMessage: MediaErrorText.invalidFileSource, value: file })

    if (error) {
      throw new Error(error)
    }

    const layer = this._addLayer({ type: LayerType.image, ...options })

    this._files.push({ file, id: layer.id })

    return this
  }

  public addText(options: TextLayer): Composition {
    const error = validatePresenceOf({ errorMessage: VideoErrorText.textRequired, value: options.text })

    if (error) {
      throw new Error(error)
    }

    this._addLayer({ type: LayerType.text, ...options })

    return this
  }

  public addVideo(file: Blob | string, options: VideoLayer): Video {
    const error = validatePresenceOf({ errorMessage: MediaErrorText.invalidFileSource, value: file })

    if (error) {
      throw new Error(error)
    }

    const layer = this._addLayer({ type: LayerType.video, ...options })

    this._files.push({ file, id: layer.id })

    return new Video({ composition: this, id: layer.id })
  }

  public addWaveform(options: WaveformLayer): Composition {
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
    this._files.forEach(({ file, id }) => this._formData.append(formDataKey(file, id), file))
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

  updateLayerAttribute(id: string, layerAttribute: LayerAttribute, value: number | string): void {
    const newLayer = { ...this.layer(id) }

    newLayer[layerAttribute] = value

    this.setLayer(id, newLayer)
  }

  private setLayer(id: string, newLayer: Layer): void {
    const newLayers = [...this.layers]
    const layerIndex = newLayers.findIndex((layer) => layer.id === id)

    newLayers[layerIndex] = newLayer

    this._layers = newLayers
  }
}
