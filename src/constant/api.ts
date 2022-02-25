import FormData from 'form-data'

export const defaultHost = 'https://api.editframe.com'

export interface ApiInterface {
  get: ({ url }: { url: string }) => Promise<unknown>
  post: ({
    data,
    isForm,
    url,
  }: {
    data: FormData | Record<string, any>
    isForm: boolean
    url: string
  }) => Promise<unknown>
  put: ({
    data,
    isForm,
    url,
  }: {
    data: FormData | Record<string, any>
    isForm: boolean
    url: string
  }) => Promise<unknown>
}

export type ApiOptions = {
  clientId: string
  fetch: MakeRequest
  host?: string
  token: string
  version?: number
}

export enum ApiHeaderKey {
  accept = 'Accept',
  authorization = 'Authorization',
  contentType = 'Content-Type',
  editframeClientId = 'Editframe-Client-Id',
  userAgent = 'User-Agent',
  xRequestedWith = 'X-Requested-With',
}

export enum ApiHeaderValue {
  bearer = 'Bearer ',
  editframeJs = 'editframe.js/',
  xRequestedWithXML = 'XMLHttpRequest',
}

export type ApiHeaders = Record<string, string> & {
  [ApiHeaderKey.accept]?: string
  [ApiHeaderKey.authorization]: string
  [ApiHeaderKey.contentType]?: string
  [ApiHeaderKey.editframeClientId]: string
  [ApiHeaderKey.userAgent]?: string
  [ApiHeaderKey.xRequestedWith]?: string
}

type HeaderOption = { headers?: Record<string, string> }

export interface FormDataInterface {
  append: (key: string, value: any, options?: FormData.AppendOptions | string) => void
}

export type FetchOptions = Omit<RequestInit, 'headers'> & HeaderOption

export enum HTTPMethod {
  delete = 'delete',
  get = 'get',
  post = 'post',
  put = 'put',
}

export type MakeRequest = (args: {
  data?: any
  headers?: ApiHeaders
  method?: HTTPMethod
  url: string
}) => Promise<unknown>
