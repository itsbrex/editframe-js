import {
  ApiInterface,
  AudioLayer,
  ComposableLayer,
  CompositionFile,
  CompositionInterface,
  CompositionMethod,
  CompositionOptions,
  EncodeResponse,
  FilterOptions,
  FormDataInterface,
  IdentifiedLayer,
  ImageLayer,
  LayerAttribute,
  LayerAttributeValue,
  LayerType,
  Routes,
  TextLayer,
  VideoLayer,
  WaveformLayer,
} from 'constant'
import { Audio } from 'features/videos/audio'
import { Filter } from 'features/videos/filter'
import { Text } from 'features/videos/text'
import { Video } from 'features/videos/video'
import { VisualMedia } from 'features/videos/visualMedia'
import { CompositionErrorText, MediaErrorText } from 'strings'
import {
  formDataKey,
  isEncodeResponse,
  logValidationError,
  uuid,
  validateAddAudio,
  validateAddImage,
  validateAddText,
  validateAddVideo,
  validateAddWaveform,
  validateApiData,
  validateCompositionOptions,
  validateFilter,
  validatePresenceOf,
} from 'utils'

export class Composition implements CompositionInterface {
  private _api: ApiInterface
  private _files: {
    file: CompositionFile
    id: string
  }[]
  private _formData: FormDataInterface
  private _layers: IdentifiedLayer[] = []
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

    try {
      validateCompositionOptions(this._options)

      if (this._options.videoFile) {
        this.addVideo(this._options.videoFile)
      }
    } catch ({ stack }) {
      logValidationError(stack)
    }
  }

  get [CompositionMethod.layers](): IdentifiedLayer[] {
    return this._layers
  }

  public [CompositionMethod.layer](id: string): IdentifiedLayer {
    return this._layers.find((layer) => layer.id && layer.id === id)
  }

  public [CompositionMethod.addAudio](file: CompositionFile, options: AudioLayer = {}): Audio | void {
    try {
      validatePresenceOf(file, MediaErrorText.invalidFileSource)
      validateAddAudio(options)

      const layer = this._addLayer({ type: LayerType.audio, ...options })

      this._files.push({ file, id: layer.id })

      return new Audio({ composition: this, id: layer.id })
    } catch ({ stack }) {
      logValidationError(stack)
    }
  }

  public [CompositionMethod.addFilter]<FilterName extends keyof FilterOptions>({
    filterName,
    options,
  }: {
    filterName: FilterName
    options: FilterOptions[FilterName]
  }): Filter | void {
    try {
      validateFilter(CompositionMethod.addFilter, LayerAttribute.filter, { filterName, options })

      const layer = this._addLayer({ filter: { filterName, options }, type: LayerType.filter })

      return new Filter({ composition: this, id: layer.id })
    } catch ({ stack }) {
      logValidationError(stack)
    }
  }

  public [CompositionMethod.addImage](file: CompositionFile, options: ImageLayer): Video | void {
    try {
      validatePresenceOf(file, MediaErrorText.invalidFileSource)
      validateAddImage(options)

      const layer = this._addLayer({ type: LayerType.image, ...options })

      this._files.push({ file, id: layer.id })

      return new Video({ composition: this, id: layer.id })
    } catch ({ stack }) {
      logValidationError(stack)
    }
  }

  public [CompositionMethod.addText](options: TextLayer): Text | void {
    try {
      validatePresenceOf(options.text, CompositionErrorText.textRequired)
      validateAddText(options)

      const layer = this._addLayer({ type: LayerType.text, ...options })

      return new Text({ composition: this, id: layer.id })
    } catch ({ stack }) {
      logValidationError(stack)
    }
  }

  public [CompositionMethod.addVideo](file: CompositionFile, options: VideoLayer = {}): Video | void {
    try {
      validatePresenceOf(file, MediaErrorText.invalidFileSource)
      validateAddVideo(options)

      const layer = this._addLayer({ type: LayerType.video, ...options })

      this._files.push({ file, id: layer.id })

      return new Video({ composition: this, id: layer.id })
    } catch ({ stack }) {
      logValidationError(stack)
    }
  }

  public [CompositionMethod.addWaveform](options: WaveformLayer): VisualMedia | void {
    try {
      validateAddWaveform(options)

      const layer = this._addLayer({ type: LayerType.waveform, ...options })

      return new VisualMedia({ composition: this, id: layer.id })
    } catch ({ stack }) {
      logValidationError(stack)
    }
  }

  public async [CompositionMethod.encode](): Promise<EncodeResponse> {
    this._generateConfig()

    try {
      const data = await this._api.post({ data: this._formData, isForm: true, url: Routes.videos.create })

      return validateApiData<EncodeResponse>(data, {
        invalidDataError: CompositionErrorText.malformedEncodingResponse,
        validate: isEncodeResponse,
      })
    } catch (error) {
      console.error(CompositionErrorText.errorEncoding(error.message))

      return undefined
    }
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

  private _addLayer(options: ComposableLayer): IdentifiedLayer {
    const newLayer: IdentifiedLayer = { id: uuid(), ...options }

    this._layers.push(newLayer)

    return newLayer
  }

  [CompositionMethod.updateLayerAttribute](
    id: string,
    layerAttribute: LayerAttribute,
    value: LayerAttributeValue
  ): void {
    const newLayer = { ...this.layer(id) }

    newLayer[layerAttribute] = value

    this.setLayer(id, newLayer)
  }

  private [CompositionMethod.setLayer](id: string, newLayer: IdentifiedLayer): void {
    const newLayers = [...this.layers]
    const layerIndex = newLayers.findIndex((layer) => layer.id === id)

    newLayers[layerIndex] = newLayer

    this._layers = newLayers
  }
}
