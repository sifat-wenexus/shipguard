import { jobRunner } from '~/modules/job/job-runner.server';
import type { ActionFunctionArgs} from '@remix-run/node';
import { shopify } from '~/modules/shopify.server';
import { Button } from '@shopify/polaris';
import { Form } from '@remix-run/react';
import { json } from '@remix-run/node';

export async function action({ request }: ActionFunctionArgs) {
  const ctx = await shopify.authenticate.admin(request);

  jobRunner.run({
    name: 'import-products',
    storeId: ctx.session.storeId,
  });

  return json({ message: 'Job started' });
}


function Test() {
  return (
    <Form method='POST'>
      <Button submit>Submit</Button>
    </Form>
  );
}

export default Test;
