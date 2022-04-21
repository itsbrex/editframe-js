import { Hashided, Timestamped } from 'constant/common'

export enum ApiApplicationKey {
  description = 'description',
  id = 'id',
  name = 'name',
  webhook = 'webhook',
}

export type ApiApplication = Hashided &
  Timestamped & {
    [ApiApplicationKey.description]: string
    [ApiApplicationKey.name]: string
    [ApiApplicationKey.webhook]: string
  }
