export { Color } from '@editframe/shared-types'

export enum PrimitiveType {
  boolean = 'boolean',
  null = 'object',
  number = 'number',
  object = 'object',
  string = 'string',
  undefined = 'undefined',
}

export enum MimeType {
  json = 'application/json',
}

export type Hashided = {
  id: string
}

export type Timestamped = {
  createdAt: string
  updatedAt: string
}
