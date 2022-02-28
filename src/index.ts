import { Api } from 'api'
import { Applications, Videos } from 'features'
import { EditframeErrorText } from 'strings'
import { baseURL, initializeFetchUtil } from 'utils'

interface EditframeConfig {
  clientId: string
  host?: string
  log?: boolean
  token: string
  version?: number
}

export class Editframe {
  public applications: Applications
  public videos: Videos
  private _api: Api
  private _clientId: string
  private _host: string
  private _token: string
  private _version: number

  constructor({ clientId, host = 'https://api.editframe.com', token, version = 2 }: EditframeConfig) {
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
