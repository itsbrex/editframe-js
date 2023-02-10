import { CompositionInterface, LottieAnimationData, LottieMethod } from 'constant';
import { VisualMedia } from 'features/videos/visualMedia';
export declare class Lottie extends VisualMedia {
    constructor({ composition, id }: {
        composition: CompositionInterface;
        id: string;
    });
    [LottieMethod.setAnimationData](data: LottieAnimationData): Lottie | void;
}
