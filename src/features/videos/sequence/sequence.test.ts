import { Composition } from 'features/videos/composition'
import { Text } from 'features/videos/text'
import { mockApi } from 'mocks'

import { Sequence } from './'

describe('Sequence', () => {
  let composition: Composition

  describe('setStart', () => {
    let sequence: Sequence
    let text1: Text
    let text2: Text

    beforeEach(async () => {
      composition = new Composition({
        api: mockApi(),
        formData: { append: jest.fn() },
        options: {
          dimensions: {
            height: 1920,
            width: 1080,
          },
          duration: 10,
        },
      })

      text1 = composition.addText({ text: 'text-1', trim: { end: 5 } })
      text2 = composition.addText({ text: 'text-2', trim: { end: 5 } })
      sequence = await composition.addSequence([text1, text2])
    })

    it('updates the start of all child layers', () => {
      sequence.setStart(5)

      expect(text1.start).toEqual(5)
      expect(text2.start).toEqual(10)

      sequence.setStart(0)

      expect(text1.start).toEqual(0)
      expect(text2.start).toEqual(5)
    })

    it('updates the sequence start', () => {
      sequence.setStart(5)

      expect(sequence.start).toEqual(5)
    })
  })
})
