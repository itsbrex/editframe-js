import Applications from './applications'
import Videos from './videos'

/**
 * Configuration options for `Editframe` class constructor.
 */
type EditframeConfig = {
  clientId: string
  host?: string
  log?: boolean
  token: string
  version?: number
}

class Editframe {
  public Application: Applications
  public Video: Videos
  public applications: Applications
  public videos: Videos
  private _clientId: string
  private _host: string
  private _token: string
  private _version: number

  /**
   * Constructs a new instance of an Editframe client.
   * @param configuration options
   */
  constructor({
    clientId,
    host = 'https://api.editframe.com',
    token,
    version = 2
  }: EditframeConfig) {
    this._clientId = clientId
    this._host = host
    this._token = token
    this._version = version
    this.applications = new Applications({ clientId, host, token, version })
    this.videos = new Videos({ clientId, host, token, version })
    this.Application = this.applications
    this.Video = this.videos
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

export default Editframe
