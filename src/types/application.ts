/* eslint-disable camelcase */
import { Hashided, Timestamped } from './common'

export type Application = Hashided & Timestamped & {
  is_live: boolean
  name: string
}
/* eslint-enable camelcase */
