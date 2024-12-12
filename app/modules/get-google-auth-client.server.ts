import type { Credentials } from 'google-auth-library';
import { OAuth2Client } from 'google-auth-library';
import { prisma } from '~/modules/prisma.server';
import process from 'node:process';
import _ from 'lodash';

export async function getGoogleAuthClient(storeId?: string) {
  const client = new OAuth2Client(
    process.env.GMAIL_CLIENT_USER_ID,
    process.env.GMAIL_CLIENT_SECRET,
    process.env.GMAIL_OAUTH_REDIRECT_URI
  );

  if (!storeId) {
    return client;
  }

  const credential = await prisma.googleAuthCredential.findFirst({
    where: {
      storeId: storeId,
      connected: true,
    },
  });

  if (!credential?.payload) {
    return null;
  }

  try {
    client.setCredentials(credential.payload as Credentials);
  } catch (e) {
    console.error(e);
    return null;
  }

  client.on('tokens', async (tokens) => {
    const oldCredential = await prisma.googleAuthCredential.findFirstOrThrow({
      where: {
        storeId: storeId,
        connected: true,
      },
    });

    prisma.googleAuthCredential.update({
      where: {
        id: oldCredential.id,
      },
      data: {
        payload: JSON.parse(
          JSON.stringify(_.merge(oldCredential.payload, tokens))
        ),
      },
    });
  });

  return client;
}

export async function getGoogleAuthClients(storeId: string, connected?: boolean) {
  const credentials = await prisma.googleAuthCredential.findMany({
    where: {
      storeId: storeId,
      connected,
    },
  });

  const clients: OAuth2Client[] = [];

  for (const credential of credentials) {
    const client = new OAuth2Client(
      process.env.GMAIL_CLIENT_USER_ID,
      process.env.GMAIL_CLIENT_SECRET,
      process.env.GMAIL_OAUTH_REDIRECT_URI
    );

    try {
      client.setCredentials(credential.payload as Credentials);
    } catch (e) {
      console.error(e);
      continue;
    }

    client.on('tokens', async (tokens) => {
      const oldCredential = await prisma.googleAuthCredential.findFirstOrThrow({
        where: {
          storeId: storeId,
          connected: true,
        },
      });

      prisma.googleAuthCredential.update({
        where: {
          id: oldCredential.id,
        },
        data: {
          payload: JSON.parse(
            JSON.stringify(_.merge(oldCredential.payload, tokens))
          ),
        },
      });
    });

    clients.push(client);
  }

  return clients;
}
