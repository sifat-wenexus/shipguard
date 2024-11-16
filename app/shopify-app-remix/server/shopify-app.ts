import {
  ConfigInterface as ApiConfig,
  LATEST_API_VERSION,
  ShopifyError,
  ShopifyRestResources,
  shopifyApi,
} from '~/shopify-api/lib';
import {SessionStorage} from '~/shopify-session-storage';

import {type AppConfig, type AppConfigArg} from './config-types';
import {
  AppDistribution,
  type BasicParams,
  type MandatoryTopics,
  type ShopifyApp,
  type ShopifyAppBase,
  type AdminApp,
  type SingleMerchantApp,
  type AppStoreApp,
} from './types';
import {SHOPIFY_REMIX_LIBRARY_VERSION} from './version';
import {registerWebhooksFactory} from './authenticate/webhooks';
import {AuthStrategy} from './authenticate/admin/authenticate';
import {authenticateWebhookFactory} from './authenticate/webhooks/authenticate';
import {overrideLogger} from './override-logger';
import {addDocumentResponseHeadersFactory} from './authenticate/helpers';
import {loginFactory} from './authenticate/login/login';
import {unauthenticatedAdminContextFactory} from './unauthenticated/admin';
import {authenticatePublicFactory} from './authenticate/public';
import {unauthenticatedStorefrontContextFactory} from './unauthenticated/storefront';

/**
 * Creates an object your app will use to interact with Shopify.
 *
 * @param appConfig Configuration options for your Shopify app, such as the scopes your app needs.
 * @returns `ShopifyApp` An object constructed using your appConfig.  It has methods for interacting with Shopify.
 *
 * @example
 * <caption>The minimum viable configuration</caption>
 * ```ts
 * import { shopifyApp } from "~/shopify-app-remix/server";
 *
 * const shopify = shopifyApp({
 *   apiKey: process.env.SHOPIFY_API_KEY!,
 *   apiSecretKey: process.env.SHOPIFY_API_SECRET!,
 *   scopes: process.env.SCOPES?.split(",")!,
 *   appUrl: process.env.SHOPIFY_APP_URL!,
 * });
 * export default shopify;
 * ```
 */
export function shopifyApp<
  Config extends AppConfigArg<Resources, Storage>,
  Resources extends ShopifyRestResources,
  Storage extends SessionStorage,
>(appConfig: Config): ShopifyApp<Config> {
  const api = deriveApi(appConfig);
  const config = deriveConfig<Storage>(appConfig, api.config);
  const logger = overrideLogger(api.logger);

  if (appConfig.webhooks) {
    api.webhooks.addHandlers(appConfig.webhooks);
  }

  const params: BasicParams = {api, config, logger};
  const oauth = new AuthStrategy<Config, Resources>(params);

  const shopify:
    | AdminApp<Config>
    | AppStoreApp<Config>
    | SingleMerchantApp<Config> = {
    api,
    sessionStorage: config.sessionStorage,
    addDocumentResponseHeaders: addDocumentResponseHeadersFactory(params),
    registerWebhooks: registerWebhooksFactory(params),
    authenticate: {
      admin: oauth.authenticateAdmin.bind(oauth),
      public: authenticatePublicFactory<Config['future'], Resources>(params),
      webhook: authenticateWebhookFactory<
        Config['future'],
        Resources,
        keyof Config['webhooks'] | MandatoryTopics
      >(params),
    },
    unauthenticated: {
      admin: unauthenticatedAdminContextFactory(params),
      storefront: unauthenticatedStorefrontContextFactory(params),
    },
  };

  if (
    isAppStoreApp(shopify, appConfig) ||
    isSingleMerchantApp(shopify, appConfig)
  ) {
    shopify.login = loginFactory(params);
  }

  return shopify as ShopifyApp<Config>;
}

function isAppStoreApp<Config extends AppConfigArg>(
  _shopify: ShopifyAppBase<Config>,
  config: Config,
): _shopify is AppStoreApp<Config> {
  return config.distribution === AppDistribution.AppStore;
}

function isSingleMerchantApp<Config extends AppConfigArg>(
  _shopify: ShopifyAppBase<Config>,
  config: Config,
): _shopify is SingleMerchantApp<Config> {
  return config.distribution === AppDistribution.SingleMerchant;
}

export function deriveApi(appConfig: AppConfigArg) {
  let appUrl: URL;
  try {
    appUrl = new URL(appConfig.appUrl);
  } catch (error) {
    throw new ShopifyError(
      'Invalid appUrl provided. Please provide a valid URL.',
    );
  }

  /* eslint-disable no-process-env */
  if (appUrl.hostname === 'localhost' && !appUrl.port && process.env.PORT) {
    appUrl.port = process.env.PORT;
  }
  /* eslint-enable no-process-env */
  appConfig.appUrl = appUrl.origin;

  let userAgentPrefix = `Shopify Remix Library v${SHOPIFY_REMIX_LIBRARY_VERSION}`;
  if (appConfig.userAgentPrefix) {
    userAgentPrefix = `${appConfig.userAgentPrefix} | ${userAgentPrefix}`;
  }

  return shopifyApi({
    ...appConfig,
    hostName: appUrl.host,
    hostScheme: appUrl.protocol.replace(':', '') as 'http' | 'https',
    userAgentPrefix,
    isEmbeddedApp: appConfig.isEmbeddedApp ?? true,
    apiVersion: appConfig.apiVersion ?? LATEST_API_VERSION,
    isCustomStoreApp: appConfig.distribution === AppDistribution.ShopifyAdmin,
  });
}

function deriveConfig<Storage extends SessionStorage>(
  appConfig: AppConfigArg,
  apiConfig: ApiConfig,
): AppConfig<Storage> {
  if (!appConfig.sessionStorage) {
    throw new ShopifyError(
      'Please provide a valid session storage. Refer to https://github.com/Shopify/shopify-app-js/blob/main/README.md#session-storage-options for options.',
    );
  }

  const authPathPrefix = appConfig.authPathPrefix || '/auth';
  appConfig.distribution = appConfig.distribution ?? AppDistribution.AppStore;

  return {
    ...appConfig,
    ...apiConfig,
    canUseLoginForm: appConfig.distribution !== AppDistribution.ShopifyAdmin,
    useOnlineTokens: appConfig.useOnlineTokens ?? false,
    hooks: appConfig.hooks ?? {},
    sessionStorage: appConfig.sessionStorage as Storage,
    future: appConfig.future ?? {},
    auth: {
      path: authPathPrefix,
      callbackPath: `${authPathPrefix}/callback`,
      patchSessionTokenPath: `${authPathPrefix}/session-token`,
      exitIframePath: `${authPathPrefix}/exit-iframe`,
      loginPath: `${authPathPrefix}/login`,
    },
  };
}
