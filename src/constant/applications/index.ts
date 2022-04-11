import { Hashided, Timestamped } from 'constant/common'

export enum ApiApplicationAttribute {
  description = 'description',
  id = 'id',
  name = 'name',
  webhook = 'webhook',
}

export type ApiApplication = Hashided &
  Timestamped & {
    [ApiApplicationAttribute.description]: string
    [ApiApplicationAttribute.name]: string
    [ApiApplicationAttribute.webhook]: string
  }
