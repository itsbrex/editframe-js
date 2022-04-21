import { ApiApplication, ApiApplicationKey, Paginated, PrimitiveType } from 'constant'
import { assertType } from 'utils/validation'
import { isPaginated } from 'utils/validation/pagination'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isApplication = (application: any): application is ApiApplication =>
  ApiApplicationKey.description in application &&
  assertType(application.description, PrimitiveType.string) &&
  ApiApplicationKey.id in application &&
  assertType(application.id, PrimitiveType.string) &&
  ApiApplicationKey.name in application &&
  assertType(application.name, PrimitiveType.string) &&
  ApiApplicationKey.webhook in application &&
  assertType(application.webhook, PrimitiveType.string)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isApplications = (
  paginatedApplications: Paginated<any>
): paginatedApplications is Paginated<ApiApplication> =>
  isPaginated<ApiApplication>(paginatedApplications, isApplication)
