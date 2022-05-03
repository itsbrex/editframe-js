import { Paginated } from 'constant'

export const mockPagination = <T>(data: T[]): Paginated<T> => ({
  data,
  links: {
    first: 'first',
    last: 'last',
  },
  meta: {
    currentPage: 1,
    from: 2,
    lastPage: 10,
    links: [
      {
        active: true,
        label: 'label',
      },
    ],
    path: 'path',
    perPage: 10,
    to: 20,
    total: 100,
  },
})
