import { FilterName } from 'constant'
import { FilterErrorText } from 'strings'

import { validateFilter } from './'

describe('validateFilter', () => {
  it('throws the correct error string when an invalid filter `name` is provided', () => {
    const name = 'fake-filter'

    expect(() => validateFilter(name as any, {} as any)).toThrow(new Error(FilterErrorText.invalidFilterName(name)))
  })

  describe('when a valid filter `name` is provided', () => {
    const name = FilterName.brightness

    it('throws the correct error string when invalid filter `options` are provided', () => {
      const options = {}

      expect(() => validateFilter(name, options as any)).toThrow(
        new Error(FilterErrorText.invalidFilterOptions(name, JSON.stringify(options)))
      )
    })
  })
})
