import { ApiVideo } from 'constant'
import { mockApiVideo, mockApiVideoMetadata, mockPagination } from 'mocks'

import { isApiVideo, isApiVideoMetadata, isApiVideos } from './'

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
