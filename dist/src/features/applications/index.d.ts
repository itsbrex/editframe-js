import { ApiApplication, ApiInterface } from 'constant';
export declare class Applications {
    private _api;
    constructor(api: ApiInterface);
    all(): Promise<ApiApplication[]>;
    get(id: string): Promise<ApiApplication | undefined>;
}
