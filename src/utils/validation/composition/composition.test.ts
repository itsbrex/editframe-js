import { PassThrough } from 'stream'

import { ApiVideoMethod, CompositionKey, DimensionsKey, PrimitiveType } from 'constant'
import { mockCompositionOptions } from 'mocks'
import { MediaErrorText, ValidationErrorText } from 'strings'
import * as ValidationUtilsModule from 'utils/validation'

import { validateCompositionFile, validateCompositionOptions } from './'

describe('validations', () => {
  const callerName = 'caller-name'
  let validateValueIsOfTypeSpy: jest.SpyInstance

  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    validateValueIsOfTypeSpy = jest.spyOn(ValidationUtilsModule, 'validateValueIsOfType')
  })

  describe('validateCompositionFile', () => {
    describe('when no `file` is provided', () => {
      it('throws an error', () => {
        expect(() => validateCompositionFile(callerName, undefined)).toThrow(
          MediaErrorText.invalidFileSource(callerName)
        )
      })
    })

    describe('when a `string` is provided', () => {
      it('does not throw an error', () => {
        expect(() => validateCompositionFile(callerName, 'filename.mp3')).not.toThrow()
      })
    })

    describe('when a `Readable` is provided', () => {
      it('does not throw an error', () => {
        expect(() => validateCompositionFile(callerName, new PassThrough())).not.toThrow()
      })
    })

    describe('when a non-`string`, non-`Readable` is provided', () => {
      it('throws an error', () => {
        expect(() => validateCompositionFile(callerName, 5 as any)).toThrow(
          MediaErrorText.invalidFileSource(callerName)
        )
      })
    })
  })

  describe('validateCompositionOptions', () => {
    const compositionOptions = mockCompositionOptions()
    const { backgroundColor, dimensions } = compositionOptions

    it('calls the `validateValueIsOfType` function with the correct arguments', () => {
      validateCompositionOptions(compositionOptions)

      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        ApiVideoMethod.new,
        ValidationErrorText.SUB_FIELD(CompositionKey.dimensions, DimensionsKey.height),
        dimensions.height,
        PrimitiveType.number
      )

      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        ApiVideoMethod.new,
        ValidationErrorText.SUB_FIELD(CompositionKey.dimensions, DimensionsKey.width),
        dimensions.width,
        PrimitiveType.number
      )

      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        ApiVideoMethod.new,
        CompositionKey.backgroundColor,
        backgroundColor,
        PrimitiveType.string
      )
    })

    describe('when any of the validator functions return an error message', () => {
      it('throws the error messages', () => {
        const invalidOptions = { backgroundColor: 123, dimensions: { height: '10', width: 20 }, duration: 'abc' }

        expect(() => validateCompositionOptions(invalidOptions as any)).toThrow(
          new TypeError(
            `${ValidationErrorText.MUST_BE_TYPE(
              ApiVideoMethod.new,
              ValidationErrorText.SUB_FIELD(CompositionKey.dimensions, DimensionsKey.height),
              invalidOptions.dimensions.height,
              PrimitiveType.number
            )}\n${ValidationErrorText.MUST_BE_TYPE(
              ApiVideoMethod.new,
              CompositionKey.backgroundColor,
              invalidOptions.backgroundColor,
              PrimitiveType.string
            )}`
          )
        )
      })
    })
  })
})
