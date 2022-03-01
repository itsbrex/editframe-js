import { Hashided, Timestamped } from 'constant/common'

export enum ApiApplicationAttribute {
  description = 'description',
  lastUsedAt = 'lastUsedAt',
  name = 'name',
  webhook = 'webhook',
}

export type ApiApplication = Hashided &
  Timestamped & {
    [ApiApplicationAttribute.description]: string
    [ApiApplicationAttribute.lastUsedAt]: string
    [ApiApplicationAttribute.name]: string
    [ApiApplicationAttribute.webhook]: string
  }
