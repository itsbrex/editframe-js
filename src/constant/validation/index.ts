export interface ApiDataValidator<DataType> {
  invalidDataError: string
  validate: (data: unknown) => data is DataType
}

export type LayerValidator<LayerType> = ({
  callerName,
  layer,
  shouldThrow,
}: {
  callerName: string
  layer: LayerType
  shouldThrow?: false
}) => string[]
