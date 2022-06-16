import { ApiVideo, ApiVideoMethod, CompositionKey, DimensionsKey, PrimitiveType } from 'constant'
import { mockApiVideo, mockApiVideoMetadata, mockCompositionOptions, mockPagination } from 'mocks'
import { ValidationErrorText } from 'strings'
import * as ValidationUtilsModule from 'utils/validation'

import { isApiVideo, isApiVideoMetadata, isApiVideos, validateNewVideo } from './'

describe('isApiVideo', () => {
  it('returns `false` when the provided `video` does not adhere to the `ApiVideo` interface', () => {
    expect(isApiVideo({})).toEqual(false)
  })

  it('returns `true` when the provided `video` adheres to the `ApiVideo` interface', () => {
    expect(isApiVideo(mockApiVideo())).toEqual(true)
  })
})

describe('isApiVideos', () => {
  it('returns `false` when one of the provided `videos` does not adhere to the `ApiVideo` interface', () => {
    expect(isApiVideos(mockPagination<ApiVideo>([{} as ApiVideo]))).toEqual(false)
  })

  it('returns `true` when the provided `videos` adheres to the `ApiVideo` interface', () => {
    expect(isApiVideos(mockPagination<ApiVideo>([mockApiVideo()]))).toEqual(true)
  })
})

describe('isApiVideoMetadata', () => {
  it('returns `false` when the provided `metadata` does not adhere to the `ApiVideoMetadata` interface', () => {
    expect(isApiVideoMetadata({})).toEqual(false)
  })

  it('returns `true` when the provided `metadata` adheres to the `ApiVideoMetadata` interface', () => {
    expect(isApiVideoMetadata(mockApiVideoMetadata())).toEqual(true)
  })
})

describe('validateNewVideo', () => {
  const compositionOptions = mockCompositionOptions()
  let validateColorSpy: jest.SpyInstance
  let validateValueIsOfTypeSpy: jest.SpyInstance

  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    validateColorSpy = jest.spyOn(ValidationUtilsModule, 'validateColor')
    validateValueIsOfTypeSpy = jest.spyOn(ValidationUtilsModule, 'validateValueIsOfType')
    validateNewVideo(compositionOptions)
  })

  it('calls the `validateColor` function with the correct arguments', () => {
    expect(validateColorSpy).toHaveBeenCalledWith(
      ApiVideoMethod.new,
      CompositionKey.backgroundColor,
      compositionOptions.backgroundColor,
      true
    )
  })

  it('calls the `validateValueIsOfType` function with the correct arguments', () => {
    expect(validateValueIsOfTypeSpy).toHaveBeenCalledTimes(5)

    expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
      ApiVideoMethod.new,
      ValidationErrorText.SUB_FIELD(CompositionKey.dimensions, DimensionsKey.height),
      compositionOptions.dimensions.height,
      PrimitiveType.number,
      true
    )
    expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
      ApiVideoMethod.new,
      ValidationErrorText.SUB_FIELD(CompositionKey.dimensions, DimensionsKey.width),
      compositionOptions.dimensions.width,
      PrimitiveType.number,
      true
    )
    expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
      ApiVideoMethod.new,
      CompositionKey.duration,
      compositionOptions.duration,
      PrimitiveType.number,
      true
    )
    expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
      ApiVideoMethod.new,
      CompositionKey.metadata,
      compositionOptions.metadata,
      PrimitiveType.object,
      true
    )
  })
})
