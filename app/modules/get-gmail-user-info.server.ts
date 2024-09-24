import { getGmailAuthClient } from '~/modules/get-gmail-auth-client.server';
import { google } from 'googleapis';

export async function getGmailUserInfo(storeId: string) {
  const oauthClient = await getGmailAuthClient(storeId);

  if (!oauthClient) {
    return null;
  }

  const userInfo = await google.oauth2('v2').userinfo.get({
    auth: oauthClient,
  });

  return userInfo.data;
}
