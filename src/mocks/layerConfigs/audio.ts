import { AudioKey, AudioOptions } from 'constant'

export const MockAudioOptionsValue = {
  [AudioKey.volume]: 1,
}

export const mockAudioOptions = ({
  volume = MockAudioOptionsValue.volume,
}: AudioOptions = MockAudioOptionsValue): AudioOptions => ({
  volume,
})
