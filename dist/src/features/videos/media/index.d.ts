import { CompositionInterface, MediaMethod, Trim } from 'constant';
import { Layer } from 'features/videos/layer';
export declare class Media extends Layer {
    constructor({ composition, id }: {
        composition: CompositionInterface;
        id: string;
    });
    [MediaMethod.setTrim]({ end, start }: Trim): this | void;
}
