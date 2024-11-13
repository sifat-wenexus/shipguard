import { getGoogleAuthClient } from '~/modules/get-google-auth-client.server';
import { findOfflineSession } from '~/modules/find-offline-session.server';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { queryProxy } from '~/modules/query/query-proxy';
import { prisma } from '~/modules/prisma.server';

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const state = url.searchParams.get('state');
  const code = url.searchParams.get('code');

  if (!state || !code) {
    return new Response(
      `
      <html lang="en">
        <head>
          <title>Invalid request</title>
        </head>
        <body>
          <h1 style="text-align: center;">Invalid request</h1>
        </body>
      </html>
    `,
      {
        headers: {
          'Content-Type': 'text/html',
        },
      }
    );
  }

  const [storeId, oauthState] = state.split('&').map(decodeURIComponent);

  try {
    await prisma.googleAuthCredential.findFirstOrThrow({
      where: {
        id: storeId,
        oauthState,
      },
    });
  } catch (e) {
    return new Response(
      `
      <html lang="en">
        <head>
          <title>Invalid request</title>
        </head>
        <body>
          <h1 style="text-align: center;">Invalid request</h1>
        </body>
      </html>
    `,
      {
        headers: {
          'Content-Type': 'text/html',
        },
      }
    );
  }

  const client = await getGoogleAuthClient();
  const tokenResponse = await client!.getToken(code);

  const store = await prisma.store.findUniqueOrThrow({
    where: {
      id: storeId,
    },
  });

  const session = await findOfflineSession(store.domain);

  await queryProxy.googleAuthCredential.update(
    {
      where: {
        id: storeId,
      },
      data: {
        payload: JSON.parse(JSON.stringify(tokenResponse.tokens)),
      },
    },
    { session: session || undefined }
  );

  const smtpSetting = await queryProxy.smtpSetting.findUnique({
    where: {
      id: storeId,
    },
  });

  if (!smtpSetting) {
    await queryProxy.smtpSetting.create(
      {
        data: {
          provider: 'google',
        },
      },
      { session: session || undefined }
    );
  }

  return new Response(
    `
    <html lang="en">
      <head>
        <title>Success</title>
      </head>
      <body>
        <h1 style="text-align: center;">
          Success! You can close this tab now.
        </h1>
      </body>
    </html>
  `,
    {
      headers: {
        'Content-Type': 'text/html',
      },
    }
  );
}
