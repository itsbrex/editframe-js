import { CompositionInterface, LayerKey, TimelineKey, TimelineMethod } from 'constant'
import { mockComposition } from 'mocks'
import * as TimelineValidationModule from 'utils/validation/layerConfigs/timeline'

import { TimelineMixin } from './'

describe('TimelineMixin', () => {
  const id = 'id'
  let compositionMock: CompositionInterface
  let timeline: TimelineMixin
  let result: TimelineMixin | void
  let validateTimelineMixinSpy: jest.SpyInstance

  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(async () => {
    compositionMock = mockComposition({
      setLayerAttribute: jest.fn(),
    })
    validateTimelineMixinSpy = jest.spyOn(TimelineValidationModule, 'validateTimelineMixin')

    timeline = new TimelineMixin({ composition: compositionMock, id })
  })

  describe('setStart', () => {
    const start = 5

    beforeEach(() => {
      result = timeline.setStart(start)
    })

    it('calls the `validateTimelineMixin` function with the correct arguments', () => {
      expect(validateTimelineMixinSpy).toHaveBeenCalledWith(TimelineMethod.setStart, { timeline: { start } })
    })

    it('calls the `setLayerAttribute` method on the composition with the correct arguments', () => {
      expect(compositionMock.setLayerAttribute).toHaveBeenCalledWith({
        childKey: TimelineKey.start,
        id,
        layerKey: LayerKey.timeline,
        value: start,
      })
    })

    it('returns the `TimelineMixin` instance', () => {
      expect(result).toBeInstanceOf(TimelineMixin)
    })
  })
})
