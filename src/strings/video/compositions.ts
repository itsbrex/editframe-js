import colors from 'colors/safe'

export const CompositionErrorText = {
  dimensionsRequired: `\\${colors.white('dimensions')}\\ must be provided unless a \\${colors.white(
    'videoFile'
  )}\\ is provided`,
  durationRequired: `\\${colors.white('duration')}\\ must be provided unless a \\${colors.white(
    'videoFile'
  )}\\ is provided`,
  errorEncoding: (error: string): string => `Error encoding video: ${error}`,
  filterRequired: `\\${colors.white('filter')}\\ must be provided`,
  malformedEncodingResponse: `malformed ${colors.white('encoding')}\\ response`,
  textRequired: `\\${colors.white('text')}\\ field required`,
}
