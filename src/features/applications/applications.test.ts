import { ApiApplication, ApiInterface, Routes } from 'constant'
import { mockApplication } from 'mocks'
import { ApplicationErrorText } from 'strings'
import { generatePath } from 'utils'

import { Applications } from './'

describe('Applications', () => {
  const applicationMock = mockApplication()
  const applicationsMock: ApiApplication[] = [applicationMock]

  let apiMock: ApiInterface = {
    get: jest.fn().mockReturnValue(applicationsMock),
    post: jest.fn(),
    put: jest.fn(),
  }
  let applications: Applications
  let consoleErrorSpy: jest.SpyInstance

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  describe('all', () => {
    beforeEach(() => {
      applications = new Applications(apiMock)
    })

    it('makes a `get` request to the api with the correct arguments', async () => {
      await applications.all()

      expect(apiMock.get).toHaveBeenCalledWith({ url: Routes.applications.all })
    })

    describe('when the api response is malformed', () => {
      beforeEach(() => {
        apiMock = {
          get: jest.fn().mockReturnValue([{}]),
          post: jest.fn(),
          put: jest.fn(),
        }

        applications = new Applications(apiMock)
      })

      it('logs the correct error to the console', async () => {
        await applications.all()
        expect(consoleErrorSpy).toHaveBeenCalledWith(ApplicationErrorText.get(ApplicationErrorText.malformedResponse))
      })

      it('returns an empty array', async () => {
        expect(await applications.all()).toEqual([])
      })
    })
  })

  describe('get', () => {
    beforeEach(() => {
      applications = new Applications(apiMock)
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    })

    it('makes a `get` request to the api with the correct arguments', async () => {
      await applications.get(applicationMock.id)

      expect(apiMock.get).toHaveBeenCalledWith({
        url: generatePath(Routes.applications.get, { id: applicationMock.id }),
      })
    })

    describe('when the api response is malformed', () => {
      beforeEach(() => {
        apiMock = {
          get: jest.fn().mockReturnValue([{}]),
          post: jest.fn(),
          put: jest.fn(),
        }

        applications = new Applications(apiMock)
      })

      it('logs the correct error to the console', async () => {
        await applications.get(applicationMock.id)
        expect(consoleErrorSpy).toHaveBeenCalledWith(ApplicationErrorText.get(ApplicationErrorText.malformedResponse))
      })

      it('returns `undefined`', async () => {
        expect(await applications.get(applicationMock.id)).toBeUndefined()
      })
    })
  })
})
