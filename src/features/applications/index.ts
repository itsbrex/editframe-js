import { ApiApplication, ApiInterface, Paginated, Routes } from 'constant'
import { ApplicationErrorText } from 'strings'
import { generatePath, isApplication, isApplications, validateApiData, withPaginationQueryParams } from 'utils'

export class Applications {
  private _api: ApiInterface

  constructor(api: ApiInterface) {
    this._api = api
  }

  async all(page?: number, perPage?: number): Promise<ApiApplication[]> {
    try {
      const data = await this._api.get({ url: withPaginationQueryParams(Routes.applications.all, page, perPage) })

      return validateApiData<Paginated<ApiApplication>>(data, {
        invalidDataError: ApplicationErrorText.malformedResponse,
        validate: isApplications,
      }).data
    } catch (error) {
      console.error(ApplicationErrorText.get(error.message))
    }

    return []
  }

  async get(id: string): Promise<ApiApplication | undefined> {
    try {
      const data = await this._api.get({ url: generatePath(Routes.applications.get, { id }) })

      return validateApiData<ApiApplication>(data, {
        invalidDataError: ApplicationErrorText.malformedResponse,
        validate: isApplication,
      })
    } catch (error) {
      console.error(ApplicationErrorText.get(error.message))
    }

    return undefined
  }
}
