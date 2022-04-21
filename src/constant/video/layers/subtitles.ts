import { Color, SubtitlesOptions } from 'constant/shared'

export enum SubtitlesMethod {
  setBackgroundColor = 'setBackgroundColor',
  setColor = 'setColor',
  setFontSize = 'setFontSize',
  setSubtitlesOptions = 'setSubtitlesOptions',
}

export const defaultSubtitlesOptions: SubtitlesOptions = {
  backgroundColor: Color.black,
  color: Color.white,
  fontSize: 32,
}
