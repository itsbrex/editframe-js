import { CompositionInterface, FilterMethod, FilterOptions } from 'constant';
import { Layer } from 'features/videos/layer';
export declare class Filter extends Layer {
    constructor({ composition, id }: {
        composition: CompositionInterface;
        id: string;
    });
    [FilterMethod.setFilter]<FilterName extends keyof FilterOptions>({ filterName, options, }: {
        filterName: FilterName;
        options: FilterOptions[FilterName];
    }): this | void;
}
