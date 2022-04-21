import { FilterLayer, FilterName, FilterOptions } from 'constant'

const MockFilterValue = {
  name: FilterName.brightness,
  options: { brightness: 10 },
}

export const mockFilterOptions = ({
  name = MockFilterValue.name,
  options = MockFilterValue.options,
}: FilterOptions = MockFilterValue): FilterOptions => ({
  name,
  options,
})

export const mockFilterLayer = (): FilterLayer => ({
  filter: mockFilterOptions(),
})
