import { LayerKey, LayerValidator, PrimitiveType, Timeline, TimelineKey } from 'constant'
import { ValidationErrorText } from 'strings'
import { filterUndefined, validateLayer, validateValueIsOfType } from 'utils/validation'

export const validateTimeline: LayerValidator<Timeline> = ({
  callerName,
  layer: {
    timeline: { start },
  },
}) => {
  const errors: string[] = []

  errors.push(
    validateValueIsOfType(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.timeline, TimelineKey.start),
      start,
      PrimitiveType.number
    )
  )

  return errors.filter(filterUndefined)
}

export const validateTimelineMixin = (callerName: string, mixin: Timeline): void =>
  validateLayer<Timeline>([validateTimeline], callerName, mixin)
