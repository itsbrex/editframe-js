import { Color, CompositionInterface, IdentifiedLayer, LayerAttribute, SubtitlesMethod } from 'constant'
import { mockComposition } from 'mocks'
import * as VideoLayersUtilsModule from 'utils/video/layers'

import { Subtitles } from './'

describe('Subtitles', () => {
  const id = 'id'
  const layers: IdentifiedLayer[] = []
  let compositionMock: CompositionInterface
  let subtitles: Subtitles
  let validateLayerSubtitlesSpy: jest.SpyInstance

  afterEach(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    validateLayerSubtitlesSpy = jest.spyOn(VideoLayersUtilsModule, 'validateLayerSubtitles')
    compositionMock = mockComposition({
      layer: jest.fn(),
      layers,
      updateLayerAttribute: jest.fn(),
    })

    subtitles = new Subtitles({ composition: compositionMock, id })
  })

  describe('setSubtitlesOptions', () => {
    const backgroundColor = Color.black
    const color = Color.white
    const fontSize = 20

    const subtitlesOptions = {
      backgroundColor,
      color,
      fontSize,
    }

    beforeEach(() => {
      subtitles.setSubtitlesOptions(subtitlesOptions)
    })

    it('calls the `validateLayerSubtitles` function with the correct arguments', () => {
      expect(validateLayerSubtitlesSpy).toHaveBeenCalledWith(SubtitlesMethod.setSubtitlesOptions, {
        [LayerAttribute.subtitles]: subtitlesOptions,
      })
    })

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.subtitles, subtitlesOptions)
    })
  })
})
