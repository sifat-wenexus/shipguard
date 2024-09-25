import { createDynamicCookie } from '~/utils/cookie';
import { json } from '@remix-run/node';

export async function action({ request }) {
  const formData = await request.formData();

  const cookieName = formData.get('name');
  const cookieValue = formData.get('value');
  const cookieMaxAge = formData.get('maxAge');

  if (!cookieName || !cookieValue) {
    return json(
      { error: 'Cookie name and value are required.' },
      { status: 400 }
    );
  }

  const cookie = await createDynamicCookie(
    cookieName,
    cookieValue,
    cookieMaxAge
  );

  return json(
    { message: 'Cookie has been set dynamically.' },
    {
      headers: {
        'Set-Cookie': cookie,
      },
    }
  );
}
