import { uuid } from './'

describe('uuid', () => {
  it('generates a 6-digit uuid', () => {
    expect(uuid()).toHaveLength(6)
  })
})
