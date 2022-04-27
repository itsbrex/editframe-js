import {
  Paginated,
  PaginationKey,
  PaginationLinkKey,
  PaginationLinks,
  PaginationMeta,
  PaginationMetaKey,
  PaginationMetaLink,
  PaginationMetaLinkKey,
  PrimitiveType,
} from 'constant'
import { assertType } from 'utils/validation'

const isPaginationLinks = (paginationLinks: any): paginationLinks is PaginationLinks =>
  PaginationLinkKey.first in paginationLinks &&
  assertType(paginationLinks.first, PrimitiveType.string) &&
  PaginationLinkKey.last in paginationLinks &&
  assertType(paginationLinks.last, PrimitiveType.string)

const isPaginationMetaLink = (paginationMetaLink: any): paginationMetaLink is PaginationMetaLink =>
  PaginationMetaLinkKey.active in paginationMetaLink &&
  assertType(paginationMetaLink.active, PrimitiveType.boolean) &&
  PaginationMetaLinkKey.label in paginationMetaLink &&
  assertType(paginationMetaLink.label, PrimitiveType.string)

const isPaginationMeta = (paginationMeta: any): paginationMeta is PaginationMeta =>
  PaginationMetaKey.currentPage in paginationMeta &&
  assertType(paginationMeta.currentPage, PrimitiveType.number) &&
  PaginationMetaKey.from in paginationMeta &&
  assertType(paginationMeta.from, [PrimitiveType.number, PrimitiveType.null]) &&
  PaginationMetaKey.lastPage in paginationMeta &&
  assertType(paginationMeta.lastPage, PrimitiveType.number) &&
  PaginationMetaKey.links in paginationMeta &&
  paginationMeta.links.every(isPaginationMetaLink) &&
  PaginationMetaKey.path in paginationMeta &&
  assertType(paginationMeta.path, PrimitiveType.string) &&
  PaginationMetaKey.perPage in paginationMeta &&
  assertType(paginationMeta.perPage, PrimitiveType.string) &&
  PaginationMetaKey.to in paginationMeta &&
  assertType(paginationMeta.to, [PrimitiveType.number, PrimitiveType.null]) &&
  PaginationMetaKey.total in paginationMeta &&
  assertType(paginationMeta.total, PrimitiveType.number)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isPaginated = <T>(paginated: any, isPaginationData: (data: any) => data is T): paginated is Paginated<T> =>
  PaginationKey.data in paginated &&
  Array.isArray(paginated.data) &&
  (paginated.data.length > 0 ? paginated.data.every(isPaginationData) : true) &&
  PaginationKey.links in paginated &&
  isPaginationLinks(paginated.links) &&
  PaginationKey.meta in paginated &&
  isPaginationMeta(paginated.meta)
