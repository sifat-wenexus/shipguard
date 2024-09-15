import type { Credentials} from 'google-auth-library';
import { OAuth2Client } from 'google-auth-library';
import { prisma } from '~/modules/prisma.server';
import process from 'node:process';

export async function getGmailAuthClient(storeId?: string) {
  const client = new OAuth2Client(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    process.env.GMAIL_OAUTH_REDIRECT_URI,
  );

  if (!storeId) {
    return client;
  }

  const credential = await prisma.gmailAuthCredential.findFirst({
    where: {
      id: storeId,
    },
  });

  if (!credential?.payload) {
    return null;
  }

  client.setCredentials(credential.payload as Credentials);

  client.on('tokens', (tokens) => {
    prisma.gmailAuthCredential.update({
      where: {
        id: storeId,
      },
      data: {
        payload: JSON.parse(JSON.stringify(tokens)),
      },
    });
  });

  return client;
}
