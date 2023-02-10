import { CompositionInterface, LayerHorizontalAlignment, TextMethod } from 'constant';
import { VisualMedia } from 'features/videos/visualMedia';
export declare class Text extends VisualMedia {
    constructor({ composition, id }: {
        composition: CompositionInterface;
        id: string;
    });
    [TextMethod.setFontFamily](fontFamily?: string): this | void;
    [TextMethod.setFontSize](fontSize?: number): this | void;
    [TextMethod.setMaxFontSize](maxFontSize?: number): this | void;
    [TextMethod.setMaxHeight](maxHeight?: number): this | void;
    [TextMethod.setMaxWidth](maxWidth?: number): this | void;
    [TextMethod.setText](text: string): this | void;
    [TextMethod.setTextAlignment](textAlignment?: LayerHorizontalAlignment): this | void;
}
