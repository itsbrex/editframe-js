export declare const isValidUrl: (url: string) => boolean;
export declare const validateURL: (url: string) => void;
export declare const validatePresenceOf: (value: any, errorMessage: string) => void;
export declare const validateValueIsOfType: (caller: string, fieldName: string, value: number | string | Record<string, any> | undefined, type: string, shouldThrow?: boolean) => string | undefined;
export declare const withValidation: <T>(validate: () => void, callback?: () => T) => T;
