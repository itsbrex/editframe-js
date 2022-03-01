import { CompositionFile } from 'constant'
import { urlOrFile } from 'utils/forms'

export const formDataKey = (file: CompositionFile, id: string): string => `${urlOrFile(file)}${id}`
