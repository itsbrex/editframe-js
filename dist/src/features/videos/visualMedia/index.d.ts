import { CompositionInterface, LayerFormat, VisualMediaMethod } from 'constant';
import { Media } from 'features/videos/media';
export declare class VisualMedia extends Media {
    constructor({ composition, id }: {
        composition: CompositionInterface;
        id: string;
    });
    [VisualMediaMethod.setBackgroundColor](backgroundColor?: string): this | void;
    [VisualMediaMethod.setColor](color?: string): this | void;
    [VisualMediaMethod.setFormat](format: LayerFormat): this | void;
    [VisualMediaMethod.setHeight](height?: number): this | void;
    [VisualMediaMethod.setWidth](width?: number): this | void;
    [VisualMediaMethod.setX](x?: number): this | void;
    [VisualMediaMethod.setY](y?: number): this | void;
}
