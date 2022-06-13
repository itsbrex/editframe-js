import { Position } from 'constant/shared'

export enum PositionMethod {
  setIsRelative = 'setIsRelative',
  setX = 'setX',
  setY = 'setY',
}

export const defaultPosition: Position = { position: { isRelative: false, x: 0, y: 0 } }
