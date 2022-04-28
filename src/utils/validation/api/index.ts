import { ApiAudioMetadata, ApiDataValidator, ApiImageMetadata, ApiVideoMetadata, ApiVideoMetadataType } from 'constant'
import { VideoErrorText } from 'strings'
import { isApiAudioMetadata, isApiImageMetadata, isApiVideoMetadata } from 'utils/validation/videos'

export const validateApiData = <DataType>(data: unknown, validator: ApiDataValidator<DataType>): DataType => {
  if (data && validator.validate(data)) {
    return data
  }

  throw new Error(validator.invalidDataError)
}

export const metadataValidatorsByType = {
  [ApiVideoMetadataType.audio]: (data: unknown): ApiAudioMetadata =>
    validateApiData<ApiAudioMetadata>(data, {
      invalidDataError: VideoErrorText.malformedResponse,
      validate: isApiAudioMetadata,
    }),
  [ApiVideoMetadataType.image]: (data: unknown): ApiImageMetadata =>
    validateApiData<ApiImageMetadata>(data, {
      invalidDataError: VideoErrorText.malformedResponse,
      validate: isApiImageMetadata,
    }),
  [ApiVideoMetadataType.video]: (data: unknown): ApiVideoMetadata =>
    validateApiData<ApiVideoMetadata>(data, {
      invalidDataError: VideoErrorText.malformedResponse,
      validate: isApiVideoMetadata,
    }),
}
