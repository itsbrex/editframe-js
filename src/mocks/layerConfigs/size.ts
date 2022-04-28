import { FormatValue, SizeKey, SizeOptions } from 'constant'
export const MockSizeOptionsValue = {
  [SizeKey.format]: FormatValue.fill,
  [SizeKey.height]: 1080,
  [SizeKey.width]: 1920,
}

export const mockSizeOptions = ({
  format = MockSizeOptionsValue.format,
  height = MockSizeOptionsValue.height,
  width = MockSizeOptionsValue.width,
}: SizeOptions = MockSizeOptionsValue): SizeOptions => ({
  format,
  height,
  width,
})
