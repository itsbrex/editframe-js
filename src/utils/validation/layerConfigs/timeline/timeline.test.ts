import { LayerKey, PrimitiveType, TimelineKey, TimelineMethod } from 'constant'
import { mockTimelineOptions } from 'mocks'
import { ValidationErrorText } from 'strings'
import * as ValidationUtilsModule from 'utils/validation'

import { validateTimeline, validateTimelineMixin } from './'

describe('validateTimeline', () => {
  const callerName = 'caller-name'
  const start = 5
  let validateValueIsOfTypeSpy: jest.SpyInstance

  beforeEach(() => {
    validateValueIsOfTypeSpy = jest.spyOn(ValidationUtilsModule, 'validateValueIsOfType')

    validateTimeline({ callerName, layer: { timeline: { start } } })
  })

  it('calls the `validateValueIsOfType` function with the correct arguments', () => {
    expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.timeline, TimelineKey.start),
      start,
      PrimitiveType.number
    )
  })
})

describe('validateTimelineMixin', () => {
  const callerName = TimelineMethod.setStart
  const timeline = mockTimelineOptions()
  const layer = { timeline }
  let validateLayerSpy: jest.SpyInstance

  beforeEach(() => {
    validateLayerSpy = jest.spyOn(ValidationUtilsModule, 'validateLayer')
  })

  it('calls the `validateLayer` function with the correct arguments', () => {
    validateTimelineMixin(callerName, layer)

    expect(validateLayerSpy).toHaveBeenCalledWith([validateTimeline], callerName, layer)
  })
})
