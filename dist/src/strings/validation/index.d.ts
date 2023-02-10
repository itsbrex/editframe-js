export declare const ValidationErrorText: {
    INVALID_URL: (url: string) => string;
    MUST_BE_TYPE: (caller: string, fieldName: string, value: any, type: string) => string;
    REQUIRED_FIELD: (name: string) => string;
    SUB_FIELD: (parent: string, child: string) => string;
};
