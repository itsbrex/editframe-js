import FormData from 'form-data';
import { ApiInterface, ApiOptions } from 'constant';
export declare class Api implements ApiInterface {
    private _options;
    private _fetch;
    constructor(options: ApiOptions);
    get({ url }: {
        url: string;
    }): Promise<unknown>;
    post({ data, isForm, url, }: {
        data: FormData | Record<string, any>;
        isForm: boolean;
        url: string;
    }): Promise<unknown>;
    put({ data, isForm, url, }: {
        data: FormData | Record<string, any>;
        isForm: boolean;
        url: string;
    }): Promise<unknown>;
}
