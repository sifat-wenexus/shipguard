import { getGoogleAuthClient } from '~/modules/get-google-auth-client.server';
import type { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';

export async function getGoogleUserInfo(
  clientOrStoreId: string | OAuth2Client
) {
  const oauthClient =
    typeof clientOrStoreId === 'string'
      ? await getGoogleAuthClient(clientOrStoreId)
      : clientOrStoreId;

  if (!oauthClient) {
    return null;
  }

  try {
    const userInfo = await google.oauth2('v2').userinfo.get({
      auth: oauthClient,
    });

    return userInfo.data;
  } catch (e) {
    console.error(e);
    return null;
  }
}
