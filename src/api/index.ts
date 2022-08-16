import FormData from 'form-data'

import { ApiInterface, ApiOptions, FetchFunction, HTTPMethod } from 'constant'
import { makeHeaders } from 'utils'

export class Api implements ApiInterface {
  private _options: ApiOptions
  private _fetch: FetchFunction

  constructor(options: ApiOptions) {
    this._options = { ...options }
    this._fetch = options.fetch
  }

  public async get({ url }: { url: string }): Promise<unknown> {
    return await this._fetch({ headers: makeHeaders(this._options), url })
  }

  public async post({
    data,
    isForm = false,
    url,
  }: {
    data: FormData | Record<string, any>
    isForm: boolean
    url: string
  }): Promise<unknown> {
    return await this._fetch({
      data,
      headers: makeHeaders({ ...this._options, isForm }),
      method: HTTPMethod.post,
      url,
    })
  }

  public async put({
    data,
    isForm = false,
    url,
  }: {
    data: FormData | Record<string, any>
    isForm: boolean
    url: string
  }): Promise<unknown> {
    return await this._fetch({
      data,
      headers: makeHeaders({ ...this._options, isForm }),
      method: HTTPMethod.put,
      url,
    })
  }
}
