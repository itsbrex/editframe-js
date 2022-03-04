import { Blob } from 'node:buffer'

import { urlOrFile } from './'

describe('urlOrFile', () => {
  it('returns `url` when `eitherBlobOrString` is of type `string`', () => {
    expect(urlOrFile(new Blob([]))).toEqual('file')
  })

  it('returns `file` when `eitherBlobOrString` is of type `Blob`', () => {
    expect(urlOrFile('string')).toEqual('url')
  })
})
