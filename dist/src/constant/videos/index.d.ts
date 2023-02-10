import { Hashided, Timestamped } from 'constant/common';
export declare enum ApiVideoAttribute {
    downloadUrl = "downloadUrl",
    duration = "duration",
    isReady = "isReady",
    metadata = "metadata",
    streamUrl = "streamUrl",
    thumbnailUrl = "thumbnailUrl",
    timestamp = "timestamp"
}
export declare type ApiVideo = Hashided & Timestamped & {
    [ApiVideoAttribute.downloadUrl]?: string;
    [ApiVideoAttribute.duration]?: number;
    [ApiVideoAttribute.isReady]: boolean;
    [ApiVideoAttribute.metadata]: Record<string, unknown>;
    [ApiVideoAttribute.streamUrl]?: string;
    [ApiVideoAttribute.thumbnailUrl]?: string;
    [ApiVideoAttribute.timestamp]: number;
};
export declare enum ApiVideoMethod {
    all = "all",
    get = "get",
    getMetadata = "_getMetadata",
    new = "new"
}
export declare enum ApiVideoMetadataAttribute {
    bitrate = "bitrate",
    codec = "codec",
    duration = "duration",
    fps = "fps",
    height = "height",
    size = "size",
    width = "width"
}
export declare type ApiVideoMetadata = {
    [ApiVideoMetadataAttribute.bitrate]: number;
    [ApiVideoMetadataAttribute.codec]: string;
    [ApiVideoMetadataAttribute.duration]: number;
    [ApiVideoMetadataAttribute.fps]: number;
    [ApiVideoMetadataAttribute.height]: number;
    [ApiVideoMetadataAttribute.size]: number;
    [ApiVideoMetadataAttribute.width]: number;
};
export declare enum ApiVideoMetadataFormDataKey {
    type = "type"
}
export declare enum ApiVideoMetadataType {
    audio = "audio",
    image = "image",
    video = "video"
}
