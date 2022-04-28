import { PositionKey, PositionOptions } from 'constant'

export const MockPositionOptionsValue = {
  [PositionKey.isRelative]: true,
  [PositionKey.x]: 0,
  [PositionKey.y]: 0,
}

export const mockPositionOptions = ({
  isRelative = MockPositionOptionsValue.isRelative,
  x = MockPositionOptionsValue.x,
  y = MockPositionOptionsValue.y,
}: PositionOptions = MockPositionOptionsValue): PositionOptions => ({
  isRelative,
  x,
  y,
})
