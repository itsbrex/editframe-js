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
  uuid,
  validateAddAudio,
  validateAddImage,
  validateAddText,
  validateAddVideo,
  validateAddWaveform,
  validateApiData,
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

    const errors = this._validateOptions()

    if (errors.length > 0) {
      throw new Error(CompositionErrorText.validationOptionsError(errors.join(', ')))
    }

    if (this._options.videoFile) {
      this.addVideo(this._options.videoFile)
    }
  }

  get [CompositionMethod.layers](): IdentifiedLayer[] {
    return this._layers
  }

  public [CompositionMethod.layer](id: string): IdentifiedLayer {
    return this._layers.find((layer) => layer.id && layer.id === id)
  }

  public [CompositionMethod.addAudio](file: CompositionFile, options: AudioLayer = {}): Audio {
    validatePresenceOf(file, MediaErrorText.invalidFileSource)
    validateAddAudio(options)

    const layer = this._addLayer({ type: LayerType.audio, ...options })

    this._files.push({ file, id: layer.id })

    return new Audio({ composition: this, id: layer.id })
  }

  public [CompositionMethod.addFilter]<FilterName extends keyof FilterOptions>({
    filterName,
    options,
  }: {
    filterName: FilterName
    options: FilterOptions[FilterName]
  }): Filter {
    validateFilter(CompositionMethod.addFilter, LayerAttribute.filter, { filterName, options })

    const layer = this._addLayer({ filter: { filterName, options }, type: LayerType.filter })

    return new Filter({ composition: this, id: layer.id })
  }

  public [CompositionMethod.addImage](file: CompositionFile, options: ImageLayer): Video {
    validatePresenceOf(file, MediaErrorText.invalidFileSource)
    validateAddImage(options)

    const layer = this._addLayer({ type: LayerType.image, ...options })

    this._files.push({ file, id: layer.id })

    return new Video({ composition: this, id: layer.id })
  }

  public [CompositionMethod.addText](options: TextLayer): Text {
    validatePresenceOf(options.text, CompositionErrorText.textRequired)
    validateAddText(options)

    const layer = this._addLayer({ type: LayerType.text, ...options })

    return new Text({ composition: this, id: layer.id })
  }

  public [CompositionMethod.addVideo](file: CompositionFile, options: VideoLayer = {}): Video {
    validatePresenceOf(file, MediaErrorText.invalidFileSource)
    validateAddVideo(options)

    const layer = this._addLayer({ type: LayerType.video, ...options })

    this._files.push({ file, id: layer.id })

    return new Video({ composition: this, id: layer.id })
  }

  public [CompositionMethod.addWaveform](options: WaveformLayer): VisualMedia {
    validateAddWaveform(options)

    const layer = this._addLayer({ type: LayerType.waveform, ...options })

    return new VisualMedia({ composition: this, id: layer.id })
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

  private _validateOptions(): string[] {
    const { dimensions, duration } = this._options

    const errors = []

    if (!dimensions) {
      errors.push(CompositionErrorText.dimensionsRequired)
    }

    if (!duration) {
      errors.push(CompositionErrorText.durationRequired)
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
