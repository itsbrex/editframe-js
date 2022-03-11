/// <reference types="node" />
import FormData from "form-data";
import { FontWeight, LayerAttribute, LayerHorizontalAlignment, LayerVerticalAlignment, TextAlignment, WaveformStyle, FilterBrightness, FilterContrast, FilterFadeIn, FilterName, FilterNames, FilterOptions, FilterSaturation } from "@editframe/shared-types";
import { Blob } from "node:buffer";
import { Readable } from "stream";
interface ApiInterface {
    get: ({ url }: {
        url: string;
    }) => Promise<unknown>;
    post: ({ data, isForm, url }: {
        data: FormData | Record<string, any>;
        isForm: boolean;
        url: string;
    }) => Promise<unknown>;
    put: ({ data, isForm, url }: {
        data: FormData | Record<string, any>;
        isForm: boolean;
        url: string;
    }) => Promise<unknown>;
}
interface FormDataInterface {
    append: (key: string, value: any, options?: FormData.AppendOptions | string) => void;
}
type Hashided = {
    id: string;
};
type Timestamped = {
    createdAt: string;
    updatedAt: string;
};
declare enum ApiApplicationAttribute {
    description = "description",
    lastUsedAt = "lastUsedAt",
    name = "name",
    webhook = "webhook"
}
type ApiApplication = Hashided & Timestamped & {
    [ApiApplicationAttribute.description]: string;
    [ApiApplicationAttribute.lastUsedAt]: string;
    [ApiApplicationAttribute.name]: string;
    [ApiApplicationAttribute.webhook]: string;
};
interface EditframeOptions {
    clientId: string;
    host?: string;
    log?: boolean;
    token: string;
    version?: number;
}
declare enum FilterAttribute {
    filterName = "filterName",
    options = "options"
}
type Filter = {
    [FilterAttribute.filterName]: FilterNames;
    [FilterAttribute.options]?: FilterBrightness | FilterContrast | FilterFadeIn | FilterSaturation;
};
declare enum FilterMethod {
    setFilter = "setFilter"
}
declare enum LottieMethod {
    setAnimationData = "setAnimationData"
}
interface LottieFont {
    ascent: number;
    fFamily: string;
    fName: string;
    fStyle: string;
}
interface LottieAnimationFontData {
    list: [
        LottieFont
    ];
}
interface LottieAnimationData {
    assets: any[];
    ddd: number;
    fonts?: LottieAnimationFontData;
    fr: number;
    h: number;
    ip: number;
    layers: any[];
    markers?: any[];
    nm: string;
    op: number;
    v: string;
    w: number;
}
type Size = {
    [LayerAttribute.height]?: number;
    [LayerAttribute.width]?: number;
};
declare enum LayerType {
    audio = "audio",
    filter = "filter",
    image = "image",
    lottie = "lottie",
    text = "text",
    video = "video",
    waveform = "waveform"
}
declare enum LayerFormatValue {
    fill = "fill",
    fit = "fit",
    stretch = "stretch"
}
type LayerFormat = LayerFormatValue.fill | LayerFormatValue.fit | LayerFormatValue.stretch;
type LayerBase = {
    [LayerAttribute.start]?: number;
    [LayerAttribute.length]?: number;
};
type Trim = {
    [LayerAttribute.end]?: number;
    [LayerAttribute.start]: number;
};
type LayerTrim = {
    [LayerAttribute.trim]?: Trim;
};
type LayerAlignment = {
    [LayerAttribute.horizontalAlignment]?: LayerHorizontalAlignment;
    [LayerAttribute.verticalAlignment]?: LayerVerticalAlignment;
};
type LayerVisualMedia = Size & {
    [LayerAttribute.backgroundColor]?: string;
    [LayerAttribute.color]?: string;
    [LayerAttribute.format]?: LayerFormat;
    [LayerAttribute.x]?: number;
    [LayerAttribute.y]?: number;
};
type LayerText = {
    [LayerAttribute.fontFamily]?: string;
    [LayerAttribute.fontSize]?: number;
    [LayerAttribute.fontWeight]?: FontWeight;
    [LayerAttribute.lineHeight]?: number;
    [LayerAttribute.maxFontSize]?: number;
    [LayerAttribute.maxHeight]?: number;
    [LayerAttribute.maxWidth]?: number;
    [LayerAttribute.text]: string;
    [LayerAttribute.textAlign]?: TextAlignment;
};
type LayerAudio = {
    [LayerAttribute.volume]?: number;
};
type LayerFilter = {
    [LayerAttribute.filter]: Filter;
};
type LayerLottie = {
    [LayerAttribute.data]?: LottieAnimationData;
};
type LayerWaveform = {
    [LayerAttribute.style]?: WaveformStyle;
};
type AudioLayer = LayerBase & LayerTrim & LayerAudio;
type FilterLayer = LayerBase & LayerFilter;
type ImageLayer = LayerBase & LayerVisualMedia;
type LottieLayer = LayerBase & LayerLottie;
type TextLayer = LayerBase & LayerAlignment & LayerText & LayerVisualMedia;
type VideoLayer = LayerBase & LayerTrim & AudioLayer & LayerVisualMedia;
type WaveformLayer = LayerBase & LayerVisualMedia & LayerWaveform;
type ComposableLayer = AudioLayer | FilterLayer | ImageLayer | LottieLayer | TextLayer | VideoLayer | WaveformLayer | FilterLayer;
type TypedLayer = ComposableLayer & {
    type: LayerType;
};
type IdentifiedLayer = TypedLayer & {
    id: string;
};
declare enum AudioMethod {
    setMuted = "setMuted",
    setVolume = "setVolume"
}
type LayerAttributeValue = number | string | Filter | LottieAnimationData;
declare enum CompositionMethod {
    addAudio = "addAudio",
    addFilter = "addFilter",
    addImage = "addImage",
    addLottie = "addLottie",
    addText = "addText",
    addVideo = "addVideo",
    addWaveform = "addWaveform",
    backgroundColor = "backgroundColor",
    dimensions = "dimensions",
    duration = "duration",
    encode = "encode",
    layer = "layer",
    layers = "layers",
    metadata = "metadata",
    setLayer = "setLayer",
    updateLayerAttribute = "updateLayerAttribute"
}
interface CompositionInterface {
    [CompositionMethod.layer]: (id: string) => IdentifiedLayer;
    [CompositionMethod.layers]: IdentifiedLayer[];
    [CompositionMethod.updateLayerAttribute]: (id: string, layerAttribute: LayerAttribute, value: LayerAttributeValue) => void;
}
type CompositionFile = Readable | Blob | string;
declare enum CompositionOptionAttribute {
    backgroundColor = "backgroundColor",
    dimensions = "dimensions",
    duration = "duration",
    metadata = "metadata"
}
type Metadata = Record<string, string>;
type VideoOptions = {
    [CompositionOptionAttribute.backgroundColor]?: string;
    [CompositionOptionAttribute.dimensions]?: Size;
    [CompositionOptionAttribute.duration]?: number;
    [CompositionOptionAttribute.metadata]?: Metadata;
};
type CompositionOptions = {
    [CompositionOptionAttribute.backgroundColor]?: string;
    [CompositionOptionAttribute.dimensions]: Size;
    [CompositionOptionAttribute.duration]: number;
    [CompositionOptionAttribute.metadata]?: Metadata;
};
declare enum EncodeResponseAttribute {
    id = "id",
    status = "status",
    timestamp = "timestamp"
}
type EncodeResponse = {
    [EncodeResponseAttribute.id]: string;
    [EncodeResponseAttribute.status]: string;
    [EncodeResponseAttribute.timestamp]: number;
};
declare enum LayerMethod {
    setLength = "setLength",
    setStart = "setStart"
}
declare enum MediaMethod {
    setTrim = "setTrim"
}
declare enum TextMethod {
    setFontFamily = "setFontFamily",
    setFontSize = "setFontSize",
    setFontWeight = "setFontWeight",
    setLineHeight = "setLineHeight",
    setMaxFontSize = "setMaxFontSize",
    setMaxHeight = "setMaxHeight",
    setMaxWidth = "setMaxWidth",
    setText = "setText",
    setTextAlignment = "setTextAlignment"
}
declare enum VideoMethod {
    setDimensions = "setDimensions",
    setFilter = "setFilter"
}
declare enum VisualMediaMethod {
    setBackgroundColor = "setBackgroundColor",
    setColor = "setColor",
    setFormat = "setFormat",
    setHeight = "setHeight",
    setWidth = "setWidth",
    setX = "setX",
    setY = "setY"
}
declare enum ApiVideoAttribute {
    downloadUrl = "downloadUrl",
    duration = "duration",
    isReady = "isReady",
    metadata = "metadata",
    streamUrl = "streamUrl",
    thumbnailUrl = "thumbnailUrl",
    timestamp = "timestamp"
}
type ApiVideo = Hashided & Timestamped & {
    [ApiVideoAttribute.downloadUrl]?: string;
    [ApiVideoAttribute.duration]?: number;
    [ApiVideoAttribute.isReady]: boolean;
    [ApiVideoAttribute.metadata]: Record<string, unknown>;
    [ApiVideoAttribute.streamUrl]?: string;
    [ApiVideoAttribute.thumbnailUrl]?: string;
    [ApiVideoAttribute.timestamp]: number;
};
declare enum ApiVideoMethod {
    all = "all",
    get = "get",
    getMetadata = "_getMetadata",
    new = "new"
}
declare class Applications {
    private _api;
    constructor(api: ApiInterface);
    all(): Promise<ApiApplication[]>;
    get(id: string): Promise<ApiApplication | undefined>;
}
declare class Layer {
    protected _composition: CompositionInterface;
    private _id;
    constructor({ composition, id }: {
        composition: CompositionInterface;
        id: string;
    });
    get id(): string;
    [LayerMethod.setStart](start?: number): this | void;
    [LayerMethod.setLength](length?: number): this | void;
    _updateAttribute(layerAttribute: LayerAttribute, value: LayerAttributeValue): this;
}
declare class Media extends Layer {
    constructor({ composition, id }: {
        composition: CompositionInterface;
        id: string;
    });
    [MediaMethod.setTrim]({ end, start }: Trim): this | void;
}
declare class Audio extends Media {
    constructor({ composition, id }: {
        composition: CompositionInterface;
        id: string;
    });
    [AudioMethod.setVolume](volume: number): this | void;
    [AudioMethod.setMuted](): this;
}
type FilterType = Filter;
declare class Filter$0 extends Layer {
    constructor({ composition, id }: {
        composition: CompositionInterface;
        id: string;
    });
    [FilterMethod.setFilter]({ filterName, options }: FilterType): this | void;
}
declare class VisualMedia extends Media {
    constructor({ composition, id }: {
        composition: CompositionInterface;
        id: string;
    });
    [VisualMediaMethod.setBackgroundColor](backgroundColor?: string): this | void;
    [VisualMediaMethod.setColor](color?: string): this | void;
    [VisualMediaMethod.setFormat](format: LayerFormat): this | void;
    [VisualMediaMethod.setHeight](height?: number): this | void;
    [VisualMediaMethod.setWidth](width?: number): this | void;
    [VisualMediaMethod.setX](x?: number): this | void;
    [VisualMediaMethod.setY](y?: number): this | void;
}
declare class Lottie extends VisualMedia {
    constructor({ composition, id }: {
        composition: CompositionInterface;
        id: string;
    });
    [LottieMethod.setAnimationData](data: LottieAnimationData): Lottie | void;
}
declare class Text extends VisualMedia {
    constructor({ composition, id }: {
        composition: CompositionInterface;
        id: string;
    });
    [TextMethod.setFontFamily](fontFamily?: string): this | void;
    [TextMethod.setFontSize](fontSize?: number): this | void;
    [TextMethod.setFontWeight](fontWeight?: FontWeight): this | void;
    [TextMethod.setLineHeight](lineHeight?: number): this | void;
    [TextMethod.setMaxFontSize](maxFontSize?: number): this | void;
    [TextMethod.setMaxHeight](maxHeight?: number): this | void;
    [TextMethod.setMaxWidth](maxWidth?: number): this | void;
    [TextMethod.setText](text: string): this | void;
    [TextMethod.setTextAlignment](textAlign?: TextAlignment): this | void;
}
declare const Video_base: import("ts-mixer/dist/types/types").Class<any[], Audio & VisualMedia, typeof Audio & typeof VisualMedia, false>;
declare class Video extends Video_base {
    constructor({ composition, id }: {
        composition: CompositionInterface;
        id: string;
    });
    [VideoMethod.setDimensions]({ height, width }: Size): Video | void;
    [VideoMethod.setFilter]<FilterName extends keyof FilterOptions>({ filterName, options }: {
        filterName: FilterName;
        options?: FilterOptions[FilterName];
    }): Video | void;
}
declare class Composition implements CompositionInterface {
    private _api;
    private _files;
    private _formData;
    private _layers;
    private _options;
    constructor({ api, formData, options }: {
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
    [CompositionMethod.addFilter](options: FilterLayer): Filter$0 | undefined;
    [CompositionMethod.addImage](file: CompositionFile, options?: ImageLayer): Video | undefined;
    [CompositionMethod.addLottie](options: LottieLayer): Lottie | undefined;
    [CompositionMethod.addText](options: TextLayer): Text | undefined;
    [CompositionMethod.addVideo](file: CompositionFile, options?: VideoLayer): Video | undefined;
    [CompositionMethod.addWaveform](options?: WaveformLayer, file?: CompositionFile): VisualMedia | undefined;
    [CompositionMethod.encode](): Promise<EncodeResponse>;
    private _generateConfig;
    private _addLayer;
    [CompositionMethod.updateLayerAttribute](id: string, layerAttribute: LayerAttribute, value: LayerAttributeValue): void;
    private [CompositionMethod.setLayer];
}
declare class Videos {
    private _api;
    constructor(api: ApiInterface);
    [ApiVideoMethod.all](): Promise<ApiVideo[]>;
    [ApiVideoMethod.get](id: string): Promise<ApiVideo | undefined>;
    [ApiVideoMethod.new](options?: VideoOptions, videoPath?: string): Promise<Composition>;
    private [ApiVideoMethod.getMetadata];
}
declare class Editframe {
    applications: Applications;
    videos: Videos;
    private _api;
    private _clientId;
    private _host;
    private _token;
    private _version;
    constructor({ clientId, host, token, version }: EditframeOptions);
    get clientId(): string;
    get host(): string;
    get token(): string;
    get version(): number;
}
declare const CommonResolutions: Record<string, Size>;
export { Editframe, CommonResolutions };
