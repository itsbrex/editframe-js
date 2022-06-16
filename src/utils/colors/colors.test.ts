import { translateColor } from './'

describe('translateColor', () => {
  const redHexa = '#FF0000FF'

  it('returns `transparent` when the provided color is `transparent`', () => {
    const color = 'transparent'

    expect(translateColor(color)).toEqual(color)
  })

  it('translates a valid hex color to HEXA', () => {
    expect(translateColor('#ff0000')).toEqual(redHexa)
  })

  it('translates a valid html color to HEXA', () => {
    expect(translateColor('red')).toEqual(redHexa)
  })

  it('translates a valid rgb color to HEXA', () => {
    expect(translateColor('rgb(255,0,0)')).toEqual(redHexa)
  })

  it('translates a valid rgba color to HEXA', () => {
    expect(translateColor('rgba(255,0,0,0.25)')).toEqual('#FF00003F')
  })
})
