import { Readable } from 'node:stream'

import {
  ApiAudioMetadata,
  ApiImageMetadata,
  ApiInterface,
  ApiMetadataTypes,
  ApiVideoMetadata,
  ApiVideoMetadataAttribute,
  ApiVideoMetadataFormDataKey,
  ApiVideoMetadataType,
  AudioLayer,
  CompositionFile,
  CompositionInterface,
  CompositionMethod,
  CompositionOptions,
  EncodeResponse,
  FilterLayer,
  FormDataInterface,
  HTMLLayer,
  IdentifiedFile,
  IdentifiedLayer,
  ImageLayer,
  LayerAttribute,
  LayerAttributeValue,
  LayerType,
  LottieLayer,
  Metadata,
  Routes,
  SequenceLayer,
  Size,
  SubtitlesLayer,
  TextLayer,
  TypedLayer,
  VideoLayer,
  WaveformLayer,
} from 'constant'
import { Audio } from 'features/videos/audio'
import { Filter } from 'features/videos/filter'
import { HTML } from 'features/videos/html'
import { Layer } from 'features/videos/layer'
import { Lottie } from 'features/videos/lottie'
import { Sequence } from 'features/videos/sequence'
import { Subtitles } from 'features/videos/subtitles'
import { Text } from 'features/videos/text'
import { Video } from 'features/videos/video'
import { VisualMedia } from 'features/videos/visualMedia'
import { CompositionErrorText } from 'strings'
import {
  createReadStream,
  createTemporaryDirectory,
  formDataKey,
  getExtension,
  isAudioExtension,
  isEncodeResponse,
  isVideoExtension,
  metadataValidatorsByType,
  prepareFormData,
  preparePreview,
  processCompositionFile,
  removeDirectory,
  sanitizeHTML,
  urlOrFile,
  uuid,
  validateAddAudio,
  validateAddFilter,
  validateAddHTML,
  validateAddImage,
  validateAddLottie,
  validateAddSubtitles,
  validateAddText,
  validateAddVideo,
  validateAddWaveform,
  validateApiData,
  validateCompositionFile,
  validateCompositionOptions,
  validatePresenceOf,
  withValidation,
  withValidationAsync,
} from 'utils'

export class Composition implements CompositionInterface {
  private _api: ApiInterface
  private _files: IdentifiedFile[]
  private _formData: FormDataInterface
  private _layers: IdentifiedLayer[] = []
  private _options: CompositionOptions
  private _temporaryDirectory: string

  constructor({
    api,
    formData,
    options,
    temporaryDirectory,
  }: {
    api: ApiInterface
    formData: FormDataInterface
    options: CompositionOptions
    temporaryDirectory?: string
  }) {
    this._api = api
    this._files = []
    this._formData = formData
    this._options = options
    this._temporaryDirectory = temporaryDirectory ?? createTemporaryDirectory()

    withValidation<void>(() => validateCompositionOptions(this._options))
  }

  get backgroundColor(): string {
    return this._options.backgroundColor
  }

  get dimensions(): Size {
    return this._options.dimensions
  }

  get duration(): number {
    return this._options.duration
  }

  get metadata(): Metadata {
    return this._options.metadata
  }

  get [CompositionMethod.layers](): IdentifiedLayer[] {
    return this._layers
  }

  public [CompositionMethod.layer](id: string): IdentifiedLayer {
    return this._layers.find((layer) => layer.id && layer.id === id)
  }

  public setDuration(duration: number): void {
    this._options.duration = duration
  }

  public [CompositionMethod.getLayerAttribute]<LayerAttributeValue>(
    id: string,
    layerAttribute: LayerAttribute
  ): LayerAttributeValue {
    return this._layers.find((layer) => layer.id === id)[layerAttribute]
  }

  public [CompositionMethod.updateLayerAttribute](
    id: string,
    layerAttribute: LayerAttribute,
    value: LayerAttributeValue
  ): void {
    const newLayer = { ...this.layer(id) }

    newLayer[layerAttribute] = value

    this.setLayer(id, newLayer)
  }

  public [CompositionMethod.updateFile](id: string, file: Readable): void {
    this._files.find((file) => file.id === id).file = file
  }

