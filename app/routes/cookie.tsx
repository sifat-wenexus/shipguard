import { createCookie, json, LoaderFunctionArgs } from '@remix-run/node';
import { createDynamicCookie } from '~/utils/cookie';

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get('cookie');

  const cookie = createCookie('shipping-insurance-guideline');
  return json({
    message: 'Welcome to the Remix app!',
    cookie,
    cookieHeader,
  });
}

export async function action({ request }) {
  const formData = await request.formData();

  // Get dynamic name, value, and expiration time from the form data
  const cookieName = formData.get('name');
  const cookieValue = formData.get('value');
  const cookieMaxAge = formData.get('maxAge'); // Optional

  if (!cookieName || !cookieValue) {
    return json(
      { error: 'Cookie name and value are required.' },
      { status: 400 }
    );
  }

  // Set a dynamic cookie
  const cookie = await createDynamicCookie(
    cookieName,
    cookieValue,
    cookieMaxAge
  );

  return json(
    { message: 'Cookie has been set dynamically.' },
    {
      headers: {
        'Set-Cookie': cookie, // Set the dynamic cookie in response headers
      },
    }
  );
}
