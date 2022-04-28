import { SequenceLayer } from 'constant'
import { validateLayer } from 'utils/validation'
import { validateTimeline } from 'utils/validation/layerConfigs'

export const validateSequenceLayer = (callerName: string, layer: SequenceLayer): void =>
  validateLayer<SequenceLayer>([validateTimeline], callerName, layer)
