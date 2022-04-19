import { CompositionInterface, HTMLMethod, HTMLOptions, LayerAttribute } from 'constant'
import { mockComposition } from 'mocks'
import * as VideoLayersUtilsModule from 'utils/video/layers'

import { HTML } from './'

describe('HTML', () => {
  const id = 'id'
  let compositionMock: CompositionInterface
  let html: HTML
  let validateLayerHTMLSpy: jest.SpyInstance

  afterEach(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    validateLayerHTMLSpy = jest.spyOn(VideoLayersUtilsModule, 'validateLayerHTML')
    compositionMock = mockComposition({
      updateLayerAttribute: jest.fn(),
    })

    html = new HTML({ composition: compositionMock, id })
  })

  describe('setHTMLOptions', () => {
    const duration = 10
    const framesPerSecond = 30
    const page = '<html></html>'
    const url = 'http://www.editframe.com'
    const withTransparentBackground = true
    let htmlOptions: HTMLOptions

    const makeHtmlOptions = (isPage?: boolean) => ({
      duration,
      framesPerSecond,
      page: isPage ? page : undefined,
      url: !isPage ? url : undefined,
      withTransparentBackground,
    })

    describe('when a `page` is provided', () => {
      beforeEach(() => {
        htmlOptions = makeHtmlOptions(true)
        html.setHTMLOptions(htmlOptions)
      })

      it('calls the `validateLayerHTMLSpy` function with the correct arguments', () => {
        expect(validateLayerHTMLSpy).toHaveBeenCalledWith(HTMLMethod.setHTMLOptions, {
          [LayerAttribute.html]: htmlOptions,
        })
      })

      it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
        expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.html, htmlOptions)
      })
    })

    describe('when a `url` is provided', () => {
      beforeEach(() => {
        htmlOptions = makeHtmlOptions(false)
        html.setHTMLOptions(htmlOptions)
      })

      it('calls the `validateLayerHTMLSpy` function with the correct arguments', () => {
        expect(validateLayerHTMLSpy).toHaveBeenCalledWith(HTMLMethod.setHTMLOptions, {
          [LayerAttribute.html]: htmlOptions,
        })
      })

      it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
        expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.html, htmlOptions)
      })
    })
  })
})
