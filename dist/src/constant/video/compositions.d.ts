/// <reference types="node" />
import { Blob } from 'node:buffer';
import { Readable } from 'stream';
import { Filter } from 'constant/video/filters';
import { IdentifiedLayer, LayerAttribute, Size } from 'constant/video/layers';
import { LottieAnimationData } from 'constant/video/lottie';
export declare type LayerAttributeValue = number | string | Filter | LottieAnimationData;
export declare enum CompositionMethod {
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
export interface CompositionInterface {
    [CompositionMethod.layer]: (id: string) => IdentifiedLayer;
    [CompositionMethod.layers]: IdentifiedLayer[];
    [CompositionMethod.updateLayerAttribute]: (id: string, layerAttribute: LayerAttribute, value: LayerAttributeValue) => void;
}
export declare type CompositionFile = Readable | Blob | string;
export declare enum CompositionOptionAttribute {
    backgroundColor = "backgroundColor",
    dimensions = "dimensions",
    duration = "duration",
    metadata = "metadata"
}
export declare type Metadata = Record<string, string>;
export declare type VideoOptions = {
    [CompositionOptionAttribute.backgroundColor]?: string;
    [CompositionOptionAttribute.dimensions]?: Size;
    [CompositionOptionAttribute.duration]?: number;
    [CompositionOptionAttribute.metadata]?: Metadata;
};
export declare type CompositionOptions = {
    [CompositionOptionAttribute.backgroundColor]?: string;
    [CompositionOptionAttribute.dimensions]: Size;
    [CompositionOptionAttribute.duration]: number;
    [CompositionOptionAttribute.metadata]?: Metadata;
};
export declare type EncodeConfig = CompositionOptions & {
    dimensions: {
        height: number;
        width: number;
    };
    layers: IdentifiedLayer[];
};
export declare enum EncodeResponseAttribute {
    id = "id",
    status = "status",
    timestamp = "timestamp"
}
export declare type EncodeResponse = {
    [EncodeResponseAttribute.id]: string;
    [EncodeResponseAttribute.status]: string;
    [EncodeResponseAttribute.timestamp]: number;
};
