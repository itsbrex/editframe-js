import { Mixin } from 'ts-mixer'

import {
  ChildKey,
  CompositionInterface,
  HtmlKey,
  HtmlMethod,
  LayerAttributeValue,
  LayerKey,
  LayerType,
  PrimitiveType,
} from 'constant'
import { PositionMixin } from 'features/videos/mixins/positionMixin'
import { SizeMixin } from 'features/videos/mixins/sizeMixin'
import { TimelineMixin } from 'features/videos/mixins/timelineMixin'
import { TransitionsMixin } from 'features/videos/mixins/transitionMixin'
import { TrimMixin } from 'features/videos/mixins/trimMixin'
import { sanitizeHtml, validateValueIsOfType, withValidation, withValidationAsync } from 'utils'

export class Html extends Mixin(PositionMixin, SizeMixin, TimelineMixin, TransitionsMixin, TrimMixin) {
  constructor({ composition, id }: { composition: CompositionInterface; id: string }) {
    super({ composition, id })
  }

  get type(): LayerType {
    return LayerType.html
  }

  get page(): string | undefined {
    return this._getHtmlAttribute<string | undefined>(HtmlKey.page)
  }

  get url(): string | undefined {
    return this._getHtmlAttribute<string | undefined>(HtmlKey.url)
  }

  get withTransparentBackground(): boolean {
    return this._getHtmlAttribute<boolean>(HtmlKey.withTransparentBackground)
  }

  public async [HtmlMethod.setPage](page?: string): Promise<this> {
    return withValidationAsync<this>(
      () => validateValueIsOfType(HtmlMethod.setPage, HtmlKey.page, page, PrimitiveType.string, true),
      async () => {
        this.setHtmlAttribute(HtmlKey.url, undefined)
        return this.setHtmlAttribute(HtmlKey.page, await sanitizeHtml(page))
      }
    )
  }

  public [HtmlMethod.setUrl](url?: string): this {
    return withValidation<this>(
      () => validateValueIsOfType(HtmlMethod.setUrl, HtmlKey.url, url, PrimitiveType.string, true),
      () => {
        this.setHtmlAttribute(HtmlKey.page, undefined)
        return this.setHtmlAttribute(HtmlKey.url, url)
      }
    )
  }

  public [HtmlMethod.setWithTransparentBackground](withTransparentBackground: boolean): this {
    return this.setHtmlAttribute(HtmlKey.withTransparentBackground, withTransparentBackground)
  }

  private _getHtmlAttribute<AttributeValue>(childKey: ChildKey): AttributeValue {
    return this.getAttribute<AttributeValue>({ childKey, layerKey: LayerKey.html })
  }

  private setHtmlAttribute(childKey: ChildKey, value: LayerAttributeValue): this {
    return this.setAttribute({ childKey, layerKey: LayerKey.html, value })
  }
}
