import { CompositionFile } from 'constant'

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