  public async [CompositionMethod.addAudio](file: CompositionFile, options: AudioLayer = {}): Promise<Audio> {
    return withValidationAsync<Audio>(
      () => {
        validateCompositionFile(file)
        validatePresenceOf(options, CompositionErrorText.optionsRequired)
        validateAddAudio(options)
      },
      async () => {
        const { id } = this._addLayer({ type: LayerType.audio, ...options })
        const { readStream } = await processCompositionFile(file, this._temporaryDirectory)

        this._files.push({ file: readStream, id })

        return new Audio({ composition: this, id })
      }
    )
  }

  public [CompositionMethod.addFilter](options: FilterLayer): Filter | undefined {
    return withValidation<Filter>(
      () => {
        validatePresenceOf(options, CompositionErrorText.optionsRequired)
        validatePresenceOf(options.filter, CompositionErrorText.filterRequired)
        validateAddFilter(options)
      },
      () => {
        const { id } = this._addLayer({ ...options, type: LayerType.filter })

        return new Filter({ composition: this, id })
      }
    )
  }

  public async [CompositionMethod.addHTML](options: HTMLLayer): Promise<HTML> {
    return await withValidationAsync<HTML>(
      () => {
        validatePresenceOf(options, CompositionErrorText.optionsRequired)
        validateAddHTML(options)
      },
      async () => {
        const {
          height,
          html: { page, withTransparentBackground },
          width,
        } = options
        const transformedOptions: HTMLLayer = { ...options }

        if (page) {
          transformedOptions.html.page = await sanitizeHTML(page)
        }

        if (!height) {
          transformedOptions.height = this._options.dimensions.height
        }

        if (!width) {
          transformedOptions.width = this._options.dimensions.width
        }

        if (withTransparentBackground === undefined) {
          transformedOptions.html.withTransparentBackground = false
        }

        const { id } = this._addLayer({ ...transformedOptions, type: LayerType.html })

        return new HTML({ composition: this, id })
      }
    )
  }

  public async [CompositionMethod.addImage](file: CompositionFile, options: ImageLayer = {}): Promise<Video> {
    return withValidationAsync<Video>(
      () => {
        validateCompositionFile(file)
        validatePresenceOf(options, CompositionErrorText.optionsRequired)
        validateAddImage(options)
      },
      async () => {
        const { id } = this._addLayer({ type: LayerType.image, ...options })
        const { readStream } = await processCompositionFile(file, this._temporaryDirectory)

        this._files.push({ file: readStream, id })

        return new Video({ composition: this, id })
      }
    )
  }

  public [CompositionMethod.addLottie](options: LottieLayer): Lottie | undefined {
    return withValidation<Lottie>(
      () => {
        validatePresenceOf(options, CompositionErrorText.optionsRequired)
        validatePresenceOf(options.data, CompositionErrorText.dataRequired)
        validateAddLottie(options)
      },
      () => {
        const { id } = this._addLayer({ type: LayerType.lottie, ...options })

        return new Lottie({ composition: this, id })
      }
    )
  }

  public async [CompositionMethod.addSequence](
    layers: Layer[],
    options: SequenceLayer = { start: 0 }
  ): Promise<Sequence> {
    return await withValidationAsync<any>(
      () => {},
      async () => {
        const layersWithDurationAndFilepath = await Promise.all(
          layers.map(async (layer) => {
            const layerFile = this._file(layer.id)
            let metadata: ApiAudioMetadata | ApiImageMetadata | ApiVideoMetadata
            let path: string

            if (layerFile) {
              const { filepath, readStream } = await processCompositionFile(layerFile.file, this._temporaryDirectory)
              const extension = getExtension(filepath)

              path = filepath

              if (isVideoExtension(extension)) {
                metadata = await this._getMetadata(readStream, ApiVideoMetadataType.video)
              } else if (isAudioExtension(extension)) {
                metadata = await this._getMetadata(readStream, ApiVideoMetadataType.audio)
              }
            }

            return {
              duration: metadata && ApiVideoMetadataAttribute.duration in metadata ? metadata.duration : undefined,
              filepath: path,
              layer: this.layer(layer.id),
            }
          })
        )

        let currentTime = options.start || 0

        layersWithDurationAndFilepath.forEach(({ duration, filepath, layer }) => {
          this.updateLayerAttribute(layer.id, LayerAttribute.start, currentTime)

          if (filepath) {
            this.updateFile(layer.id, createReadStream(filepath))
          }

          if (LayerAttribute.trim in layer) {
            const { end, start = 0 } = layer.trim

            if (end) {
              currentTime += end - start
            } else if (duration) {
              currentTime += duration - start
            } else {
              throw new Error(CompositionErrorText.trimEndRequired(layer.type))
            }
          } else if (duration) {
            currentTime = duration
          } else {
            throw new Error(CompositionErrorText.trimEndRequired(layer.type))
          }
        })

        this.setDuration(currentTime)

        const { id } = this._addLayer({ type: LayerType.sequence, ...options })

        return new Sequence({ composition: this, id, layers })
      }
    )
  }

