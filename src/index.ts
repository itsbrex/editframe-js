import { Api } from 'api'
import { CommonResolution, EditframeOptions, defaultHost } from 'constant'
import { Applications, Videos } from 'features'
import { EditframeErrorText } from 'strings'
import { baseURL, initializeFetchUtil } from 'utils'

export class Editframe {
  public applications: Applications
  public videos: Videos
  private _api: Api
  private _clientId: string
  private _host: string
  private _token: string
  private _version: number

  constructor({ clientId, host = defaultHost, token, version = 2 }: EditframeOptions) {
    if (!clientId || !token) {
      throw new Error(EditframeErrorText.clientIdAndTokenRequired)
    }

    this._api = new Api({
      clientId,
      fetch: initializeFetchUtil(baseURL(host, version)),
      host,
      token,
      version,
    })
    this._clientId = clientId
    this._host = host
    this._token = token
    this._version = version
    this.applications = new Applications(this._api)
    this.videos = new Videos(this._api)
  }

  public get clientId(): string {
    return this._clientId
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
