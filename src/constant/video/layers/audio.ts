import { AudioOptions } from 'constant/shared'

export enum AudioMethod {
  setVolume = 'setVolume',
}

export const defaultAudioOptions: AudioOptions = {
  volume: 1,
}
