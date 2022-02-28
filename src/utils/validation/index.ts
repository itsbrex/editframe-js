import { ApiDataValidator, CompositionFile } from 'constant'

export const validateApiData = <DataType>(data: unknown, validator: ApiDataValidator<DataType>): DataType => {
  if (data && validator.validate(data)) {
    return data
  }

  throw new Error(validator.invalidDataError)
}

export const validatePresenceOf = ({
  errorMessage,
  value,
}: {
  errorMessage: string
  value?: string | number | CompositionFile
}): string | undefined => {
  if (!value) {
    return errorMessage || errorMessage
  }

  return undefined
}
