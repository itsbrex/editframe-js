import { ApiVideo, ApiVideoMetadata, CompositionFile, EncodeResponse } from 'constant';
export declare const isEncodeResponse: (encodeResponse: any) => encodeResponse is EncodeResponse;
export declare const isApiVideo: (video: any) => video is ApiVideo;
export declare const isApiVideos: (videos: any) => videos is ApiVideo[];
export declare const isApiVideoMetadata: (metadata: any) => metadata is ApiVideoMetadata;
export declare const formDataKey: (file: CompositionFile, id: string) => string;
