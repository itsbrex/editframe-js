import { uuid } from './'

describe('uuid', () => {
  it('genreates a 6-digit uuid', () => {
    expect(uuid()).toHaveLength(6)
  })
})
