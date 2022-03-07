export interface ApiDataValidator<DataType> {
    invalidDataError: string;
    validate: (data: unknown) => data is DataType;
}
export declare type LayerValidator = (callerName: string, options: Record<string, any>) => string[];
