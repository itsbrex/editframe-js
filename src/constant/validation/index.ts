export interface ApiDataValidator<DataType> {
  invalidDataError: string
  validate: (data: unknown) => data is DataType
}

export type LayerValidator = (callerName: string, options: Record<string, any>) => string[]
