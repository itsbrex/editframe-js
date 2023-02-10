import { ApiInterface, AudioLayer, CompositionFile, CompositionInterface, CompositionMethod, CompositionOptions, EncodeResponse, FilterLayer, FormDataInterface, IdentifiedLayer, ImageLayer, LayerAttribute, LayerAttributeValue, LottieLayer, Metadata, Size, TextLayer, VideoLayer, WaveformLayer } from 'constant';
import { Audio } from 'features/videos/audio';
import { Filter } from 'features/videos/filter';
import { Lottie } from 'features/videos/lottie';
import { Text } from 'features/videos/text';
import { Video } from 'features/videos/video';
import { VisualMedia } from 'features/videos/visualMedia';
export declare class Composition implements CompositionInterface {
    private _api;
    private _files;
    private _formData;
    private _layers;
    private _options;
    constructor({ api, formData, options, }: {
        api: ApiInterface;
        formData: FormDataInterface;
        options: CompositionOptions;
    });
    get [CompositionMethod.backgroundColor](): string;
    get [CompositionMethod.dimensions](): Size;
    get [CompositionMethod.duration](): number;
    get [CompositionMethod.metadata](): Metadata;
    get [CompositionMethod.layers](): IdentifiedLayer[];
    [CompositionMethod.layer](id: string): IdentifiedLayer;
    [CompositionMethod.addAudio](file: CompositionFile, options?: AudioLayer): Audio | undefined;
    [CompositionMethod.addFilter](options: FilterLayer): Filter | undefined;
    [CompositionMethod.addImage](file: CompositionFile, options?: ImageLayer): Video | undefined;
    [CompositionMethod.addLottie](options: LottieLayer): Lottie | undefined;
    [CompositionMethod.addText](options: TextLayer): Text | undefined;
    [CompositionMethod.addVideo](file: CompositionFile, options?: VideoLayer): Video | undefined;
    [CompositionMethod.addWaveform](options?: WaveformLayer): VisualMedia | undefined;
    [CompositionMethod.encode](): Promise<EncodeResponse>;
    private _generateConfig;
    private _addLayer;
    [CompositionMethod.updateLayerAttribute](id: string, layerAttribute: LayerAttribute, value: LayerAttributeValue): void;
    private [CompositionMethod.setLayer];
}
