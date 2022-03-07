import { PrimitiveType } from 'constant/common';
export declare enum FilterName {
    brightness = "brightness",
    contrast = "contrast",
    fadeIn = "fadein",
    fadeOut = "fadeout",
    grayscale = "grayscale",
    lighten = "lighten",
    negative = "negative",
    saturation = "saturation",
    sobel = "sobel",
    vintage = "vintage"
}
export declare enum FilterOptionKey {
    brightness = "brightness",
    color = "color",
    contrast = "contrast",
    duration = "duration",
    saturation = "saturation"
}
export declare const FilterOptionTypes: {
    brightness: {
        brightness: PrimitiveType;
    };
    contrast: {
        contrast: PrimitiveType;
    };
    fadein: {
        color: PrimitiveType;
        duration: PrimitiveType;
    };
    saturation: {
        saturation: PrimitiveType;
    };
};
export interface FilterBrightness {
    [FilterOptionKey.brightness]: number;
}
export interface FilterContrast {
    [FilterOptionKey.contrast]: number;
}
export interface FilterFadeIn {
    [FilterOptionKey.color]: string;
    [FilterOptionKey.duration]: number;
}
export interface FilterSaturation {
    [FilterOptionKey.saturation]: number;
}
export interface FilterOptions {
    [FilterName.brightness]: FilterBrightness;
    [FilterName.contrast]: FilterContrast;
    [FilterName.fadeIn]: FilterFadeIn;
    [FilterName.fadeOut]: undefined;
    [FilterName.grayscale]: undefined;
    [FilterName.lighten]: undefined;
    [FilterName.negative]: undefined;
    [FilterName.saturation]: FilterSaturation;
    [FilterName.sobel]: undefined;
    [FilterName.vintage]: undefined;
}
export declare enum FilterAttribute {
    filterName = "filterName",
    options = "options"
}
export declare type Filter = {
    [FilterAttribute.filterName]: FilterName;
    [FilterAttribute.options]: FilterBrightness | FilterContrast | FilterFadeIn | FilterSaturation | undefined;
};
export declare enum FilterMethod {
    setFilter = "setFilter"
}
