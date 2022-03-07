import { ApiVideo, ApiVideoMetadata } from 'constant';
export declare const mockApiVideo: ({ createdAt, downloadUrl, duration, id, isReady, metadata, streamUrl, thumbnailUrl, timestamp, updatedAt, }?: ApiVideo) => ApiVideo;
export declare const mockApiVideoMetadata: ({ bitrate, codec, duration, fps, height, size, width }?: ApiVideoMetadata) => ApiVideoMetadata;
