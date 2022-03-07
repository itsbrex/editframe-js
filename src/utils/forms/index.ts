import FormData from 'form-data'

import { CompositionFile, PrimitiveType } from 'constant'

export const prepareFormData = (dataToAppend: [string, any][]): FormData => {
  const formData = new FormData()

  dataToAppend.forEach((dataTuple) => {
    formData.append(dataTuple[0], dataTuple[1])
  })

  return formData
}

export const urlOrFile = (eitherBlobOrString: CompositionFile): 'url' | 'file' =>
  typeof eitherBlobOrString === PrimitiveType.string ? 'url' : 'file'
