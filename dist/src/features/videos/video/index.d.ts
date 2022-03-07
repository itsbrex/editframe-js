import { CompositionInterface, FilterOptions, Size, VideoMethod } from 'constant';
import { Audio } from 'features/videos/audio';
import { VisualMedia } from 'features/videos/visualMedia';
declare const Video_base: import("ts-mixer/dist/types/types").Class<any[], Audio & VisualMedia, typeof Audio & typeof VisualMedia, false>;
export declare class Video extends Video_base {
    constructor({ composition, id }: {
        composition: CompositionInterface;
        id: string;
    });
    [VideoMethod.setDimensions]({ height, width }: Size): Video | void;
    [VideoMethod.setFilter]<FilterName extends keyof FilterOptions>({ filterName, options, }: {
        filterName: FilterName;
        options?: FilterOptions[FilterName];
    }): Video | void;
}
export {};
