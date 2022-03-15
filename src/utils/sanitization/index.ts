import he from 'he'
import imageToBase64 from 'image-to-base64'
import { JSDOM } from 'jsdom'

export const escapeHTML = (html: string): string => he.unescape(he.escape(html))

export const sanitizeHTML = async (html: string): Promise<string> => {
  const {
    window: { document },
  } = new JSDOM(html.slice())
  const scripts = document.getElementsByTagName('script')
  const images = document.querySelectorAll('img')

  for (const script of scripts as any as HTMLScriptElement[]) {
    script.remove()
  }

  for (const img of images as any as HTMLImageElement[]) {
    if (['.', '/'].includes(img.src[0])) {
      img.setAttribute('src', `data:image/png;base64,${await imageToBase64(img.src)}`)
    }
  }

  return escapeHTML(document.documentElement.outerHTML)
}
