import { LayerHorizontalAlignmentValue, PositionKey, PositionOptions } from 'constant'

export const MockPositionOptionsValue = {
  [PositionKey.angle]: 0,
  [PositionKey.angleX]: 0,
  [PositionKey.angleY]: 0,
  [PositionKey.isRelative]: true,
  [PositionKey.origin]: LayerHorizontalAlignmentValue.center,
  [PositionKey.x]: 0,
  [PositionKey.y]: 0,
  [PositionKey.z]: 0,
}

export const mockPositionOptions = ({
  angle = MockPositionOptionsValue.angle,
  angleX = MockPositionOptionsValue.angleX,
  angleY = MockPositionOptionsValue.angleY,
  isRelative = MockPositionOptionsValue.isRelative,
  origin = MockPositionOptionsValue.origin,
  x = MockPositionOptionsValue.x,
  y = MockPositionOptionsValue.y,
  z = MockPositionOptionsValue.z,
}: PositionOptions = MockPositionOptionsValue): PositionOptions => ({
  angle,
  angleX,
  angleY,
  isRelative,
  origin,
  x,
  y,
  z,
})
