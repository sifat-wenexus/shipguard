import { LoaderFunction } from '@remix-run/node';
import { findOfflineSession } from '~/modules/find-offline-session.server';

export const loader: LoaderFunction = async ({ request }) => {
  let url = new URL(request.url);

  let searchParams = url.searchParams;
  const params = Object.fromEntries(searchParams.entries());
  const session = findOfflineSession(params.shop);

  const accessToken = (await session.then((res) => res)).accessToken;
  console.log(accessToken);
  const response = await fetch(
    `https://nexusapp.myshopify.com//?sections=footer`,
    {
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': `${accessToken}`,
      },
    }
  );

  const value = await response.text();
  console.log(value);
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <div id="app-root"></div>
<script src="https://your-remix-app-url.com/embed.js"></script>

        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My HTML from Loader</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                padding: 20px;
            }
            h1 {
                color: #333;
            }
            p {
                color: #666;
            }
        </style>
    </head>
    <body>
${value}
        <h1>Hello from the Loader!</h1>
        <p>This is an example of sending HTML and CSS directly from a Remix loader function.</p>
    </body>
    </html>
  `;

  return new Response(value, {
    status: 200,
    headers: {
      'Content-Type': 'text/html',
    },
  });
};
