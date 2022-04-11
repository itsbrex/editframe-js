import FormData from "form-data";
import { Size, CompositionOptionAttribute, Filter, HTMLOptions, IdentifiedLayer, LayerAttribute, SubtitlesOptions, AudioLayer, CompositionFile, FilterLayer, HTMLLayer, ImageLayer, LottieLayer, SubtitlesLayer, TextLayer, VideoLayer, WaveformLayer, Trim, FilterOptions, X, Y, LayerFormat, FontWeight, TextAlignment } from "@editframe/shared-types";
import { Filter as FilterType } from "@editframe/shared-types";
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
    id = "id",
    name = "name",
    webhook = "webhook"
}
type ApiApplication = Hashided & Timestamped & {
    [ApiApplicationAttribute.description]: string;
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
declare enum AudioMethod {
    setMuted = "setMuted",
    setVolume = "setVolume"
}
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
type LayerAttributeValue = boolean | number | string | Filter | LottieAnimationData | HTMLOptions | SubtitlesOptions;
declare enum CompositionMethod {
    addAudio = "addAudio",
    addFilter = "addFilter",
    addHTML = "addHTML",
    addImage = "addImage",
    addLottie = "addLottie",
    addSubtitles = "addSubtitles",
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
    preview = "preview",
    setLayer = "setLayer",
    updateLayerAttribute = "updateLayerAttribute"
}
interface CompositionInterface {
    [CompositionMethod.layer]: (id: string) => IdentifiedLayer;
    [CompositionMethod.layers]: IdentifiedLayer[];
    [CompositionMethod.updateLayerAttribute]: (id: string, layerAttribute: LayerAttribute, value: LayerAttributeValue) => void;
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
declare enum HTMLMethod {
    setHTMLOptions = "setHTMLOptions"
}
declare enum LayerMethod {
    setLength = "setLength",
    setStart = "setStart"
}
declare enum MediaMethod {
    setTrim = "setTrim"
}
declare enum PositionableMediaMethod {
    setIsRelative = "setIsRelative",
    setX = "setX",
    setY = "setY"
}
declare enum ResizableMediaMethod {
    setDimensions = "setDimensions",
    setFormat = "setFormat",
    setHeight = "setHeight",
    setWidth = "setWidth"
}
declare enum SubtitlesMethod {
    setSubtitlesOptions = "setSubtitlesOptions"
}
declare enum TextMethod {
    setColor = "setColor",
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
declare enum VisualMediaMethod {
    setBackgroundColor = "setBackgroundColor",
    setColor = "setColor",
    setDimensions = "setDimensions",
    setFilter = "setFilter",
    setFormat = "setFormat",
    setHeight = "setHeight",
    setWidth = "setWidth",
    setX = "setX",
    setY = "setY"
}
declare enum ApiVideoAttribute {
    downloadUrl = "downloadUrl",
    duration = "duration",
    id = "id",
    isFailed = "isFailed",
    isReady = "isReady",
    metadata = "metadata",
    streamUrl = "streamUrl",
    thumbnailUrl = "thumbnailUrl",
    timestamp = "timestamp"
}
type ApiVideo = Hashided & Timestamped & {
    [ApiVideoAttribute.downloadUrl]?: string;
    [ApiVideoAttribute.duration]?: number;
    [ApiVideoAttribute.isFailed]: boolean;
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
    all(page?: number, perPage?: number): Promise<ApiApplication[]>;
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
declare class Filter$0 extends Layer {
    constructor({ composition, id }: {
        composition: CompositionInterface;
        id: string;
    });
    [FilterMethod.setFilter]({ filterName, options }: FilterType): this | void;
}
declare class PositionableMedia extends Media {
    constructor({ composition, id }: {
        composition: CompositionInterface;
        id: string;
    });
    [PositionableMediaMethod.setIsRelative](isRelative?: boolean): this | void;
    [PositionableMediaMethod.setX](x?: X): this | void;
    [PositionableMediaMethod.setY](y?: Y): this | void;
}
declare class ResizableMedia extends Media {
    constructor({ composition, id }: {
        composition: CompositionInterface;
        id: string;
    });
    [ResizableMediaMethod.setDimensions]({ height, width }: Size): this | void;
    [ResizableMediaMethod.setFormat](format: LayerFormat): this | void;
    [ResizableMediaMethod.setHeight](height?: number): this | void;
    [ResizableMediaMethod.setWidth](width?: number): this | void;
}
declare const VisualMedia_base: import("ts-mixer/dist/types/types").Class<any[], Media & PositionableMedia & ResizableMedia, typeof Media & typeof PositionableMedia & typeof ResizableMedia, false>;
declare class VisualMedia extends VisualMedia_base {
    constructor({ composition, id }: {
        composition: CompositionInterface;
        id: string;
    });
    [VisualMediaMethod.setBackgroundColor](backgroundColor?: string): this | void;
    [VisualMediaMethod.setFilter]<FilterName extends keyof FilterOptions>({ filterName, options }: {
        filterName: FilterName;
        options?: FilterOptions[FilterName];
    }): this | void;
}
declare class HTML extends VisualMedia {
    constructor({ composition, id }: {
        composition: CompositionInterface;
        id: string;
    });
    [HTMLMethod.setHTMLOptions](html?: HTMLOptions): this | void;
}
declare class Lottie extends VisualMedia {
    constructor({ composition, id }: {
        composition: CompositionInterface;
        id: string;
    });
    [LottieMethod.setAnimationData](data: LottieAnimationData): Lottie | void;
}
declare class Subtitles extends PositionableMedia {
    constructor({ composition, id }: {
        composition: CompositionInterface;
        id: string;
    });
    [SubtitlesMethod.setSubtitlesOptions](subtitles?: SubtitlesOptions): this | void;
}
declare class Text extends VisualMedia {
    constructor({ composition, id }: {
        composition: CompositionInterface;
        id: string;
    });
    [TextMethod.setColor](color?: string): this | void;
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
    [CompositionMethod.addHTML](options: HTMLLayer): Promise<HTML>;
    [CompositionMethod.addImage](file: CompositionFile, options: ImageLayer): Video | undefined;
    [CompositionMethod.addLottie](options: LottieLayer): Lottie | undefined;
    [CompositionMethod.addSubtitles](file: CompositionFile, options?: SubtitlesLayer): Subtitles | undefined;
    [CompositionMethod.addText](options: TextLayer): Text | undefined;
    [CompositionMethod.addVideo](file: CompositionFile, options?: VideoLayer): Video | undefined;
    [CompositionMethod.addWaveform](options?: WaveformLayer, file?: CompositionFile): VisualMedia | undefined;
    [CompositionMethod.preview](): Promise<void>;
    [CompositionMethod.encode](): Promise<EncodeResponse>;
    private _generateConfig;
    private _addLayer;
    [CompositionMethod.updateLayerAttribute](id: string, layerAttribute: LayerAttribute, value: LayerAttributeValue): void;
    private [CompositionMethod.setLayer];
}
declare class Videos {
    private _api;
    constructor(api: ApiInterface);
    [ApiVideoMethod.all](page?: number, perPage?: number): Promise<ApiVideo[]>;
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
declare const CommonResolutions: Record<string, import("@editframe/shared-types").Size>;
export { Editframe, CommonResolutions };
