import {
  BillingRequestResponseObject,
  HttpResponseError,
  Session,
} from '~/shopify-api/lib';
import {redirect} from '@remix-run/server-runtime';

import {AppConfigArg} from '../../../config-types';
import {BasicParams} from '../../../types';
import {getAppBridgeHeaders, redirectToAuthPage} from '../helpers';

import type {RequestBillingOptions} from './types';

export function requestBillingFactory<Config extends AppConfigArg>(
  params: BasicParams,
  request: Request,
  session: Session,
) {
  return async function requestBilling({
    plan,
    isTest,
    returnUrl,
    ...overrides
  }: RequestBillingOptions<Config>): Promise<never> {
    const {api, logger} = params;

    logger.info('Requesting billing', {
      shop: session.shop,
      plan,
      isTest,
      returnUrl,
    });

    let result: BillingRequestResponseObject;
    try {
      result = await api.billing.request({
        plan: plan as string,
        session,
        isTest,
        returnUrl,
        returnObject: true,
        ...overrides,
      });
    } catch (error) {
      if (error instanceof HttpResponseError && error.response.code === 401) {
        logger.debug('API token was invalid, redirecting to OAuth', {
          shop: session.shop,
        });
        throw await redirectToAuthPage(params, request, session.shop);
      } else {
        throw error;
      }
    }

    throw redirectOutOfApp(
      params,
      request,
      result.confirmationUrl,
      session.shop,
    );
  };
}

function redirectOutOfApp(
  params: BasicParams,
  request: Request,
  url: string,
  shop: string,
): never {
  const {config, logger} = params;

  logger.debug('Redirecting out of app', {url});

  const requestUrl = new URL(request.url);
  const isEmbeddedRequest = requestUrl.searchParams.get('embedded') === '1';
  const isXhrRequest = request.headers.get('authorization');

  if (isXhrRequest) {
    // eslint-disable-next-line no-warning-comments
    // TODO Check this with the beta flag disabled (with the bounce page)
    // Remix is not including the X-Shopify-API-Request-Failure-Reauthorize-Url when throwing a Response
    // https://github.com/remix-run/remix/issues/5356
    throw new Response(undefined, {
      status: 401,
      statusText: 'Unauthorized',
      headers: getAppBridgeHeaders(url),
    });
  } else if (isEmbeddedRequest) {
    const params = new URLSearchParams({
      shop,
      host: requestUrl.searchParams.get('host')!,
      exitIframe: url,
    });

    throw redirect(`${config.auth.exitIframePath}?${params.toString()}`);
  } else {
    // This will only ever happen for non-embedded apps, because the authenticator will stop before reaching this point
    throw redirect(url);
  }
}
