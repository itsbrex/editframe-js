import { FilterName } from 'constant'
import { FilterErrorText } from 'strings'

import { validateFilter } from './'

describe('validateFilter', () => {
  it('returns the correct error string when an invalid filter `name` is provided', () => {
    const name = 'fake-filter'

    expect(validateFilter(name as any, {} as any)).toEqual(FilterErrorText.invalidFilterName(name))
  })

  describe('when a valid filter `name` is provided', () => {
    const name = FilterName.brightness

    it('returns the correct error string when invalid filter `options` are provided', () => {
      const options = {}

      expect(validateFilter(name, options as any)).toEqual(
        FilterErrorText.invalidFilterOptions(name, JSON.stringify(options))
      )
    })

    it('returns `undefined` when valid filter `options` are provided', () => {
      expect(validateFilter(name, { brightness: 10 })).toBeUndefined()
    })
  })
})
