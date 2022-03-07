import { Filter } from 'constant/video/filters';
import { LottieAnimationData } from 'constant/video/lottie';
export declare enum LayerAttribute {
    backgroundColor = "backgroundColor",
    color = "color",
    data = "data",
    end = "end",
    filter = "filter",
    fontFamily = "fontFamily",
    fontSize = "fontSize",
    format = "format",
    height = "height",
    horizontalAlignment = "horizontalAlignment",
    length = "length",
    maxFontSize = "maxFontSize",
    maxHeight = "maxHeight",
    maxWidth = "maxWidth",
    start = "start",
    style = "style",
    text = "text",
    textAlignment = "textAlignment",
    trim = "trim",
    type = "type",
    verticalAlignment = "verticalAlignment",
    volume = "volume",
    width = "width",
    x = "x",
    y = "y"
}
export declare type Size = {
    [LayerAttribute.height]?: number;
    [LayerAttribute.width]?: number;
};
export declare enum LayerType {
    audio = "audio",
    filter = "filter",
    image = "image",
    lottie = "lottie",
    text = "text",
    video = "video",
    waveform = "waveform"
}
export declare enum LayerHorizontalAlignmentValue {
    center = "center",
    left = "left",
    right = "right"
}
export declare type LayerHorizontalAlignment = LayerHorizontalAlignmentValue.left | LayerHorizontalAlignmentValue.center | LayerHorizontalAlignmentValue.right;
export declare enum LayerVerticalAlignmentValue {
    bottom = "bottom",
    middle = "middle",
    top = "top"
}
export declare type LayerVerticalAlignment = LayerVerticalAlignmentValue.bottom | LayerVerticalAlignmentValue.middle | LayerVerticalAlignmentValue.top;
export declare enum LayerFormatValue {
    fill = "fill",
    fit = "fit",
    stretch = "stretch"
}
export declare type LayerFormat = LayerFormatValue.fill | LayerFormatValue.fit | LayerFormatValue.stretch;
export declare enum WaveformLayerStyleValue {
    line = "line",
    wave = "wave"
}
export declare type WaveformLayerStyle = WaveformLayerStyleValue.wave | WaveformLayerStyleValue.line;
export declare type LayerBase = {
    [LayerAttribute.start]?: number;
    [LayerAttribute.length]?: number;
};
export declare type Trim = {
    [LayerAttribute.end]?: number;
    [LayerAttribute.start]: number;
};
export declare type LayerTrim = {
    [LayerAttribute.trim]?: Trim;
};
export declare type LayerAlignment = {
    [LayerAttribute.horizontalAlignment]?: LayerHorizontalAlignment;
    [LayerAttribute.verticalAlignment]?: LayerVerticalAlignment;
};
export declare type LayerVisualMedia = Size & {
    [LayerAttribute.backgroundColor]?: string;
    [LayerAttribute.color]?: string;
    [LayerAttribute.format]?: LayerFormat;
    [LayerAttribute.x]?: number;
    [LayerAttribute.y]?: number;
};
export declare type LayerText = {
    [LayerAttribute.fontFamily]?: string;
    [LayerAttribute.fontSize]?: number;
    [LayerAttribute.maxFontSize]?: number;
    [LayerAttribute.maxHeight]?: number;
    [LayerAttribute.maxWidth]?: number;
    [LayerAttribute.text]: string;
    [LayerAttribute.textAlignment]?: LayerHorizontalAlignment;
};
export declare type LayerAudio = {
    [LayerAttribute.volume]?: number;
};
export declare type LayerFilter = {
    [LayerAttribute.filter]: Filter;
};
export declare type LayerLottie = {
    [LayerAttribute.data]?: LottieAnimationData;
};
export declare enum WaveformStyle {
    bars = "bars",
    line = "line"
}
export declare type LayerWaveform = {
    [LayerAttribute.style]?: WaveformStyle;
};
export declare type AudioLayer = LayerBase & LayerTrim & LayerAudio;
export declare type FilterLayer = LayerBase & LayerFilter;
export declare type ImageLayer = LayerBase & LayerVisualMedia;
export declare type LottieLayer = LayerBase & LayerLottie;
export declare type TextLayer = LayerBase & LayerAlignment & LayerText & LayerVisualMedia;
export declare type VideoLayer = LayerBase & LayerTrim & AudioLayer & LayerVisualMedia;
export declare type WaveformLayer = LayerBase & LayerVisualMedia & LayerWaveform;
export declare type ComposableLayer = AudioLayer | FilterLayer | ImageLayer | LottieLayer | TextLayer | VideoLayer | (WaveformLayer & {
    [LayerAttribute.type]: string;
}) | FilterLayer;
export declare type TypedLayer = ComposableLayer & {
    type: LayerType;
};
export declare type IdentifiedLayer = TypedLayer & {
    id: string;
};
