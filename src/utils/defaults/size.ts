import { Dimensions, Size } from 'constant/shared'

export const makeDefaultSize = ({ height, width }: Dimensions): Size => ({
  size: {
    format: null,
    height,
    width,
  },
})
