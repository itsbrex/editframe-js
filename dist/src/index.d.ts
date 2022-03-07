import { EditframeOptions } from 'constant';
import { Applications, Videos } from 'features';
export declare class Editframe {
    applications: Applications;
    videos: Videos;
    private _api;
    private _clientId;
    private _host;
    private _token;
    private _version;
    constructor({ clientId, host, token, version }: EditframeOptions);
    get clientId(): string;
    get host(): string;
    get token(): string;
    get version(): number;
}
