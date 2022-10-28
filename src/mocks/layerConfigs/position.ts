import { PositionKey, PositionOptions } from 'constant'

export const MockPositionOptionsValue = {
  [PositionKey.angle]: 0,
  [PositionKey.angleX]: 0,
  [PositionKey.angleY]: 0,
  [PositionKey.isRelative]: true,
  [PositionKey.scale]: 1,
  [PositionKey.x]: 0,
  [PositionKey.y]: 0,
}

export const mockPositionOptions = ({
  angle = MockPositionOptionsValue.angle,
  angleX = MockPositionOptionsValue.angleX,
  angleY = MockPositionOptionsValue.angleY,
  isRelative = MockPositionOptionsValue.isRelative,
  scale = MockPositionOptionsValue.scale,
  x = MockPositionOptionsValue.x,
  y = MockPositionOptionsValue.y,
}: PositionOptions = MockPositionOptionsValue): PositionOptions => ({
  angle,
  angleX,
  angleY,
  isRelative,
  scale,
  x,
  y,
})
