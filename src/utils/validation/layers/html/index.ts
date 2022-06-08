import { HtmlKey, HtmlLayer, LayerKey, LayerValidator, PrimitiveType } from 'constant'
import { CompositionErrorText, ValidationErrorText } from 'strings'
import { filterUndefined, validateLayer, validateValueIsOfType } from 'utils/validation'
import { validatePosition, validateSize, validateTimeline, validateTrim } from 'utils/validation/layerConfigs'

export const validateHtml: LayerValidator<HtmlLayer> = ({
  callerName,
  layer: {
    html: { page, url, withTransparentBackground },
  },
}) => {
  const errors: string[] = []

  if (!page && !url) {
    errors.push(CompositionErrorText.htmlPageOrUrlRequired)
  }

  errors.push(
    validateValueIsOfType(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.html, HtmlKey.page),
      page,
      PrimitiveType.string
    )
  )
  errors.push(
    validateValueIsOfType(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.html, HtmlKey.withTransparentBackground),
      withTransparentBackground,
      PrimitiveType.boolean
    )
  )
  errors.push(
    validateValueIsOfType(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.html, HtmlKey.url),
      url,
      PrimitiveType.string
    )
  )

  return errors.filter(filterUndefined)
}

export const validateHtmlLayer = (callerName: string, layer: HtmlLayer): void =>
  validateLayer<HtmlLayer>(
    [validatePosition, validateSize, validateTimeline, validateTrim, validateHtml],
    callerName,
    layer
  )
