import {
  Paginated,
  PaginationAttribute,
  PaginationLinkAttribute,
  PaginationLinks,
  PaginationMeta,
  PaginationMetaAttribute,
  PaginationMetaLink,
  PaginationMetaLinkAttribute,
  PrimitiveType,
} from 'constant'
import { assertType } from 'utils/validation'

const isPaginationLinks = (paginationLinks: any): paginationLinks is PaginationLinks =>
  PaginationLinkAttribute.first in paginationLinks &&
  assertType(paginationLinks.first, PrimitiveType.string) &&
  PaginationLinkAttribute.last in paginationLinks &&
  assertType(paginationLinks.last, PrimitiveType.string)

const isPaginationMetaLink = (paginationMetaLink: any): paginationMetaLink is PaginationMetaLink =>
  PaginationMetaLinkAttribute.active in paginationMetaLink &&
  assertType(paginationMetaLink.active, PrimitiveType.boolean) &&
  PaginationMetaLinkAttribute.label in paginationMetaLink &&
  assertType(paginationMetaLink.label, PrimitiveType.string)

const isPaginationMeta = (paginationMeta: any): paginationMeta is PaginationMeta =>
  PaginationMetaAttribute.currentPage in paginationMeta &&
  assertType(paginationMeta.currentPage, PrimitiveType.number) &&
  PaginationMetaAttribute.from in paginationMeta &&
  assertType(paginationMeta.from, [PrimitiveType.number, PrimitiveType.null]) &&
  PaginationMetaAttribute.lastPage in paginationMeta &&
  assertType(paginationMeta.lastPage, PrimitiveType.number) &&
  PaginationMetaAttribute.links in paginationMeta &&
  paginationMeta.links.every(isPaginationMetaLink) &&
  PaginationMetaAttribute.path in paginationMeta &&
  assertType(paginationMeta.path, PrimitiveType.string) &&
  PaginationMetaAttribute.perPage in paginationMeta &&
  assertType(paginationMeta.perPage, PrimitiveType.string) &&
  PaginationMetaAttribute.to in paginationMeta &&
  assertType(paginationMeta.to, [PrimitiveType.number, PrimitiveType.null]) &&
  PaginationMetaAttribute.total in paginationMeta &&
  assertType(paginationMeta.total, PrimitiveType.number)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isPaginated = <T>(paginated: any, isPaginationData: (data: any) => data is T): paginated is Paginated<T> =>
  PaginationAttribute.data in paginated &&
  Array.isArray(paginated.data) &&
  (paginated.data.length > 0 ? paginated.data.every(isPaginationData) : true) &&
  PaginationAttribute.links in paginated &&
  isPaginationLinks(paginated.links) &&
  PaginationAttribute.meta in paginated &&
  isPaginationMeta(paginated.meta)
