import { Videos } from 'features'
import { Composition } from 'features/videos/composition'
import { Text } from 'features/videos/layers/text'
import { mockApi } from 'mocks'
import { makeDefaultSequenceLayerConfig } from 'utils'

import { Sequence } from './'

describe('Sequence', () => {
  let composition: Composition
  let sequence: Sequence
  let result: Sequence | void
  let text1: Text
  let text2: Text

  beforeEach(async () => {
    const api = mockApi()

    composition = new Composition({
      api,
      formData: { append: jest.fn() },
      options: {
        dimensions: {
          height: 1920,
          width: 1080,
        },
        duration: 10,
      },
      videos: new Videos({ api }),
    })

    text1 = composition.addText({ text: 'text-1' }, { trim: { end: 5 } })
    text2 = composition.addText({ text: 'text-2' }, { trim: { end: 5 } })
    sequence = await composition.addSequence([text1, text2])
    jest.clearAllMocks()
  })

  describe('initialization', () => {
    it('sets the correct start of all childLayers', () => {
      expect(text1.start).toEqual(0)
      expect(text2.start).toEqual(5)
    })

    it('sets the correct default layer configs', () => {
      expect(sequence.start).toEqual(makeDefaultSequenceLayerConfig().timeline.start)
    })
  })

  describe('setStart', () => {
    beforeEach(() => {
      result = sequence.setStart(5)
    })

    it('sets the start of all child layers', () => {
      expect(text1.start).toEqual(5)
      expect(text2.start).toEqual(10)

      sequence.setStart(0)

      expect(text1.start).toEqual(0)
      expect(text2.start).toEqual(5)
    })

    it('sets the sequence start', () => {
      sequence.setStart(5)

      expect(sequence.start).toEqual(5)
    })

    it('returns the `Sequence` instance', () => {
      expect(result).toBeInstanceOf(Sequence)
    })
  })
})
