import { getGoogleAuthClient } from '~/modules/get-google-auth-client.server';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { shopify } from '~/modules/shopify.server';
import { prisma } from '~/modules/prisma.server';
import crypto from 'crypto';

export async function loader(args: LoaderFunctionArgs) {
  const { session } = await shopify.authenticate.admin(args.request);

  const randomState = crypto.randomBytes(16).toString('hex');

  await prisma.googleAuthCredential.upsert({
    create: {
      id: session.storeId!,
      oauthState: randomState,
      connected: true,
    },
    update: {
      oauthState: randomState,
      connected: true,
    },
    where: {
      id: session.storeId,
    },
  });

  const client = await getGoogleAuthClient();

  const url = client!.generateAuthUrl({
    scope: [
      'https://www.googleapis.com/auth/gmail.send',
      'openid',
      'email',
      'profile',
    ],
    redirect_uri: process.env.GMAIL_OAUTH_REDIRECT_URI,
    access_type: 'offline',
    state: `${encodeURIComponent(session.storeId!)}&${encodeURIComponent(
      randomState
    )}`,
  });

  return new Response(url);
}
