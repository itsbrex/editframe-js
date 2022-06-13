import { Size } from 'constant/shared'

export enum SizeMethod {
  setDimensions = 'setDimensions',
  setFormat = 'setFormat',
  setHeight = 'setHeight',
  setWidth = 'setWidth',
}

export const defaultSize: Size = {
  size: {
    format: null,
    height: null,
    width: null,
  },
}
