export enum PrimitiveType {
  number = 'number',
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
