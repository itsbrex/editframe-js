import { Trim } from 'constant/shared'

export enum TrimMethod {
  setTrim = 'setTrim',
}

export const defaultTrim: Trim = { trim: { end: null, start: 0 } }
