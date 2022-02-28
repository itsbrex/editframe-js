export interface ApiDataValidator<DataType> {
  invalidDataError: string
  validate: (data: unknown) => data is DataType
}
