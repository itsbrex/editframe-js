import { Mixin } from 'ts-mixer'

import { CompositionInterface, FilterOptions, LayerAttribute, PrimitiveType, VisualMediaMethod } from 'constant'
import { Media } from 'features/videos/media'
import { PositionableMedia } from 'features/videos/positionableMedia'
import { ResizableMedia } from 'features/videos/resizableMedia'
import { validateFilter, validateValueIsOfType, withValidation } from 'utils'

export class VisualMedia extends Mixin(Media, PositionableMedia, ResizableMedia) {
  constructor({ composition, id }: { composition: CompositionInterface; id: string }) {
    super({ composition, id })
  }

  public [VisualMediaMethod.setBackgroundColor](backgroundColor?: string): this | void {
    withValidation<this>(
      () =>
        validateValueIsOfType(
          VisualMediaMethod.setBackgroundColor,
          LayerAttribute.backgroundColor,
          backgroundColor,
          PrimitiveType.string,
          true
        ),
      () => this._updateAttribute(LayerAttribute.backgroundColor, backgroundColor)
    )
  }

  [VisualMediaMethod.setFilter]<FilterName extends keyof FilterOptions>({
    filterName,
    options,
  }: {
    filterName: FilterName
    options?: FilterOptions[FilterName]
  }): this | void {
    withValidation<this>(
      () => validateFilter(VisualMediaMethod.setFilter, LayerAttribute.filter, { filterName, options }, true),
      () =>
        this._updateAttribute(LayerAttribute.filter, {
          filterName,
          options,
        })
    )
  }
}
