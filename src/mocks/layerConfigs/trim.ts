import { TrimKey, TrimOptions } from 'constant'

export const MockTrimOptionsValue = {
  [TrimKey.start]: 0,
  [TrimKey.end]: 5,
}

export const mockTrimOptions = ({
  end = MockTrimOptionsValue.end,
  start = MockTrimOptionsValue.start,
}: TrimOptions = MockTrimOptionsValue): TrimOptions => ({
  end,
  start,
})
