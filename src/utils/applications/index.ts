import { ApiApplication, ApiApplicationAttribute } from 'constant'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isApplication = (application: any): application is ApiApplication =>
  ApiApplicationAttribute.description in application &&
  ApiApplicationAttribute.lastUsedAt in application &&
  ApiApplicationAttribute.name in application &&
  ApiApplicationAttribute.webhook in application

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isApplications = (applications: any): applications is ApiApplication[] => isApplication(applications[0])
