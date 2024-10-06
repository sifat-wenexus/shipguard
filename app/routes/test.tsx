import { ActionFunctionArgs, json, LoaderFunction } from '@remix-run/node';
import { ClaimRequestAdminTemplate } from './settings.email-template/email-template/template';
export const loader: LoaderFunction = async ({ request }) => {
  const claimReqTemplate = new ClaimRequestAdminTemplate();

  const res = await claimReqTemplate.render({
    order_id: '#1234',
    customer_name: 'jahangir',
    claim_reason: 'testing',
    claim_date: '10-jan-2024',
    shop_name: 'nexusapp',
    order_url: 'www.google.com',
  });
  return json({ res, message: 'Response' });
};

export async function action({ request }: ActionFunctionArgs) {
  // const ctx = await shopify.authenticate.admin(request);
  const body = await request.formData();
  const file = body.get('file');
  const id = body.get('id');
  const action = body.get('action');
  return json({
    data: {
      file,
      name: 'action',
      age: 12,
      address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zip: '12345',
      },
    },
  });
}
