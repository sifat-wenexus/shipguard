import { getGoogleAuthClient } from '~/modules/get-google-auth-client.server';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { shopify } from '~/modules/shopify.server';
import { prisma } from '~/modules/prisma.server';
import crypto from 'crypto';

export async function loader(args: LoaderFunctionArgs) {
  const { session } = await shopify.authenticate.admin(args.request);
  const state = crypto.randomBytes(16).toString('hex');

  await prisma.googleOAuthState.create({
    data: {
      storeId: session.storeId!,
      state,
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
      state
    )}`,
  });

  return new Response(url);
}
