import '~/shopify-app-remix/server/adapters/node';
import '~/shopify-api/adapters/web-api';

import { PrismaSessionStorage } from './prisma-session-storage.server';
import { restResources } from '~/shopify-api/rest/admin/2024-01';
import type { Session, WebhookHandler } from '~/shopify-api/lib';
import { InitStore } from '~/modules/init-store.server';
import { getConfig } from './get-config.server';
import { prisma } from './prisma.server';

import { ApiVersion, AppDistribution, DeliveryMethod, shopifyApp } from '~/shopify-app-remix/server';

const _config = getConfig();
const webhookHandler: WebhookHandler = {
  deliveryMethod: DeliveryMethod.Http,
  callbackUrl: '/webhooks',
};

export const shopify = shopifyApp({
  isEmbeddedApp: true,
  apiKey: _config.apiKey,
  apiSecretKey: _config.apiSecretKey,
  apiVersion: ApiVersion.January24,
  scopes: _config.scopes,
  appUrl: _config.appUrl.toString(),
  authPathPrefix: '/auth',
  sessionStorage: new PrismaSessionStorage(prisma),
  distribution: AppDistribution.AppStore,
  restResources,
  webhooks: {
    APP_UNINSTALLED: webhookHandler,
    PRODUCTS_UPDATE: webhookHandler,
    PRODUCTS_CREATE: webhookHandler,
    PRODUCTS_DELETE: webhookHandler,
    COLLECTIONS_UPDATE: webhookHandler,
    COLLECTIONS_CREATE: webhookHandler,
    COLLECTIONS_DELETE: webhookHandler,
    BULK_OPERATIONS_FINISH: webhookHandler,
    ORDERS_CREATE: webhookHandler,
    ORDERS_UPDATED: webhookHandler,
    REFUNDS_CREATE: webhookHandler,
    ORDERS_FULFILLED: webhookHandler,
    ORDERS_PARTIALLY_FULFILLED: webhookHandler,
    CUSTOMERS_REDACT: webhookHandler,
    CUSTOMERS_DATA_REQUEST: webhookHandler,
    SHOP_REDACT: webhookHandler,
  },
  hooks: {
    afterAuth: async ({ session }) => {
      await shopify.registerWebhooks({ session });

      console.log(`Webhooks registered for shop ${session.shop}`);
      console.log('Topics:');

      for (const topic of shopify.api.webhooks.getTopicsAdded()) {
        console.log(` - ${topic}`);
      }

      await new InitStore(session).run();
    },
  },
  future: {
    v3_authenticatePublic: true,
    v3_webhookAdminContext: true,
  },
  ...(process.env.SHOP_CUSTOM_DOMAIN
    ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
    : {}),
});

export function getShopifyGQLClient(session: Session) {
  return new shopify.api.clients.Graphql({
    session: session,
    apiVersion: ApiVersion.January24,
  });
}

export function getShopifyRestClient(session: Session) {
  return new shopify.api.clients.Rest({
    session: session,
    apiVersion: ApiVersion.January24,
  });
}
