import { HtmlOptions } from 'constant/shared'

export enum HtmlMethod {
  setHtmlOptions = 'setHtmlOptions',
  setPage = 'setPage',
  setUrl = 'setUrl',
  setWithTransparentBackground = 'setWithTransparentBackground',
}

export const defaultHtmlOptions: HtmlOptions = {
  page: null,
  url: null,
  withTransparentBackground: false,
}
