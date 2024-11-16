import {setAbstractRuntimeString} from '~/shopify-api/runtime';

setAbstractRuntimeString(() => {
  return `Remix`;
});

export {
  LATEST_API_VERSION,
  LogSeverity,
  DeliveryMethod,
  BillingInterval,
  ApiVersion,
} from '~/shopify-api/lib';

export type {ShopifyApp, LoginError} from './types';
export {LoginErrorType, AppDistribution} from './types';
export {boundary} from './boundary';
export {shopifyApp} from './shopify-app';
