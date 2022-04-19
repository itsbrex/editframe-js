import FormData from 'form-data'

import {
  ApiInterface,
  ApiVideo,
  ApiVideoMetadata,
  ApiVideoMetadataFormDataKey,
  ApiVideoMetadataType,
  ApiVideoMethod,
  Color,
  CompositionFile,
  Paginated,
  Routes,
  VideoOptions,
} from 'constant'
import { VideoErrorText } from 'strings'
import {
  createReadStream,
  createTemporaryDirectory,
  generatePath,
  isApiVideo,
  isApiVideoMetadata,
  isApiVideos,
  prepareFormData,
  processCompositionFile,
  urlOrFile,
  validateApiData,
  validateCompositionFile,
  validateNewVideo,
  withPaginationQueryParams,
  withValidationAsync,
} from 'utils'

import { Composition } from './composition'

export class Videos {
  private _api: ApiInterface

  constructor(api: ApiInterface) {
    this._api = api
  }

  public async [ApiVideoMethod.all](page?: number, perPage?: number): Promise<ApiVideo[]> {
    try {
      const data = await this._api.get({
        url: withPaginationQueryParams(Routes.videos.all, page, perPage),
      })

      return validateApiData<Paginated<ApiVideo>>(data, {
        invalidDataError: VideoErrorText.malformedResponse,
        validate: isApiVideos,
      }).data
    } catch (error) {
      console.error(VideoErrorText.all(error.message))
    }

    return []
  }

  public async [ApiVideoMethod.get](id: string): Promise<ApiVideo | undefined> {
    try {
      const data = await this._api.get({ url: generatePath(Routes.videos.get, { id }) })

      return validateApiData<ApiVideo>(data, {
        invalidDataError: VideoErrorText.malformedResponse,
        validate: isApiVideo,
      })
    } catch (error) {
      console.error(VideoErrorText.get(error.message))
    }

    return undefined
  }

  public async [ApiVideoMethod.new](
    options: VideoOptions = { backgroundColor: Color.black },
    videoFile?: CompositionFile
  ): Promise<Composition> {
    return withValidationAsync<Composition>(
      () => {
        validateNewVideo(options)
        if (videoFile) {
          validateCompositionFile(videoFile)
        }
      },
      async () => {
        let composition: Composition

        if (videoFile) {
          const temporaryDirectory = createTemporaryDirectory()
          const { filepath, readStream } = await processCompositionFile(videoFile, temporaryDirectory)
          const { duration, height, width } = await this._getMetadata(readStream)

          composition = new Composition({
            api: this._api,
            formData: new FormData(),
            options: { ...options, dimensions: { height, width }, duration },
            temporaryDirectory,
          })

          await composition.addVideo(createReadStream(filepath))
        } else {
          const { backgroundColor, dimensions, duration, metadata } = options

          composition = new Composition({
            api: this._api,
            formData: new FormData(),
            options: {
              backgroundColor,
              dimensions,
              duration,
              metadata,
            },
          })
        }

        return composition
      }
    )
  }

  private async [ApiVideoMethod.getMetadata](videoFile: CompositionFile): Promise<ApiVideoMetadata> {
    const formData = prepareFormData([
      [urlOrFile(videoFile), videoFile],
      [ApiVideoMetadataFormDataKey.type, ApiVideoMetadataType.video],
    ])

    const data = await this._api.post({ data: formData, isForm: true, url: Routes.metadata })

    return validateApiData<ApiVideoMetadata>(data, {
      invalidDataError: VideoErrorText.malformedResponse,
      validate: isApiVideoMetadata,
    })
  }
}
