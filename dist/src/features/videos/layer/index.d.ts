import { CompositionInterface, LayerAttribute, LayerAttributeValue, LayerMethod } from 'constant';
export declare class Layer {
    protected _composition: CompositionInterface;
    private _id;
    constructor({ composition, id }: {
        composition: CompositionInterface;
        id: string;
    });
    get id(): string;
    [LayerMethod.setStart](start?: number): this | void;
    [LayerMethod.setLength](length?: number): this | void;
    _updateAttribute(layerAttribute: LayerAttribute, value: LayerAttributeValue): this;
}
