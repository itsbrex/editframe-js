import { ApiVideo } from 'constant'
import { mockApiVideo, mockApplication, mockPagination } from 'mocks'
import { isApiVideo } from 'utils/videos'

import { isPaginated } from './'

describe('isPaginated', () => {
  it('returns `false` when the provided `paginated` does not adhere to the `Paginated` interface', () => {
    const data = [mockApiVideo()]

    expect(isPaginated<ApiVideo>(data, isApiVideo)).toEqual(false)
  })

  it('returns `false` when the provided `paginated` does not adhere to the generic `Resource` interface', () => {
    const data = mockPagination([mockApplication()])

    expect(isPaginated<ApiVideo>(data, isApiVideo)).toEqual(false)
  })

  it('returns `true` when the provided `paginated` adheres to the `Paginated` and `Resource` interfaces', () => {
    const data = mockPagination([mockApiVideo()])

    expect(isPaginated<ApiVideo>(data, isApiVideo)).toEqual(true)
  })
})
