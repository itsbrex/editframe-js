import { BackgroundKey, BackgroundOptions, Color } from 'constant'

export const MockBackgroundOptionsValue = {
  [BackgroundKey.color]: Color.white,
  [BackgroundKey.opacity]: 1,
}

export const mockBackgroundOptions = ({
  color = MockBackgroundOptionsValue.color,
  opacity = MockBackgroundOptionsValue.opacity,
}: BackgroundOptions = MockBackgroundOptionsValue): BackgroundOptions => ({
  color,
  opacity,
})
