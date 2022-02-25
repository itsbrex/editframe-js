import { Hashided, Timestamped } from "./common";

export enum ApplicationAttribute {
  description = "description",
  lastUsedAt = "lastUsedAt",
  name = "name",
  webhook = "webhook",
}

export type Application = Hashided &
  Timestamped & {
    [ApplicationAttribute.description]: string;
    [ApplicationAttribute.lastUsedAt]: string;
    [ApplicationAttribute.name]: string;
    [ApplicationAttribute.webhook]: string;
  };
