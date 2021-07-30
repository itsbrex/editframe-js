import Applications from './applications'
import Videos from './videos'

/**
 * Configuration options for `Editframe` class constructor.
 */
type EditframeConfig = {
  clientId: string
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
  private _token: string
  private _version: number

  /**
   * Constructs a new instance of an Editframe client.
   * @param configuration options
   */
  constructor({ clientId, token, version = 2 }: EditframeConfig) {
    this._clientId = clientId
    this._token = token
    this._version = version
    this.applications = new Applications({ clientId, token, version })
    this.videos = new Videos({ clientId, token, version })
    this.Application = this.applications
    this.Video = this.videos
  }

  public get clientId() : string {
    return this._clientId
  }

  public get token() : string {
    return this._token
  }

  public get version() : number {
    return this._version
  }

  initialize({ clientId, token, version = 2 }: EditframeConfig) {
    this._clientId = clientId
    this._token = token
    this._version = version
    this.applications = new Applications({ clientId, token, version })
    this.videos = new Videos({ clientId, token, version })
  }
  
}

export default Editframe
