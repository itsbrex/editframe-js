import { VideoLayerConfig } from 'constant'
import { Videos } from 'features'
import { Composition } from 'features/videos/composition'
import { mockApi } from 'mocks'
import { makeDefaultVideoLayerConfig } from 'utils'

import { Video } from './'

describe('Video', () => {
  const host = 'host'
  let composition: Composition
  let video: Video
  let layerConfigDefaults: VideoLayerConfig

  afterEach(() => {
    jest.resetAllMocks()
  })

  beforeEach(async () => {
    const api = mockApi({ get: jest.fn(), post: jest.fn(), put: jest.fn() })

    composition = new Composition({
      api,
      formData: { append: jest.fn() },
      host,
      options: { dimensions: { height: 1080, width: 1920 }, duration: 10 },
      videos: new Videos({ api, host }),
    })
    video = await composition.addVideo('./package.json')
    layerConfigDefaults = makeDefaultVideoLayerConfig()

    jest.clearAllMocks()
  })

  describe('initialization', () => {
    it('sets the correct default layer configs', () => {
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
