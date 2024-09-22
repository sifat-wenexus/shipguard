import type { LoaderFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  if (url.searchParams.get('shop')) {
    return redirect(`/dashboard?${url.searchParams.toString()}`);
  }

  return redirect(`/auth/login`);
}
