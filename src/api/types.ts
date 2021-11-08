import { FetchOptions } from './fetch'

export type ApiOptions = {
  clientId: string
  host?: string
  token: string
  version?: number
}

export enum ApiReadyStates {
  'NOT_READY',
  'READY',
  'INITIALIZED',
}

export type ApiHeaders = Record<string, string> & {
  Accept?: string
  Authorization?: string
}

export type ApiFetchOptions = FetchOptions