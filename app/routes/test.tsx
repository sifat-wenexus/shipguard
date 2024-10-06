import { ActionFunctionArgs, json, LoaderFunction } from '@remix-run/node';
import { ClaimRequestAdminTemplate } from './settings.email-template/email-template/template';
import { sendMail } from '~/modules/send-mail.server';
import { prisma } from '~/modules/prisma.server';
export const loader: LoaderFunction = async ({ request }) => {
  const claimReqTemplate = new ClaimRequestAdminTemplate();
  const res = await prisma.emailTemplate.findFirstOrThrow({
    where: {
      name: 'CLAIM_REQUEST_EMAIL_FOR_ADMIN',
      storeId: 'gid://shopify/Shop/55079829551',
    },
  });
  const email = await sendMail({
    template: 'CLAIM_REQUEST_EMAIL_FOR_ADMIN',
    storeId: 'gid://shopify/Shop/55079829551',
    to: 'jahangir@wenexus.io',
    internal: true,
    variables: {
      claim_date: `'{data?.claimDate}'`,
      claim_reason: `data?.PackageProtectionClaimOrder[0].comments!`,
      order_id: `data?.orderName`,
      customer_name: `{data?.customerFirstName}  {data?.customerLastName}`,
      shop_name: `data?.Store.name`,
      order_url: `https://admin.shopify.com/store/{data.Store.name}/orders/{orderId}`,
    },
    // from: 'sifat@gmail.com',
  });
  console.log('first', email);

  return json({ message: 'Response', email, res });
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
