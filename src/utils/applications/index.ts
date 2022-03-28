import { ApiApplication, ApiApplicationAttribute, Paginated, PrimitiveType } from 'constant'
import { isPaginated } from 'utils/pagination'
import { assertType } from 'utils/validation'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isApplication = (application: any): application is ApiApplication =>
  ApiApplicationAttribute.description in application &&
  assertType(application.description, PrimitiveType.string) &&
  ApiApplicationAttribute.id in application &&
  assertType(application.id, PrimitiveType.string) &&
  ApiApplicationAttribute.name in application &&
  assertType(application.name, PrimitiveType.string) &&
  ApiApplicationAttribute.webhook in application &&
  assertType(application.webhook, PrimitiveType.string)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isApplications = (
  paginatedApplications: Paginated<any>
): paginatedApplications is Paginated<ApiApplication> =>
  isPaginated<ApiApplication>(paginatedApplications, isApplication)
