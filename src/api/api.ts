import { ApiReadyStates, ApiOptions, ApiFetchOptions, ApiHeaders } from './types'
import fetchUtil from './fetch'
class Api {
  private _readyState: ApiReadyStates = ApiReadyStates.READY
  private _options: ApiOptions

  constructor(options: ApiOptions){
    this._options = options
  }

  get readyState() {
    return this._readyState
  }

  async get<T = any>(endpoint: string, options?: ApiFetchOptions) {
    return this._handleFetch<T>(endpoint, options)
  }

  async post<T = any>(endpoint: string, options?: ApiFetchOptions, isForm?: boolean) {
    return this._handleFetch<T>(endpoint, { ...options, method: 'post' }, isForm || false)
  }

  async put<T = any>(endpoint: string, options?: ApiFetchOptions) {
    return this._handleFetch<T>(endpoint, { ...options, method: 'put' })
  }

  private _getBaseUrl() {
    const version = this._options.version
    return `https://api.editframe.test/v${version}/`
  }

  private _getHeaders(): ApiHeaders {
    const { clientId, token } = this._options
    let headers = {
      'User-Agent' : 'editframe.js/1.0'
    }
    if (clientId) {
      headers['Editframe-Client-Id'] = clientId
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    return headers
  }

  private async _handleFetch<T = any>(
    url = '',
    options: ApiFetchOptions = {},
    isForm: boolean = false
  ) {
  
    const headers = this._getHeaders()
    const fqurl = `${this._getBaseUrl()}${url}`
  
    const performRequest = () =>
      fetchUtil<T>(fqurl, {
        ...options,
        headers
      }, isForm)
  
    try {
      return await performRequest()
    } catch (error) {
      throw error
    } finally {
      
    }
  }
}

export default Api