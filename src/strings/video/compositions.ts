import chalk from 'chalk'

import { LayerKey, TrimKey } from 'constant'
import { ValidationErrorText } from 'strings/validation'

export const CompositionErrorText = {
  dataRequired: `\\${chalk.white('data')}\\ must be provided`,
  dimensionsRequired: `\\${chalk.white('dimensions')}\\ must be provided unless a \\${chalk.white(
    'videoFile'
  )}\\ is provided`,
  durationRequired: `\\${chalk.white(
    'duration'
  )}\\ must be provided unless composition is instantiated from a \\${chalk.white(
    'videoFile'
  )}\\ or calculated automatically via a call to \\${chalk.white('addSequence')}\\`,
  errorEncoding: (error: string): string => `Error encoding video: ${error}`,
  filterRequired: `\\${chalk.white('filter')}\\ must be provided`,
  htmlPageOrUrlRequired: `Either \\${chalk.white('page')}\\ or \\${chalk.white('url')}\\ must be provided`,
  malformedEncodingResponse: `malformed \\${chalk.white('encoding')}\\ response`,
  optionsRequired: `\\${chalk.white('options')}\\ must be provided`,
  textRequired: `\\${chalk.white('text')}\\ field required`,
  trimEndRequired: (layerType: string): string =>
    `layer \\${chalk.white(layerType)}\\ must provide \\${chalk.white(
      ValidationErrorText.SUB_FIELD(LayerKey.trim, TrimKey.end)
    )}\\ attribute in order to calculate position in sequence timeline automatically`,

  validationOptionsError: (errors: string): string => `Error: ${errors}`,
}
