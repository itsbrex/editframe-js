import { Background, Color } from 'constant/shared'

export enum BackgroundMethod {
  setBackgroundColor = 'setBackgroundColor',
  setBackgroundOpacity = 'setBackgroundOpacity',
}

export const defaultBackground: Background = { background: { color: Color.transparent, opacity: 1 } }
