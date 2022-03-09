import FormData from 'form-data'
import { Readable } from 'stream'

import {
  ApiInterface,
  ApiVideo,
  ApiVideoMetadata,
  ApiVideoMetadataFormDataKey,
  ApiVideoMetadataType,
  ApiVideoMethod,
  Color,
  CompositionFile,
  Routes,
  VideoOptions,
} from 'constant'
import { VideoErrorText } from 'strings'
import {
  createReadStream,
  downloadFile,
  generatePath,
  isApiVideo,
  isApiVideoMetadata,
  isApiVideos,
  isValidUrl,
  prepareFormData,
  removeDirectory,
  urlOrFile,
  validateApiData,
} from 'utils'

import { Composition } from './composition'

export class Videos {
  private _api: ApiInterface

  constructor(api: ApiInterface) {
    this._api = api
  }

  public async [ApiVideoMethod.all](): Promise<ApiVideo[]> {
    try {
      const data = await this._api.get({ url: Routes.videos.all })

      return validateApiData<ApiVideo[]>(data, {
        invalidDataError: VideoErrorText.malformedResponse,
        validate: isApiVideos,
      })
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
    videoPath?: string
  ): Promise<Composition> {
    try {
      let composition: Composition

      if (videoPath) {
        let metadataStream: Readable
        let encodeStream: Readable
        let tempFileDirectory: string

        if (isValidUrl(videoPath)) {
          const { temporaryFileDirectory, temporaryFilePath } = await downloadFile(videoPath)

          tempFileDirectory = temporaryFileDirectory

          metadataStream = createReadStream(temporaryFilePath)
          encodeStream = createReadStream(temporaryFilePath)
        } else {
          metadataStream = createReadStream(videoPath)
          encodeStream = createReadStream(videoPath)
        }

        const { duration, height, width } = await this._getMetadata(metadataStream)

        composition = new Composition({
          api: this._api,
          formData: new FormData(),
          options: { ...options, dimensions: { height, width }, duration },
        })

        composition.addVideo(encodeStream)
        removeDirectory(tempFileDirectory)
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
    } catch (error) {
      console.error(VideoErrorText.new(error.message))
    }

    return undefined
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
