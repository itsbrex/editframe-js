import { ApiInterface } from 'constant'

export const mockApi = ({ get, post, put }: { get: any; post: any; put: any }): ApiInterface => ({
  get,
  post,
  put,
})
