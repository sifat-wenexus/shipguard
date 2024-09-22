import { createCookie } from '@remix-run/node';

export function createDynamicCookie(name, value, maxAge) {
  const cookie = createCookie(name, {
    maxAge: maxAge || 60 * 60 * 24 * 30, // Default to 30 days if not provided
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
  });
  return cookie.serialize(value);
}
