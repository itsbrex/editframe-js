import { compile } from 'path-to-regexp'
import queryString from 'query-string'

import { PaginationQueryParam } from 'constant'

const compilePath = (path: string): ((params: any, options: any) => string) => compile(path)

// This function is copied from react-router-dom
export const generatePath = (path = '/', params = {}): string =>
  path === '/' ? path : compilePath(path)(params, { pretty: true })

export const stripQueryParams = (url: string): string => {
  const stripped = new URL(url)

  stripped.hash = ''
  stripped.search = ''

  return stripped.toString()
}

export const withQueryParams = (path: string, params: Record<string, string | number | undefined>): string => {
  const queryParams = queryString.stringify(params)

  return `${path}${queryParams ? `?${queryParams}` : ''}`
}

export const withPaginationQueryParams = (path: string, page: number, perPage: number): string =>
  withQueryParams(path, {
    [PaginationQueryParam.page]: page,
    [PaginationQueryParam.perPage]: perPage,
  })
