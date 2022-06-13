import { Color, WaveformOptions, WaveformStyleValue } from 'constant/shared'

export enum WaveformMethod {
  setBackgroundColor = 'setBackgroundColor',
  setColor = 'setColor',
  setStyle = 'setStyle',
}

export const defaultWaveformOptions: WaveformOptions = {
  backgroundColor: Color.transparent,
  color: Color.white,
  style: WaveformStyleValue.bars,
}
