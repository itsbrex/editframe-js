import { Blob } from 'node:buffer'

export const validatePresenceOf = ({
  errorMessage,
  value,
}: {
  errorMessage: string
  value?: string | number | Blob
}): string | undefined => {
  if (!value) {
    return errorMessage || errorMessage
  }

  return undefined
}
