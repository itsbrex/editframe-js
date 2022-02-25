import { Blob } from 'node:buffer'

import { ValidationErrorText } from 'strings'

export const validatePresenceOf = (value?: string | number | Blob, errorMessage?: string): string | undefined => {
  if (!value) {
    return errorMessage || ValidationErrorText.REQUIRED_FIELD
  }

  return undefined
}
