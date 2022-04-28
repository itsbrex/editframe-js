import { TimelineKey, TimelineOptions } from 'constant'

export const MockTimelineOptionsValue = {
  [TimelineKey.start]: 0,
}

export const mockTimelineOptions = ({
  start = MockTimelineOptionsValue.start,
}: TimelineOptions = MockTimelineOptionsValue): TimelineOptions => ({
  start,
})
