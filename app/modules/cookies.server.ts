import { createCookie } from '@remix-run/node';

export const cookieContainer = createCookie('cookie-container', {
  maxAge: 604_800,
  httpOnly: false,
  secure: true,
  sameSite: 'none',
});
