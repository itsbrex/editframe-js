import colors from 'colors/safe'

import { LayerKey, TrimKey } from 'constant'
import { ValidationErrorText } from 'strings/validation'

export const CompositionErrorText = {
  dataRequired: `\\${colors.white('data')}\\ must be provided`,
  dimensionsRequired: `\\${colors.white('dimensions')}\\ must be provided unless a \\${colors.white(
    'videoFile'
  )}\\ is provided`,
  durationRequired: `\\${colors.white('duration')}\\ must be provided unless a \\${colors.white(
    'videoFile'
  )}\\ is provided`,
  errorEncoding: (error: string): string => `Error encoding video: ${error}`,
  filterRequired: `\\${colors.white('filter')}\\ must be provided`,
  htmlPageOrUrlRequired: `Either \\${colors.white('page')}\\ or \\${colors.white('url')}\\ must be provided`,
  malformedEncodingResponse: `malformed ${colors.white('encoding')}\\ response`,
  optionsRequired: `\\${colors.white('options')}\\ must be provided`,
  textRequired: `\\${colors.white('text')}\\ field required`,
  trimEndRequired: (layerType: string): string =>
    `layer \\${colors.white(layerType)}\\ must provide \\${colors.white(
      ValidationErrorText.SUB_FIELD(LayerKey.trim, TrimKey.end)
    )}\\ attribute in order to calculate position in sequence timeline automatically`,

  validationOptionsError: (errors: string): string => `Error: ${errors}`,
}
