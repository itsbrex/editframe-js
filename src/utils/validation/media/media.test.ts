import { isAudioExtension, isImageExtension, isVideoExtension } from './'

describe('isAudioExtension', () => {
  it('returns `true` when provided a valid audio extension', () => {
    expect(isAudioExtension('mp3')).toEqual(true)
  })

  it('returns `false` when provided an invalid audio extension', () => {
    expect(isAudioExtension('jpg')).toEqual(false)
  })
})

describe('isImageExtension', () => {
  it('returns `true` when provided a valid image extension', () => {
    expect(isImageExtension('jpg')).toEqual(true)
  })

  it('returns `false` when provided an invalid image extension', () => {
    expect(isImageExtension('mp4')).toEqual(false)
  })
})

describe('isVideoExtension', () => {
  it('returns `true` when provided a valid video extension', () => {
    expect(isVideoExtension('mp4')).toEqual(true)
  })

  it('returns `false` when provided an invalid video extension', () => {
    expect(isVideoExtension('jpg')).toEqual(false)
  })
})
