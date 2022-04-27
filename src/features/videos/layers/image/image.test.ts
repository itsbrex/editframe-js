import { ImageLayerConfig } from 'constant'
import { Composition } from 'features/videos/composition'
import { mockApi } from 'mocks'
import { makeDefaultImageLayerConfig } from 'utils'

import { Image } from './'

describe('Image', () => {
  let composition: Composition
  let image: Image
  let layerConfigDefaults: ImageLayerConfig

  afterEach(() => {
    jest.resetAllMocks()
  })

  beforeEach(async () => {
    composition = new Composition({
      api: mockApi({ get: jest.fn(), post: jest.fn(), put: jest.fn() }),
      formData: { append: jest.fn() },
      options: { dimensions: { height: 1080, width: 1920 }, duration: 10 },
    })
    image = await composition.addImage('./package.json')
    layerConfigDefaults = makeDefaultImageLayerConfig(composition.dimensions)

    jest.clearAllMocks()
  })

  describe('initialization', () => {
    it('sets the correct default layer configs', () => {
      expect(image.backgroundColor).toEqual(layerConfigDefaults.background.color)
      expect(image.backgroundOpacity).toEqual(layerConfigDefaults.background.opacity)
      expect(image.isRelative).toEqual(layerConfigDefaults.position.isRelative)
      expect(image.x).toEqual(layerConfigDefaults.position.x)
      expect(image.y).toEqual(layerConfigDefaults.position.y)
      expect(image.format).toEqual(layerConfigDefaults.size.format)
      expect(image.height).toEqual(layerConfigDefaults.size.height)
      expect(image.width).toEqual(layerConfigDefaults.size.width)
      expect(image.start).toEqual(layerConfigDefaults.timeline.start)
      expect(image.trim).toEqual(layerConfigDefaults.trim)
    })
  })
})
