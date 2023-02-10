import { Api } from 'api'
import { CommonResolution, EditframeOptions, defaultHost } from 'constant'
import { Applications, Videos } from 'features'
import { baseUrl, initializeFetchUtil } from 'utils'

export class Editframe {
  public applications: Applications
  public videos: Videos
  private _api: Api
  private _host: string
  private _token: string
  private _version: number

  constructor({ develop = false, host = defaultHost, token, version = 2 }: EditframeOptions) {
    this._api = new Api({
      fetch: initializeFetchUtil(baseUrl(host, version)),
      host,
      token,
      version,
    })
    this._host = host
    this._token = token
    this._version = version
    this.applications = new Applications(this._api)
    this.videos = new Videos({ api: this._api, develop, host: this._host })
  }
  
  public get host(): string {
    return this._host
  }

  public get token(): string {
    return this._token
  }

  public get version(): number {
    return this._version
  }
}

export const CommonResolutions = CommonResolution
