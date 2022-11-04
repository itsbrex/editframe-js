import { HtmlKey, HtmlLayer, HtmlPage, HtmlPageKey, LayerKey, LayerValidator, PrimitiveType } from 'constant'
import { CompositionErrorText, ValidationErrorText } from 'strings'
import { filterUndefined, validateLayer, validateValueIsOfType } from 'utils/validation'
import { validatePosition, validateSize, validateTimeline, validateTrim } from 'utils/validation/layerConfigs'

export const validateHtmlPage = (callerName: string, page: HtmlPage): string[] => {
  const errors: string[] = []

  errors.push(
    validateValueIsOfType(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.html, ValidationErrorText.SUB_FIELD(HtmlKey.page, HtmlPageKey.body)),
      page?.body,
      PrimitiveType.string
    )
  )
  errors.push(
    validateValueIsOfType(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.html, ValidationErrorText.SUB_FIELD(HtmlKey.page, HtmlPageKey.styles)),
      page?.styles,
      PrimitiveType.string
    )
  )

  return errors
}

export const validateHtml: LayerValidator<HtmlLayer> = ({
  callerName,
  layer: {
    html: { page, url, withTailwind, withTransparentBackground },
  },
}) => {
  const errors: string[] = []

  if (!page && !url) {
    errors.push(CompositionErrorText.htmlPageOrUrlRequired)
  }

  const pageErrors = validateHtmlPage(callerName, page)

  pageErrors.forEach((error) => errors.push(error))

  errors.push(
    validateValueIsOfType(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.html, HtmlKey.withTailwind),
      withTailwind,
      PrimitiveType.boolean
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
