import { ApiApplication } from 'constant'
import { mockApplication, mockPagination } from 'mocks'

import { isApplication, isApplications } from './'

describe('isApplication', () => {
  it('returns `false` when the provided `application` does not adhere to the `ApiApplication` interface', () => {
    expect(isApplication({})).toEqual(false)
  })

  it('returns `true` when the provided `application` adheres to the `ApiApplication` interface', () => {
    expect(isApplication(mockApplication())).toEqual(true)
  })
})

describe('isApplications', () => {
  it('returns `false` when one of the provided `applications` does not adhere to the `ApiApplication` interface', () => {
    expect(isApplications(mockPagination<ApiApplication>([{} as ApiApplication]))).toEqual(false)
  })

  it('returns `true` when the provided `applications` adheres to the `ApiApplication` interface', () => {
    expect(isApplications(mockPagination<ApiApplication>([mockApplication()]))).toEqual(true)
  })
})
