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
        connected: true,
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
   <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Success</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #ffffff;
      color: #333333;
    }
    .container {
      background-color: #f5f5f5;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      text-align: center;
      max-width: 600px;
      margin: 50px auto;
    }
    .icon-container {
      width: fit-content;
      margin: auto;
    }
    .icon-container svg {
      width: 100px;
      height: 100px;
      fill: green;
    }
    h2 {
      font-size: 24px;
      font-weight: 600;
      line-height: 35px;
      margin: 20px 0;
    }
    p {
      font-size: 16px;
      line-height: 24px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="icon-container">
      <svg
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 305.002 305.002"
        xml:space="preserve"
      >
        <g>
          <g>
            <path
              d="M152.502,0.001C68.412,0.001,0,68.412,0,152.501s68.412,152.5,152.502,152.5c84.089,0,152.5-68.411,152.5-152.5
              S236.591,0.001,152.502,0.001z M152.502,280.001C82.197,280.001,25,222.806,25,152.501c0-70.304,57.197-127.5,127.502-127.5
              c70.304,0,127.5,57.196,127.5,127.5C280.002,222.806,222.806,280.001,152.502,280.001z"
            />
            <path
              d="M218.473,93.97l-90.546,90.547l-41.398-41.398c-4.882-4.881-12.796-4.881-17.678,0c-4.881,4.882-4.881,12.796,0,17.678
              l50.237,50.237c2.441,2.44,5.64,3.661,8.839,3.661c3.199,0,6.398-1.221,8.839-3.661l99.385-99.385
              c4.881-4.882,4.881-12.796,0-17.678C231.269,89.089,223.354,89.089,218.473,93.97z"
            />
          </g>
        </g>
      </svg>
    </div>
    <h2>Google OAuth 2.0 Connected Successfully!</h2>
    <p>
      Your email integration is now active. You can start sending notifications seamlessly.
    </p>
    <br/>
 <button
  style="background-color:green; color:white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; width: 100%;"
  onclick="window.close()"
>
  Close Tab
</button>


  </div>
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
