import { Client, RequestParams, ApiResponse } from '@elastic/elasticsearch'

export const client = new Client({ node: 'http://localhost:9200' })