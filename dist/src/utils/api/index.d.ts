import { ApiDataValidator, ApiHeaders, FetchFunction, MakeFetchFunction } from 'constant';
export declare const baseURL: (host: string, version: number) => string;
export declare const initializeFetchUtil: (baseUrl: string) => FetchFunction;
export declare const makeRequest: MakeFetchFunction;
export declare const makeHeaders: ({ clientId, isForm, token, }: {
    clientId: string;
    isForm?: boolean;
    token: string;
}) => ApiHeaders;
export declare const validateApiData: <DataType>(data: unknown, validator: ApiDataValidator<DataType>) => DataType;
