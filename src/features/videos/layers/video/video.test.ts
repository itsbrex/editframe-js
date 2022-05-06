import { VideoLayerConfig } from 'constant'
import { Composition } from 'features/videos/composition'
import { mockApi } from 'mocks'
import { makeDefaultVideoLayerConfig } from 'utils'

import { Video } from './'

describe('Video', () => {
  let composition: Composition
  let video: Video
  let layerConfigDefaults: VideoLayerConfig

  afterEach(() => {
    jest.resetAllMocks()
  })

  beforeEach(async () => {
    composition = new Composition({
      api: mockApi({ get: jest.fn(), post: jest.fn(), put: jest.fn() }),
      formData: { append: jest.fn() },
      options: { dimensions: { height: 1080, width: 1920 }, duration: 10 },
    })
    video = await composition.addVideo('./package.json')
    layerConfigDefaults = makeDefaultVideoLayerConfig()

    jest.clearAllMocks()
  })

  describe('initialization', () => {
    it('sets the correct default layer configs', () => {
      expect(video.backgroundColor).toEqual(layerConfigDefaults.background.color)
      expect(video.backgroundOpacity).toEqual(layerConfigDefaults.background.opacity)
      expect(video.isRelative).toEqual(layerConfigDefaults.position.isRelative)
      expect(video.x).toEqual(layerConfigDefaults.position.x)
      expect(video.y).toEqual(layerConfigDefaults.position.y)
      expect(video.format).toEqual(layerConfigDefaults.size.format)
      expect(video.height).toEqual(layerConfigDefaults.size.height)
      expect(video.width).toEqual(layerConfigDefaults.size.width)
      expect(video.start).toEqual(layerConfigDefaults.timeline.start)
      expect(video.trim).toEqual(layerConfigDefaults.trim)
    })
  })
})
