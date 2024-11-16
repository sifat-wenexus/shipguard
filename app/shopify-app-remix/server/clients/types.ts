import {ApiVersion} from '~/shopify-api/lib';

interface QueryVariables {
  [key: string]: any;
}

export interface GraphQLQueryOptions {
  variables?: QueryVariables;
  apiVersion?: ApiVersion;
  headers?: {[key: string]: any};
  tries?: number;
}

export type GraphQLClient = (
  query: string,
  options?: GraphQLQueryOptions,
) => Promise<Response>;
