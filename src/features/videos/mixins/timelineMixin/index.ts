import {
  ChildKey,
  CompositionInterface,
  LayerAttributeValue,
  LayerKey,
  TimelineKey,
  TimelineMethod,
  TimelineOptions,
} from 'constant'
import { Layer } from 'features/videos/layer'
import { validateTimelineMixin, withValidation } from 'utils'

export class TimelineMixin extends Layer {
  constructor({ composition, id }: { composition: CompositionInterface; id: string }) {
    super({ composition, id })
  }
  get timeline(): TimelineOptions {
    return this._composition.getLayerAttribute<TimelineOptions>({ id: this.id, layerKey: LayerKey.timeline })
  }
  get start(): number {
    return this._getTimelineAttribute<number>(TimelineKey.start)
  }

  [TimelineMethod.setStart](start = 0): this {
    return withValidation<this>(
      () => validateTimelineMixin(TimelineMethod.setStart, { timeline: { start } }),
      () => this._setTimelineAttribute(TimelineKey.start, start)
    )
  }

  private _getTimelineAttribute<AttributeValue>(childKey: ChildKey): AttributeValue {
    return this.getAttribute<AttributeValue>({ childKey, layerKey: LayerKey.timeline })
  }

  private _setTimelineAttribute(childKey: ChildKey, value: LayerAttributeValue): this {
    return this.setAttribute({ childKey, layerKey: LayerKey.timeline, value })
  }
}
