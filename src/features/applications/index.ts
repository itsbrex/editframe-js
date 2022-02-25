import { ApiInterface, Application, Routes } from 'constant'
import { ApplicationErrorText } from 'strings'
import { generatePath, isApplication, isApplications } from 'utils'

export class Applications {
  private _api: ApiInterface

  constructor(api: ApiInterface) {
    this._api = api
  }

  async all(): Promise<Application[]> {
    try {
      const applications = await this._api.get({ url: Routes.applications.all })

      if (applications && isApplications(applications)) {
        return applications
      }

      throw new Error(ApplicationErrorText.malformedResponse)
    } catch (error) {
      console.error(ApplicationErrorText.get(error.message))
    }

    return []
  }

  async get(id: string): Promise<Application | undefined> {
    try {
      const application = await this._api.get({ url: generatePath(Routes.applications.get, { id }) })

      if (application && isApplication(application)) {
        return application
      }

      throw new Error(ApplicationErrorText.malformedResponse)
    } catch (error) {
      console.error(ApplicationErrorText.get(error.message))
    }

    return undefined
  }
}
