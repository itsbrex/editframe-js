import { CompositionFile, PrimitiveType } from 'constant'

export const urlOrFile = (eitherBlobOrString: CompositionFile): 'url' | 'file' =>
  typeof eitherBlobOrString === PrimitiveType.string ? 'url' : 'file'
