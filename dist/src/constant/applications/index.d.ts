import { Hashided, Timestamped } from 'constant/common';
export declare enum ApiApplicationAttribute {
    description = "description",
    lastUsedAt = "lastUsedAt",
    name = "name",
    webhook = "webhook"
}
export declare type ApiApplication = Hashided & Timestamped & {
    [ApiApplicationAttribute.description]: string;
    [ApiApplicationAttribute.lastUsedAt]: string;
    [ApiApplicationAttribute.name]: string;
    [ApiApplicationAttribute.webhook]: string;
};
