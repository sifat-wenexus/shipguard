import { json, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Page } from '@shopify/polaris';
import Dashboard from './dashboard';

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get('cookie');
  return json({ guidelineVisibility: cookieHeader });
}

const App = () => {
  const { guidelineVisibility } = useLoaderData<typeof loader>();
  return (
    <Page>
      <Dashboard guidelineVisibility={guidelineVisibility} />
    </Page>
  );
};

export default App;
