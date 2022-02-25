export type Hashided = {
  id: string;
};

export type Timestamped = {
  createdAt: string;
  updatedAt: string;
};

export type Size = {
  height?: number;
  width?: number;
};

export type Resolution = Size;

export enum PrimitiveType {
  string = "string",
  undefined = "undefined",
}
