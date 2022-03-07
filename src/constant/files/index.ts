import { PassThrough } from 'stream'

export interface FetchResponse extends Response {
  readonly body: PassThrough & (ReadableStream<Uint8Array> | null)
}
