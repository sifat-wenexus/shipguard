import {Session} from '~/shopify-api/lib';

import {BasicParams} from '../../types';

export async function getOfflineSession(
  shop: string,
  {api, config}: BasicParams,
): Promise<Session | undefined> {
  const offlineSessionId = api.session.getOfflineId(shop);
  const session = await config.sessionStorage.loadSession(offlineSessionId);

  return session;
}
