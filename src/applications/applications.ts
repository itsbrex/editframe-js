import { Application } from '../types/application'
import { ApiOptions, ApiFetchOptions } from '../api/types'
import Api from '../api/api'

class Applications {
  private _api: Api

  /**
   * @ignore
   */
  constructor(options: ApiOptions) {
    this._api = new Api(options)
  }

  /**
   * Get all applications available to the authenticated user
   *
   * @example
   *
   * ```
   * const applications = await applications.all()
   * ```
   *
   */
  async all(options?: ApiFetchOptions): Promise<[Application] | undefined> {
    const response = await this._api.get('applications', options || {})
    return response.data
  }

  /**
   * Get specific application for authenticated user
   *
   * @example
   *
   * ```
   * const application = applications.get('yKOqd7QnJZ')
   * ```
   */
  async get(
    id: string,
    options?: ApiFetchOptions
  ): Promise<Application | undefined> {
    const response = await this._api.get(`applications/${id}`, options || {})
    return response.data
  }
}

export default Applications
