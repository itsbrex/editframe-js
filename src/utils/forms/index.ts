import { Blob } from 'node:buffer'

import { PrimitiveType } from 'constant'

export const urlOrFile = (eitherBlobOrString: Blob | string): string =>
  typeof eitherBlobOrString === PrimitiveType.string ? 'url' : 'file'
