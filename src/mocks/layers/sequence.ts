import { SequenceLayer, SequenceLayerConfig } from 'constant'
import { defaultTimelineOptions } from 'mocks/layerConfigs'

export const mockSequenceLayerConfig = (
  { timeline = defaultTimelineOptions }: SequenceLayerConfig = {
    timeline: defaultTimelineOptions,
  }
): SequenceLayerConfig => ({
  timeline,
})

export const mockSequenceLayer = (): SequenceLayer => mockSequenceLayerConfig()
