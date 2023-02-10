import FormData from 'form-data';
export interface ApiInterface {
    get: ({ url }: {
        url: string;
    }) => Promise<unknown>;
    post: ({ data, isForm, url, }: {
        data: FormData | Record<string, any>;
        isForm: boolean;
        url: string;
    }) => Promise<unknown>;
    put: ({ data, isForm, url, }: {
        data: FormData | Record<string, any>;
        isForm: boolean;
        url: string;
    }) => Promise<unknown>;
}
export declare type ApiOptions = {
    clientId: string;
    fetch: FetchFunction;
    host?: string;
    token: string;
    version?: number;
};
export declare enum ApiHeaderKey {
    accept = "Accept",
    authorization = "Authorization",
    contentType = "Content-Type",
    editframeClientId = "Editframe-Client-Id",
    userAgent = "User-Agent",
    xRequestedWith = "X-Requested-With"
}
export declare enum ApiHeaderValue {
    bearer = "Bearer ",
    editframeJs = "editframe.js/",
    xRequestedWithXML = "XMLHttpRequest"
}
export declare type ApiHeaders = Record<string, string> & {
    [ApiHeaderKey.accept]?: string;
    [ApiHeaderKey.authorization]: string;
    [ApiHeaderKey.contentType]?: string;
    [ApiHeaderKey.editframeClientId]: string;
    [ApiHeaderKey.userAgent]?: string;
    [ApiHeaderKey.xRequestedWith]?: string;
};
declare type HeaderOption = {
    headers?: Record<string, string>;
};
export interface FormDataInterface {
    append: (key: string, value: any, options?: FormData.AppendOptions | string) => void;
}
export declare type FetchOptions = Omit<RequestInit, 'headers'> & HeaderOption & {
    url: string;
};
export declare enum HTTPMethod {
    delete = "delete",
    get = "get",
    post = "post",
    put = "put"
}
export declare type Fetcher = (options?: FetchOptions) => Promise<Response>;
export declare type FetchFunction = (args: {
    data?: any;
    headers?: ApiHeaders;
    method?: HTTPMethod;
    url: string;
}) => Promise<unknown>;
export declare type MakeFetchFunction = (fetcher: Fetcher) => FetchFunction;
export {};
