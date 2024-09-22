import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from '@remix-run/node';
import Dashboard from './dashboard';
import { Page } from '@shopify/polaris';
import { useLoaderData } from '@remix-run/react';

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get('cookie');
  // const cookie = (await guidelineCookie.parse(cookieHeader)) || {};
  return json({ guidelineVisibility: cookieHeader }); // cookie.guidelineVisibility });
}

const App = () => {
  const { guidelineVisibility } = useLoaderData<typeof loader>();
  console.log('guidelineVisibility', guidelineVisibility);
  return (
    <Page>
      <Dashboard guidelineVisibility={guidelineVisibility} />
    </Page>
  );
};

export default App;
