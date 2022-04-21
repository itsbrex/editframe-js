import { mockSequenceLayer } from 'mocks'
import * as LayerConfigValidationUtilsModule from 'utils/validation/layerConfigs'

import { validateSequenceLayer } from './'

describe('validateSequenceLayer', () => {
  const callerName = 'caller-name'
  const layer = mockSequenceLayer()
  let validateTimelineSpy: jest.SpyInstance

  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    validateTimelineSpy = jest.spyOn(LayerConfigValidationUtilsModule, 'validateTimeline')

    validateSequenceLayer(callerName, layer)
  })

  it('calls the `validateTimeline` function with the correct arguments', () => {
    expect(validateTimelineSpy).toHaveBeenCalledWith({ callerName, layer })
  })
})
