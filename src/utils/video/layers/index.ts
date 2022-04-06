import {
  AudioLayer,
  FilterLayer,
  HTMLAttribute,
  LayerAlignment,
  LayerAttribute,
  LayerBase,
  LayerFormat,
  LayerFormatValue,
  LayerHTML,
  LayerHorizontalAlignment,
  LayerHorizontalAlignmentValue,
  LayerLottie,
  LayerPositionableMedia,
  LayerSubtitles,
  LayerText,
  LayerTrim,
  LayerVerticalAlignment,
  LayerVerticalAlignmentValue,
  LayerVisualMedia,
  LayerWaveform,
  PrimitiveType,
  SubtitlesAttribute,
  TextAlignment,
  TextAlignmentValue,
  WaveformAttribute,
  WaveformStyleValue,
  X,
  Y,
} from 'constant'
import { CompositionErrorText, ValidationErrorText } from 'strings'
import { validateValueIsOfType } from 'utils/validation'
import { validateFilter } from 'utils/video/filters'

const filterUndefined = (maybeUndefined: unknown) => maybeUndefined !== undefined

export const validateLayerAlignment = (
  callerName: string,
  { horizontalAlignment, verticalAlignment }: LayerAlignment
): string[] => {
  const errors: string[] = []

  errors.push(validateHorizontalAlignment(callerName, LayerAttribute.horizontalAlignment, horizontalAlignment))
  errors.push(validateVerticalAlignment(callerName, LayerAttribute.verticalAlignment, verticalAlignment))

  return errors.filter(filterUndefined)
}

export const validateLayerAudio = (callerName: string, options: AudioLayer): string[] => {
  const errors: string[] = []

  errors.push(validateValueIsOfType(callerName, LayerAttribute.volume, options.volume, PrimitiveType.number))

  return errors.filter(filterUndefined)
}

export const validateLayerBase = (callerName: string, { start }: LayerBase): string[] => {
  const errors: string[] = []

  errors.push(validateValueIsOfType(callerName, LayerAttribute.start, start, PrimitiveType.number))

  return errors.filter(filterUndefined)
}

export const validateLayerHTML = (
  callerName: string,
  { html: { page, url, withTransparentBackground } }: LayerHTML
): string[] => {
  const errors: string[] = []

  if (!page && !url) {
    errors.push(CompositionErrorText.htmlPageOrURLRequired)
  }

  errors.push(
    validateValueIsOfType(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerAttribute.html, HTMLAttribute.page),
      page,
      PrimitiveType.string
    )
  )
  errors.push(
    validateValueIsOfType(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerAttribute.html, HTMLAttribute.withTransparentBackground),
      withTransparentBackground,
      PrimitiveType.boolean
    )
  )
  errors.push(
    validateValueIsOfType(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerAttribute.html, HTMLAttribute.url),
      url,
      PrimitiveType.string
    )
  )

  return errors.filter(filterUndefined)
}

export const validateLayerFilter = (callerName: string, { filter }: FilterLayer): string[] => {
  const errors: string[] = []

  if (filter) {
    validateFilter(callerName, LayerAttribute.filter, filter).forEach((error) => errors.push(error))
  }

  return errors.filter(filterUndefined)
}

export const validateFormat = (callerName: string, layerAttribute: string, format: LayerFormat): string | undefined => {
  const acceptedFormats = Object.values(LayerFormatValue)

  if (format && !acceptedFormats.includes(format)) {
    return ValidationErrorText.MUST_BE_TYPE(callerName, layerAttribute, format, acceptedFormats.join(', '))
  }

  return undefined
}

export const validateHorizontalAlignment = (
  callerName: string,
  layerAttribute: string,
  horizontalAlignment: LayerHorizontalAlignment
): string | undefined => {
  const acceptedHorizontalValues = Object.values(LayerHorizontalAlignmentValue)

  if (horizontalAlignment && !acceptedHorizontalValues.includes(horizontalAlignment)) {
    return ValidationErrorText.MUST_BE_TYPE(
      callerName,
      layerAttribute,
      horizontalAlignment,
      acceptedHorizontalValues.join(', ')
    )
  }

  return undefined
}

export const validateVerticalAlignment = (
  callerName: string,
  layerAttribute: string,
  verticalAlignment: LayerVerticalAlignment
): string | undefined => {
  const acceptedVerticalValues = Object.values(LayerVerticalAlignmentValue)

  if (verticalAlignment && !acceptedVerticalValues.includes(verticalAlignment)) {
    return ValidationErrorText.MUST_BE_TYPE(
      callerName,
      layerAttribute,
      verticalAlignment,
      acceptedVerticalValues.join(', ')
    )
  }

  return undefined
}

export const validateX = (callerName: string, x: X): string | undefined => {
  if (!x) {
    return undefined
  }

  if (typeof x === PrimitiveType.string) {
    return validateHorizontalAlignment(callerName, LayerAttribute.x, x as LayerHorizontalAlignment)
  } else {
    return validateValueIsOfType(callerName, LayerAttribute.x, x, PrimitiveType.number)
  }
}

