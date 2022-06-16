import { ColorTranslator } from 'colortranslator'

import { Color } from 'constant'

export const translateColor = (color: string): string =>
  color === Color.transparent ? Color.transparent : ColorTranslator.toHEXA(color)
