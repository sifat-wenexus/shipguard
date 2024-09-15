import { getGmailAuthClient } from '~/modules/get-gmail-auth-client.server';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { shopify } from '~/modules/shopify.server';
import { prisma } from '~/modules/prisma.server';
import crypto from 'crypto';

export async function loader(args: LoaderFunctionArgs) {
  const { session } = await shopify.authenticate.admin(args.request);

  const randomState = crypto.randomBytes(16).toString('hex');

  await prisma.gmailAuthCredential.upsert({
    create: {
      id: session.storeId!,
      oauthState: randomState,
    },
    update: {
      oauthState: randomState,
    },
    where: {
      id: session.storeId,
    },
  });

  const client = await getGmailAuthClient();

  const url = client!.generateAuthUrl({
    scope: 'https://www.googleapis.com/auth/gmail.send',
    redirect_uri: process.env.GMAIL_OAUTH_REDIRECT_URI,
    access_type: 'offline',
    state: `${encodeURIComponent(session.storeId!)}&${encodeURIComponent(randomState)}`,
  });

  return new Response(url);
}
