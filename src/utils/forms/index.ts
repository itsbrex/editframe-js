import { CompositionFile, PrimitiveType } from 'constant'

export const urlOrFile = (eitherBlobOrString: CompositionFile): string =>
  typeof eitherBlobOrString === PrimitiveType.string ? 'url' : 'file'
