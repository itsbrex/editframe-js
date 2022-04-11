export const PaginationPageSize = 15

export enum PaginationAttribute {
  data = 'data',
  links = 'links',
  meta = 'meta',
}

export enum PaginationLinkAttribute {
  first = 'first',
  last = 'last',
  next = 'next',
  prev = 'prev',
}

export enum PaginationMetaLinkAttribute {
  active = 'active',
  label = 'label',
  url = 'url',
}

export interface PaginationLinks {
  [PaginationLinkAttribute.first]: string
  [PaginationLinkAttribute.last]: string
  [PaginationLinkAttribute.next]?: string
  [PaginationLinkAttribute.prev]?: string
}

export enum PaginationMetaAttribute {
  currentPage = 'currentPage',
  from = 'from',
  lastPage = 'lastPage',
  links = 'links',
  path = 'path',
  perPage = 'perPage',
  to = 'to',
  total = 'total',
}

export interface PaginationMetaLink {
  [PaginationMetaLinkAttribute.active]: boolean
  [PaginationMetaLinkAttribute.label]: string
  [PaginationMetaLinkAttribute.url]?: string
}

export interface PaginationMeta {
  [PaginationMetaAttribute.currentPage]: number
  [PaginationMetaAttribute.from]: number
  [PaginationMetaAttribute.lastPage]: number
  [PaginationMetaAttribute.links]: PaginationMetaLink[]
  [PaginationMetaAttribute.path]: string
  [PaginationMetaAttribute.perPage]: string
  [PaginationMetaAttribute.to]: number
  [PaginationMetaAttribute.total]: number
}

export interface Paginated<Resource> {
  [PaginationAttribute.data]: Resource[]
  [PaginationAttribute.links]: PaginationLinks
  [PaginationAttribute.meta]: PaginationMeta
}

export enum PaginationQueryParam {
  page = 'page',
  perPage = 'per_page',
}
