import { formDataKey } from './'

describe('formDataKey', () => {
  it('returns the correct string for strings', () => {
    const file = 'file'
    const id = 'id'

    expect(formDataKey(file, id)).toEqual(`url${id}`)
  })

  it('returns the correct string for Blobs', () => {
    const file = new Blob([])
    const id = 'id'

    expect(formDataKey(file, id)).toEqual(`file${id}`)
  })
})
