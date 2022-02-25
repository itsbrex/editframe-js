export enum PrimitiveType {
  string = 'string',
  undefined = 'undefined',
}

export type Hashided = {
  id: string
}

export type Timestamped = {
  createdAt: string
  updatedAt: string
}