  public async [CompositionMethod.addSubtitles](
    file: CompositionFile,
    options: SubtitlesLayer = { subtitles: {} }
  ): Promise<Subtitles> {
    return withValidationAsync<Subtitles>(
      () => {
        validateCompositionFile(file)
        validateAddSubtitles(options)
      },
      async () => {
        const { id } = this._addLayer({ type: LayerType.subtitles, ...options })
        const { readStream } = await processCompositionFile(file, this._temporaryDirectory)

        this._files.push({ file: readStream, id })

        return new Subtitles({ composition: this, id })
      }
    )
  }

  public [CompositionMethod.addText](options: TextLayer): Text | undefined {
    return withValidation<Text>(
      () => {
        validatePresenceOf(options, CompositionErrorText.optionsRequired)
        validatePresenceOf(options.text, CompositionErrorText.textRequired)
        validateAddText(options)
      },
      () => {
        const { id } = this._addLayer({ type: LayerType.text, ...options })

        return new Text({ composition: this, id })
      }
    )
  }

  public async [CompositionMethod.addVideo](file: CompositionFile, options: VideoLayer = {}): Promise<Video> {
    return withValidationAsync<Video>(
      () => {
        validateCompositionFile(file)
        validatePresenceOf(options, CompositionErrorText.optionsRequired)
        validateAddVideo(options)
      },
      async () => {
        const { id } = this._addLayer({ type: LayerType.video, ...options })
        const { readStream } = await processCompositionFile(file, this._temporaryDirectory)

        this._files.push({ file: readStream, id })

        return new Video({ composition: this, id })
      }
    )
  }

  public async [CompositionMethod.addWaveform](
    options: WaveformLayer = {},
    file?: CompositionFile
  ): Promise<VisualMedia> {
    return withValidationAsync<VisualMedia>(
      () => {
        validatePresenceOf(options, CompositionErrorText.optionsRequired)
        validateAddWaveform(options)
        if (file) {
          validateCompositionFile(file)
        }
      },
      async () => {
        const { id } = this._addLayer({ type: LayerType.waveform, ...options })

        if (file) {
          const { readStream } = await processCompositionFile(file, this._temporaryDirectory)

          this._files.push({ file: readStream, id })
        }

        return new VisualMedia({ composition: this, id })
      }
    )
  }

  public async [CompositionMethod.preview](): Promise<void> {
    await preparePreview(
      JSON.stringify({
        ...this._options,
        files: this._files,
        layers: this._layers,
      })
    )
  }

  public async [CompositionMethod.encode](): Promise<EncodeResponse> {
    this._generateConfig()

    try {
      const data = await this._api.post({ data: this._formData, isForm: true, url: Routes.videos.create })

      removeDirectory(this._temporaryDirectory)

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
        layers: this._layers.filter((layer) => layer.type !== LayerType.sequence),
      })
    )
  }

  private _addLayer(options: TypedLayer): IdentifiedLayer {
    const newLayer: IdentifiedLayer = { id: uuid(), ...options }

    this._layers.push(newLayer)

    return newLayer
  }

  private [CompositionMethod.setLayer](id: string, newLayer: IdentifiedLayer): void {
    const newLayers = [...this.layers]
    const layerIndex = newLayers.findIndex((layer) => layer.id === id)

    newLayers[layerIndex] = newLayer

    this._layers = newLayers
  }

  private async [CompositionMethod.getMetadata](file: Readable, type: ApiVideoMetadataType): Promise<ApiMetadataTypes> {
    const formData = prepareFormData([
      [urlOrFile(file), file],
      [ApiVideoMetadataFormDataKey.type, type],
    ])

    const data = await this._api.post({ data: formData, isForm: true, url: Routes.metadata })

    return metadataValidatorsByType[type](data)
  }

  private _file(id: string): IdentifiedFile {
    return this._files.find((file) => file.id && file.id === id)
  }
}
