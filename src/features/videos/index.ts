import delay from 'delay'
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
  pollDelay,
} from 'constant'
import { VideoErrorText } from 'strings'
import {
  createReadStream,
  createTemporaryDirectory,
  deepClone,
  generatePath,
  isApiVideo,
  isApiVideoMetadata,
  isApiVideos,
  prepareFormData,
  processCompositionFile,
  translateColor,
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
  private _develop: boolean

  constructor({ api, develop = false }: { api: ApiInterface; develop?: boolean }) {
    this._api = api
    this._develop = develop
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

  public async [ApiVideoMethod.get]({
    id,
    waitUntilEncodingComplete = false,
  }: {
    id: string
    waitUntilEncodingComplete?: boolean
  }): Promise<ApiVideo | undefined> {
    const getVideo = async () => {
      const data = await this._api.get({ url: generatePath(Routes.videos.get, { id }) })

      return validateApiData<ApiVideo>(data, {
        invalidDataError: VideoErrorText.malformedResponse,
        validate: isApiVideo,
      })
    }

    try {
      let video = await getVideo()

      while (waitUntilEncodingComplete && !video.isFailed && !video.isReady) {
        await delay(pollDelay)

        video = await getVideo()
      }

      return video
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
          validateCompositionFile(ApiVideoMethod.new, videoFile)
        }
      },
      async () => {
        let composition: Composition

        if (videoFile) {
          const temporaryDirectory = createTemporaryDirectory()
          const { filepath, readStream } = await processCompositionFile(videoFile, temporaryDirectory)
          const { duration, height, width } = await this._getMetadata(readStream)

          const transformedOptions = deepClone(options)

          transformedOptions.backgroundColor = translateColor(options.backgroundColor)

          composition = new Composition({
            api: this._api,
            develop: this._develop,
            formData: new FormData(),
            options: { ...transformedOptions, dimensions: { height, width }, duration },
            temporaryDirectory,
            videos: this,
          })

          await composition.addVideo(createReadStream(filepath))
        } else {
          const { backgroundColor, dimensions, duration, metadata } = options

          composition = new Composition({
            api: this._api,
            develop: this._develop,
            formData: new FormData(),
            options: {
              backgroundColor: translateColor(backgroundColor),
              dimensions,
              duration,
              metadata,
            },
            videos: this,
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
