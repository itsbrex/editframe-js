import { ApiInterface, ApiVideo, ApiVideoMethod, VideoOptions } from 'constant';
import { Composition } from './composition';
export declare class Videos {
    private _api;
    constructor(api: ApiInterface);
    [ApiVideoMethod.all](): Promise<ApiVideo[]>;
    [ApiVideoMethod.get](id: string): Promise<ApiVideo | undefined>;
    [ApiVideoMethod.new](options: VideoOptions, videoPath?: string): Promise<Composition>;
    private [ApiVideoMethod.getMetadata];
}
