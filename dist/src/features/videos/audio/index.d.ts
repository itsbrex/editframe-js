import { AudioMethod, CompositionInterface } from 'constant';
import { Media } from 'features/videos/media';
export declare class Audio extends Media {
    constructor({ composition, id }: {
        composition: CompositionInterface;
        id: string;
    });
    [AudioMethod.setVolume](volume: number): this | void;
    [AudioMethod.setMuted](): this;
}
