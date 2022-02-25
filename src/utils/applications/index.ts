import { Application, ApplicationAttribute } from 'constant'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isApplication = (application: any): application is Application =>
  ApplicationAttribute.description in application &&
  ApplicationAttribute.lastUsedAt in application &&
  ApplicationAttribute.name in application &&
  ApplicationAttribute.webhook in application

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isApplications = (applications: any): applications is Application[] => isApplication(applications[0])
