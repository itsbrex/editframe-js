import { AudioLayer, CompositionInterface, CompositionOptions, EncodeResponse, FilterLayer, ImageLayer, LottieLayer, TextLayer, VideoLayer, WaveformLayer } from 'constant';
export declare const mockComposition: ({ layer, layers, updateLayerAttribute, }: {
    layer: any;
    layers: any;
    updateLayerAttribute: any;
}) => CompositionInterface;
export declare const mockCompositionOptions: ({ backgroundColor, dimensions, duration, metadata }?: CompositionOptions) => CompositionOptions;
export declare const mockAudioLayer: ({ length, start, trim, volume }?: AudioLayer) => AudioLayer;
export declare const mockEncodeResponse: ({ id, status, timestamp }?: EncodeResponse) => EncodeResponse;
export declare const mockFilterLayer: ({ filter, length, start }?: FilterLayer) => FilterLayer;
export declare const mockImageLayer: ({ format, height, length, start, width, x, y }?: ImageLayer) => ImageLayer;
export declare const mockLottieLayer: ({ data, length, start }?: LottieLayer) => LottieLayer;
export declare const mockTextLayer: ({ fontFamily, fontSize, format, height, length, maxFontSize, maxHeight, maxWidth, start, text, textAlignment, width, x, y, }?: TextLayer) => TextLayer;
export declare const mockVideoLayer: ({ format, height, length, start, width, x, y }?: VideoLayer) => VideoLayer;
export declare const mockWaveformLayer: ({ backgroundColor, color, format, x, y }?: WaveformLayer) => WaveformLayer;
