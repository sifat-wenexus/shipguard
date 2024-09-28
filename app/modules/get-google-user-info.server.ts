import { getGoogleAuthClient } from '~/modules/get-google-auth-client.server';
import { google } from 'googleapis';

export async function getGoogleUserInfo(storeId: string) {
  const oauthClient = await getGoogleAuthClient(storeId);

  if (!oauthClient) {
    return null;
  }

  const userInfo = await google.oauth2('v2').userinfo.get({
    auth: oauthClient,
  });

  return userInfo.data;
}
