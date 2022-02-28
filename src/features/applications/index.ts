import { ApiApplication, ApiInterface, Routes } from 'constant'
import { ApplicationErrorText } from 'strings'
import { generatePath, isApplication, isApplications, validateApiData } from 'utils'

export class Applications {
  private _api: ApiInterface

  constructor(api: ApiInterface) {
    this._api = api
  }

  async all(): Promise<ApiApplication[]> {
    try {
      const data = await this._api.get({ url: Routes.applications.all })

      return validateApiData<ApiApplication[]>(data, {
        invalidDataError: ApplicationErrorText.malformedResponse,
        validate: isApplications,
      })
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
