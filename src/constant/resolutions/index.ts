import { Size } from 'constant/video/layers'

export const CommonResolution: Record<string, Size> = {
  _1080p: { height: 1080, width: 1920 },
  _1080pVertical: { height: 1920, width: 1080 },
  _1080x1080: { height: 1080, width: 1080 },
  _720p: { height: 720, width: 1080 },
  _720pVertical: { height: 1080, width: 720 },
  _720x720: { height: 720, width: 720 },
}