export const validateY = (callerName: string, y: Y): string | undefined => {
  if (!y) {
    return undefined
  }

  if (typeof y === PrimitiveType.string) {
    return validateVerticalAlignment(callerName, LayerAttribute.y, y as LayerVerticalAlignment)
  } else {
    return validateValueIsOfType(callerName, LayerAttribute.y, y, PrimitiveType.number)
  }
}

export const validateTextAlignment = (callerName: string, textAlign: TextAlignment): string | undefined => {
  const acceptedHorizontalValues = Object.values(TextAlignmentValue)

  if (textAlign && !acceptedHorizontalValues.includes(textAlign)) {
    return ValidationErrorText.MUST_BE_TYPE(
      callerName,
      LayerAttribute.textAlign,
      textAlign,
      acceptedHorizontalValues.join(', ')
    )
  }

  return undefined
}

export const validateLayerLottie = (callerName: string, { data }: LayerLottie): string[] => {
  const errors: string[] = []

  errors.push(validateValueIsOfType(callerName, LayerAttribute.data, data, PrimitiveType.object))

  return errors.filter(filterUndefined)
}

export const validateLayerPositionableMedia = (callerName: string, { x, y }: LayerPositionableMedia): string[] => {
  const errors: string[] = []

  errors.push(validateX(callerName, x))
  errors.push(validateY(callerName, y))

  return errors.filter(filterUndefined)
}

export const validateLayerSubtitles = (
  callerName: string,
  { subtitles: { backgroundColor, color, fontSize } }: LayerSubtitles
): string[] => {
  const errors: string[] = []

  errors.push(
    validateValueIsOfType(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerAttribute.subtitles, SubtitlesAttribute.backgroundColor),
      backgroundColor,
      PrimitiveType.string
    )
  )
  errors.push(
    validateValueIsOfType(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerAttribute.subtitles, SubtitlesAttribute.color),
      color,
      PrimitiveType.string
    )
  )
  errors.push(
    validateValueIsOfType(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerAttribute.subtitles, SubtitlesAttribute.fontSize),
      fontSize,
      PrimitiveType.number
    )
  )

  return errors.filter(filterUndefined)
}

export const validateLayerText = (
  callerName: string,
  { color, fontFamily, fontSize, maxFontSize, maxHeight, maxWidth, text, textAlign }: LayerText
): string[] => {
  const errors: string[] = []

  errors.push(validateValueIsOfType(callerName, LayerAttribute.color, color, PrimitiveType.string))
  errors.push(validateValueIsOfType(callerName, LayerAttribute.fontFamily, fontFamily, PrimitiveType.string))
  errors.push(validateValueIsOfType(callerName, LayerAttribute.fontSize, fontSize, PrimitiveType.number))
  errors.push(validateValueIsOfType(callerName, LayerAttribute.maxFontSize, maxFontSize, PrimitiveType.number))
  errors.push(validateValueIsOfType(callerName, LayerAttribute.maxHeight, maxHeight, PrimitiveType.number))
  errors.push(validateValueIsOfType(callerName, LayerAttribute.maxWidth, maxWidth, PrimitiveType.number))
  errors.push(validateValueIsOfType(callerName, LayerAttribute.text, text, PrimitiveType.string))
  errors.push(validateTextAlignment(callerName, textAlign))

  return errors.filter(filterUndefined)
}

export const validateLayerTrim = (callerName: string, { trim }: LayerTrim): string[] => {
  const errors: string[] = []

  errors.push(
    validateValueIsOfType(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerAttribute.trim, LayerAttribute.start),
      trim?.start,
      PrimitiveType.number
    )
  )

  errors.push(
    validateValueIsOfType(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerAttribute.trim, LayerAttribute.end),
      trim?.end,
      PrimitiveType.number
    )
  )

  return errors.filter(filterUndefined)
}

export const validateLayerVisualMedia = (
  callerName: string,
  { backgroundColor, format, x, y }: LayerVisualMedia
): string[] => {
  const errors: string[] = []

  errors.push(validateValueIsOfType(callerName, LayerAttribute.backgroundColor, backgroundColor, PrimitiveType.string))
  errors.push(validateFormat(callerName, LayerAttribute.format, format))
  errors.push(validateX(callerName, x))
  errors.push(validateY(callerName, y))

  return errors.filter(filterUndefined)
}

export const validateLayerWaveform = (
  callerName: string,
  { waveform: { backgroundColor, color, style } }: LayerWaveform
): string[] => {
  const errors: string[] = []

  errors.push(
    validateValueIsOfType(callerName, WaveformAttribute.backgroundColor, backgroundColor, PrimitiveType.string)
  )
  errors.push(validateValueIsOfType(callerName, WaveformAttribute.color, color, PrimitiveType.string))
  errors.push(validateValueIsOfType(callerName, WaveformAttribute.style, style, PrimitiveType.string))

  const acceptedWaveformStyles = Object.values(WaveformStyleValue)

  if (style && !acceptedWaveformStyles.includes(style)) {
    errors.push(
      ValidationErrorText.MUST_BE_TYPE(callerName, WaveformAttribute.style, style, acceptedWaveformStyles.join(', '))
    )
  }

  return errors.filter(filterUndefined)
}
