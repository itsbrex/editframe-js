export const PaginationPageSize = 15

export enum PaginationKey {
  data = 'data',
  links = 'links',
  meta = 'meta',
}

export enum PaginationLinkKey {
  first = 'first',
  last = 'last',
  next = 'next',
  prev = 'prev',
}

export enum PaginationMetaLinkKey {
  active = 'active',
  label = 'label',
  url = 'url',
}

export interface PaginationLinks {
  [PaginationLinkKey.first]: string
  [PaginationLinkKey.last]: string
  [PaginationLinkKey.next]?: string
  [PaginationLinkKey.prev]?: string
}

export enum PaginationMetaKey {
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
  [PaginationMetaLinkKey.active]: boolean
  [PaginationMetaLinkKey.label]: string
  [PaginationMetaLinkKey.url]?: string
}

export interface PaginationMeta {
  [PaginationMetaKey.currentPage]: number
  [PaginationMetaKey.from]: number
  [PaginationMetaKey.lastPage]: number
  [PaginationMetaKey.links]: PaginationMetaLink[]
  [PaginationMetaKey.path]: string
  [PaginationMetaKey.perPage]: string
  [PaginationMetaKey.to]: number
  [PaginationMetaKey.total]: number
}

export interface Paginated<Resource> {
  [PaginationKey.data]: Resource[]
  [PaginationKey.links]: PaginationLinks
  [PaginationKey.meta]: PaginationMeta
}

export enum PaginationQueryParam {
  page = 'page',
  perPage = 'per_page',
}
