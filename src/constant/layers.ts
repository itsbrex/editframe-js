import { Size } from "constant/common";
import {
  FilterBrightness,
  FilterContrast,
  FilterFadeIn,
  FilterName,
  FilterSaturation,
} from "constant/filters";

export enum LayerType {
  audio = "audio",
  filter = "filter",
  image = "image",
  text = "text",
  video = "video",
  waveform = "waveform",
}

export enum LayerHorizontalAlignmentValue {
  center = "center",
  left = "left",
  right = "right",
}
export type LayerHorizontalAlignment =
  | LayerHorizontalAlignmentValue.left
  | LayerHorizontalAlignmentValue.center
  | LayerHorizontalAlignmentValue.right;

export enum LayerVerticalAlignmentValue {
  bottom = "bottom",
  middle = "middle",
  top = "top",
}
export type LayerVerticalAlignment =
  | LayerVerticalAlignmentValue.bottom
  | LayerVerticalAlignmentValue.middle
  | LayerVerticalAlignmentValue.top;

export enum LayerFormatValue {
  fill = "fill",
  fit = "fit",
  stretch = "stretch",
}
export type LayerFormat =
  | LayerFormatValue.fill
  | LayerFormatValue.fit
  | LayerFormatValue.stretch;

export enum WaveformLayerStyleValue {
  line = "line",
  wave = "wave",
}
export type WaveformLayerStyle =
  | WaveformLayerStyleValue.wave
  | WaveformLayerStyleValue.line;

export type BaseLayer = {
  end?: number;
  start?: number;
};

export type LayerAlignment = {
  horizontalAlignment?: LayerHorizontalAlignment;
  verticalAlignment?: LayerVerticalAlignment;
};

export type LayerColors = {
  backgroundColor?: string;
  color?: string;
};

export type LayerShape = Size & {
  format?: LayerFormat;
  x?: number;
  y?: number;
};

export type LayerText = {
  fontFamily?: string;
  fontSize?: number;
  maxFontSize?: number;
  maxHeight?: number;
  maxWidth?: number;
  text: string;
  textAlignment?: LayerHorizontalAlignment;
};

export type AudioLayer = BaseLayer;
export type ImageLayer = BaseLayer & LayerShape;
export type TextLayer = BaseLayer & LayerAlignment & LayerShape & LayerText;
export type VideoLayer = BaseLayer & LayerShape;
export type FilterLayer = BaseLayer & {
  filter: {
    filterName: FilterName;
    options:
      | FilterBrightness
      | FilterContrast
      | FilterFadeIn
      | FilterSaturation
      | undefined;
  };
};

export type WaveformLayer = LayerColors &
  LayerShape & {
    style?: string;
  };

export type ComposableLayer =
  | AudioLayer
  | ImageLayer
  | TextLayer
  | VideoLayer
  | (WaveformLayer & {
      type: string;
    })
  | FilterLayer;

export type Layer = ComposableLayer & {
  id: string;
};
