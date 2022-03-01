import {
  CompositionMethod,
  FilterName,
  LayerAttribute,
  LayerFormatValue,
  LayerHorizontalAlignmentValue,
  LayerVerticalAlignmentValue,
  PrimitiveType,
} from 'constant'
import * as ValidationUtilsModule from 'utils/validation'
import * as FilterUtilsModule from 'utils/video/filters'
import * as LayerUtilsModule from 'utils/video/layers'

import {
  formDataKey,
  validateAddAudio,
  validateAddFilter,
  validateAddImage,
  validateAddText,
  validateAddVideo,
  validateAddWaveform,
} from './'

describe('formDataKey', () => {
  it('returns the correct string for strings', () => {
    const file = 'file'
    const id = 'id'

    expect(formDataKey(file, id)).toEqual(`url${id}`)
  })

  it('returns the correct string for Blobs', () => {
    const file = new Blob([])
    const id = 'id'

    expect(formDataKey(file, id)).toEqual(`file${id}`)
  })
})

describe('validations', () => {
  let validateFilterSpy: jest.SpyInstance
  let validateLayerAlignmentSpy: jest.SpyInstance
  let validateLayerAudioSpy: jest.SpyInstance
  let validateLayerBaseSpy: jest.SpyInstance
  let validateLayerTextSpy: jest.SpyInstance
  let validateLayerTrimSpy: jest.SpyInstance
  let validateLayerVisualMediaSpy: jest.SpyInstance
  let validateValueIsOfTypeSpy: jest.SpyInstance

  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    validateFilterSpy = jest.spyOn(FilterUtilsModule, 'validateFilter')
    validateLayerAlignmentSpy = jest.spyOn(LayerUtilsModule, 'validateLayerAlignment')
    validateLayerAudioSpy = jest.spyOn(LayerUtilsModule, 'validateLayerAudio')
    validateLayerBaseSpy = jest.spyOn(LayerUtilsModule, 'validateLayerBase')
    validateLayerTextSpy = jest.spyOn(LayerUtilsModule, 'validateLayerText')
    validateLayerTrimSpy = jest.spyOn(LayerUtilsModule, 'validateLayerTrim')
    validateLayerVisualMediaSpy = jest.spyOn(LayerUtilsModule, 'validateLayerVisualMedia')
    validateValueIsOfTypeSpy = jest.spyOn(ValidationUtilsModule, 'validateValueIsOfType')
  })

  describe('validateAddAudio', () => {
    const options = { length: 10, start: 5, trim: { end: 10, start: 5 }, volume: 10 }

    beforeEach(() => {
      validateAddAudio(options)
    })

    it('calls the `validateLayerBase` function with the correct arguments', () => {
      expect(validateLayerBaseSpy).toHaveBeenCalledWith(CompositionMethod.addAudio, options)
    })

    it('calls the `validateLayerTrim` function with the correct arguments', () => {
      expect(validateLayerTrimSpy).toHaveBeenCalledWith(CompositionMethod.addAudio, options)
    })

    it('calls the `validateLayerAudio` function with the correct arguments', () => {
      expect(validateLayerAudioSpy).toHaveBeenCalledWith(CompositionMethod.addAudio, options)
    })
  })

  describe('validateAddImage', () => {
    const options = {
      backgroundColor: 'background-color',
      color: 'color',
      format: LayerFormatValue.fill,
      height: 10,
      length: 10,
      start: 5,
      width: 20,
      x: 10,
      y: 20,
    }

    beforeEach(() => {
      validateAddImage(options)
    })

    it('calls the `validateLayerBase` function with the correct arguments', () => {
      expect(validateLayerBaseSpy).toHaveBeenCalledWith(CompositionMethod.addImage, options)
    })

    it('calls the `validateLayerVisualMedia` function with the correct arguments', () => {
      expect(validateLayerVisualMediaSpy).toHaveBeenCalledWith(CompositionMethod.addImage, options)
    })
  })

  describe('validateAddText', () => {
    const options = {
      backgroundColor: 'background-color',
      color: 'color',
      fontFamily: 'font-family',
      fontSize: 20,
      format: LayerFormatValue.fill,
      height: 10,
      horizontalAlignment: LayerHorizontalAlignmentValue.center,
      length: 10,
      maxFontSize: 30,
      maxHeight: 40,
      maxWidth: 50,
      start: 5,
      text: 'text',
      textAlignment: LayerHorizontalAlignmentValue.center,
      verticalAlignment: LayerVerticalAlignmentValue.top,
      width: 20,
      x: 10,
      y: 20,
    }

    beforeEach(() => {
      validateAddText(options)
    })

    it('calls the `validateLayerBase` function with the correct arguments', () => {
      expect(validateLayerBaseSpy).toHaveBeenCalledWith(CompositionMethod.addText, options)
    })

    it('calls the `validateLayerVisualMedia` function with the correct arguments', () => {
      expect(validateLayerVisualMediaSpy).toHaveBeenCalledWith(CompositionMethod.addText, options)
    })

    it('calls the `validateLayerAlignment` function with the correct arguments', () => {
      expect(validateLayerAlignmentSpy).toHaveBeenCalledWith(CompositionMethod.addText, options)
    })

    it('calls the `validateLayerText` function with the correct arguments', () => {
      expect(validateLayerTextSpy).toHaveBeenCalledWith(CompositionMethod.addText, options)
    })
  })

  describe('validateAddVideo', () => {
    const options = {
      backgroundColor: 'background-color',
      color: 'color',
      height: 10,
      length: 10,
      start: 5,
      volume: 1,
      width: 20,
    }

    beforeEach(() => {
      validateAddVideo(options)
    })

    it('calls the `validateLayerBase` function with the correct arguments', () => {
      expect(validateLayerBaseSpy).toHaveBeenCalledWith(CompositionMethod.addVideo, options)
    })

    it('calls the `validateLayerTrim` function with the correct arguments', () => {
      expect(validateLayerTrimSpy).toHaveBeenCalledWith(CompositionMethod.addVideo, options)
    })

    it('calls the `validateLayerAudio` function with the correct arguments', () => {
      expect(validateLayerAudioSpy).toHaveBeenCalledWith(CompositionMethod.addVideo, options)
    })

    it('calls the `validateLayerVisualMedia` function with the correct arguments', () => {
      expect(validateLayerVisualMediaSpy).toHaveBeenCalledWith(CompositionMethod.addVideo, options)
    })
  })

  describe('validateAddFilter', () => {
    const options = {
      filter: {
        filterName: FilterName.brightness,
        options: { brightness: 10 },
      },
      length: 10,
      start: 5,
    }

    beforeEach(() => {
      validateAddFilter(options)
    })

    it('calls the `validateLayerBase` function with the correct arguments', () => {
      expect(validateLayerBaseSpy).toHaveBeenCalledWith(CompositionMethod.addFilter, options)
    })

    it('calls the `validateFilter` function with the correct arguments', () => {
      expect(validateFilterSpy).toHaveBeenCalledWith(options.filter.filterName, options.filter.options)
    })
  })

  describe('validateAddWaveform', () => {
    const options = {
      backgroundColor: 'background-color',
      color: 'color',
      length: 10,
      start: 5,
      style: 'bars',
      volume: 1,
      x: 10,
      y: 20,
    }

    beforeEach(() => {
      validateAddWaveform(options)
    })

    it('calls the `validateLayerBase` function with the correct arguments', () => {
      expect(validateLayerBaseSpy).toHaveBeenCalledWith(CompositionMethod.addWaveform, options)
    })

    it('calls the `validateLayerVisualMedia` function with the correct arguments', () => {
      expect(validateLayerVisualMediaSpy).toHaveBeenCalledWith(CompositionMethod.addWaveform, options)
    })

    it('calls the `validateValueIsOfType` funciton with the correct arguments', () => {
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        CompositionMethod.addWaveform,
        LayerAttribute.style,
        options.style,
        PrimitiveType.string
      )
    })
  })
})
