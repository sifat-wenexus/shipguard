import { json, LinksFunction } from '@remix-run/node';
import {
  Box,
  Button,
  Card,
  Icon,
  Layout,
  Page,
  Text,
  TextField,
} from '@shopify/polaris';
import { ArrowLeftIcon, EditIcon } from '@shopify/polaris-icons';
import style from './styles/route.css';
import { useState } from 'react';
import TextEditor from './components/text-editor';
import { shopify } from '~/modules/shopify.server';
import { prisma } from '~/modules/prisma.server';
import { useLoaderData } from '@remix-run/react';
const reqAdminTemplate = `<p>Dear Admin,</p>
<p>A new claim has been requested for the following order:</p>
<table style="border-collapse: collapse; width: 100.035%; height: 144.574px;" border="1"><colgroup><col style="width: 49.9079%;"><col style="width: 49.9079%;"></colgroup>
<tbody>
<tr style="height: 36.1648px;">
<td>Order ID</td>
<td><strong>{order_ID}</strong></td>
</tr>
<tr style="height: 36.0795px;">
<td>Customer Name</td>
<td><strong>{customer_name}</strong></td>
</tr>
<tr style="height: 36.1648px;">
<td>Claim Reason</td>
<td><strong>{claim_reason}</strong></td>
</tr>
<tr style="height: 36.1648px;">
<td>Claim Date</td>
<td><strong>{claim_date}</strong></td>
</tr>
</tbody>
</table>
<p>Please review the claim request and take appropriate action.</p>
<p>Best regards,<br><strong>Inhouse Shipping Protection</strong> <strong>Team</strong></p>
<p>&nbsp;</p>`;

const reqCustomerTemplate = `<p>Dear {customer_name},</p>
<p>We have received your claim request for Order {order_id}. Our team will review your claim and get back to you within 24hours.</p>
<table style="border-collapse: collapse; width: 100.035%; height: 144.574px;" border="1"><colgroup><col style="width: 49.9079%;"><col style="width: 49.9079%;"></colgroup>
<tbody>
<tr style="height: 36.1648px;">
<td>Order ID</td>
<td><strong>{order_ID}</strong></td>
</tr>
<tr style="height: 36.1648px;">
<td>Claim Reason</td>
<td><strong>{claim_reason}</strong></td>
</tr>
<tr style="height: 36.1648px;">
<td>Claim Date</td>
<td><strong>{claim_date}</strong></td>
</tr>
</tbody>
</table>
<p>If you have any questions, feel free to contact us.</p>
<p>Best regards,<br><strong>{shop_name}</strong></p>
<p>&nbsp;</p>`;

const refundCustomerTemplate = `<p>Dear {customer_name},</p>
<p>Your claim for Order {order_id} has been approved, and a refund of {refund_amount} has been processed. The refund will appear in your account within 24hours.</p>
<table style="border-collapse: collapse; width: 100.035%; height: 144.574px;" border="1"><colgroup><col style="width: 49.9079%;"><col style="width: 49.9079%;"></colgroup>
<tbody>
<tr style="height: 36.1648px;">
<td>Order ID</td>
<td><strong>{order_ID}</strong></td>
</tr>
<tr style="height: 36.1648px;">
<td>Refund Amount</td>
<td><strong>{refund_amount}</strong></td>
</tr>
<tr style="height: 36.1648px;">
<td>Refund Processed On</td>
<td><strong>{date}</strong></td>
</tr>
</tbody>
</table>
<p>Thank you for your patience.</p>
<p>Best regards,<br><strong>{shop_name}</strong></p>
<p>&nbsp;</p>`;

const reOrderCustomerTemplate = `<p>Dear {customer_name},</p>
<p>Your claim for Order {order_id} has been approved, and we have initiated a replacement order. You can expect your new shipment soon.</p>
<table style="border-collapse: collapse; width: 100.035%; height: 144.574px;" border="1"><colgroup><col style="width: 49.9079%;"><col style="width: 49.9079%;"></colgroup>
<tbody>
<tr style="height: 36.1648px;">
<td>Order ID</td>
<td><strong>{order_ID}</strong></td>
</tr>
<tr style="height: 36.1648px;">
<td>Replacement Order ID</td>
<td><strong>{replacement_order_id}</strong></td>
</tr>
<tr style="height: 36.1648px;">
<td>Shipping Details</td>
<td><strong>{shipping_details}</strong></td>
</tr>
</tbody>
</table>
<p>Thank you for your continued support.</p>
<p>Best regards,<br><strong>{shop_name}</strong></p>
<p>&nbsp;</p>`;

const cancelCustomerTemplate = `<p>Dear {customer_name},</p>
<p>Your claim request for Order {order_id} has been canceled. If you have any questions or believe this was done in error, please reach out to our support team.</p>
<table style="border-collapse: collapse; width: 100.035%; height: 144.574px;" border="1"><colgroup><col style="width: 49.9079%;"><col style="width: 49.9079%;"></colgroup>
<tbody>
<tr style="height: 36.1648px;">
<td>Order ID</td>
<td><strong>{order_ID}</strong></td>
</tr>
<tr style="height: 36.1648px;">
<td>Cancellation Reason</td>
<td><strong>{cancellation_reason}</strong></td>
</tr>
</tbody>
</table>
<p>Thank you for your understanding.</p>
<p>Best regards,<br><strong>{shop_name}</strong></p>
<p>&nbsp;</p>`;
export async function loader({ request }) {
  const ctx = await shopify.authenticate.admin(request);
  const templates = await prisma.emailTemplate.findMany({
    where: { storeId: ctx.session.storeId },
  });

  if (!templates.length) {
    const defaultTemplatesPayload: {
      storeId: string;
      body: string;
      subject: string;
    }[] = [
      {
        storeId: ctx.session.storeId!,
        body: reqAdminTemplate,
        subject: 'New Claim Request Submitted: Order {order_ID}',
      },
      {
        storeId: ctx.session.storeId!,
        body: reqCustomerTemplate,
        subject: 'Claim Request Received: Order {order_ID}',
      },
      {
        storeId: ctx.session.storeId!,
        body: refundCustomerTemplate,
        subject: 'Claim Approved: Refund Issued for Order {order_ID}',
      },
      {
        storeId: ctx.session.storeId!,
        body: reOrderCustomerTemplate,
        subject: 'Claim Approved: Replacement Order Confirmed for Order',
      },
      {
        storeId: ctx.session.storeId!,
        body: cancelCustomerTemplate,
        subject: 'Claim Request Canceled: Order {order_ID}',
      },
    ];
    await prisma.emailTemplate.createMany({
      data: defaultTemplatesPayload,
    });
    return json({ message: 'something is wrong', status: false, data: null });
  }
  return json({
    message: 'Successfully fetched templates!',
    data: templates,
    status: true,
  });
}

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: style }];
const EmailTemplate = () => {
  const { data, message } = useLoaderData<typeof loader>();
  const [template, setTemplate] = useState<string>('');
  const [defaultTemplate, setDefaultTemplate] = useState('');
  const [editorState, setEditorState] = useState(null);

  const handleEditButton = (e) => {
    const currentTemplate = data?.find((t) => t.subject === e);
    if (currentTemplate) {
      setTemplate(currentTemplate.subject);
      setDefaultTemplate(currentTemplate.body);
      return;
    }
    if (e === 'Claim Request Email For Admin') {
      setTemplate('New Claim Request Submitted: Order {order_ID}');
      setDefaultTemplate(reqAdminTemplate);
    } else if (e === 'Claim Request Email For Customer') {
      setTemplate('Claim Request Received: Order {order_ID}');
      setDefaultTemplate(reqCustomerTemplate);
    } else if (e === 'Claim Refund Email For Customer') {
      setTemplate('Claim Approved: Refund Issued for Order {order_ID}');
      setDefaultTemplate(refundCustomerTemplate);
    } else if (e === 'Claim Re-order Email For Customer') {
      setTemplate('Claim Approved: Replacement Order Confirmed for Order');
      setDefaultTemplate(reOrderCustomerTemplate);
    } else if (e === 'Claim Cancel Email For Customer') {
      setTemplate('Claim Request Canceled: Order {order_ID}');
      setDefaultTemplate(cancelCustomerTemplate);
    }
  };

  const templateItems = [
    { name: 'Claim Request Email For Admin' },
    { name: 'Claim Request Email For Customer' },
    { name: 'Claim Refund Email For Customer' },
    { name: 'Claim Re-order Email For Customer' },
    { name: 'Claim Cancel Email For Customer' },
  ];

  return (
    <>
      <div className="mt-8 sm:mt-4 m-2">
        <Page>
          <Layout>
            {!template ? (
              <Layout.Section variant="fullWidth">
                <div className="mb-4 flex items-center gap-4 ">
                  <Button icon={ArrowLeftIcon} url="/settings"></Button>
                  <Text as="h1" variant="headingLg">
                    Email Template Setup
                  </Text>
                </div>
                <Card>
                  <div className="w-full sm:p-2">
                    <div className="border border-gray-400 rounded">
                      <div className="bg-slate-200 p-2 rounded flex justify-between">
                        <p>Email Template Name</p>
                        <p className="text-left w-2/12">Action</p>
                      </div>
                      {templateItems.map((item, index) => (
                        <div
                          key={index}
                          className="border-t border-gray-400 p-2 flex justify-between"
                        >
                          <p>{item.name}</p>
                          <span className="text-left w-2/12 icon-alignment">
                            <Button
                              onClick={() => handleEditButton(item.name)}
                              icon={
                                <Icon
                                  source={EditIcon}
                                  accessibilityLabel="edit"
                                />
                              }
                            ></Button>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </Layout.Section>
            ) : (
              <Layout.Section variant="fullWidth">
                <div className="mb-4 flex items-center gap-4 ">
                  <Button
                    icon={ArrowLeftIcon}
                    onClick={() => setTemplate('')}
                  ></Button>
                  <Text as="h1" variant="headingLg">
                    Email Template
                  </Text>
                </div>
                <Card>
                  <div className="w-full sm:p-2">
                    <div>
                      <Box paddingBlockStart="200" paddingBlockEnd="200">
                        <TextField
                          autoComplete="true"
                          label="Email Subject"
                          value={template}
                          onChange={(e) => setTemplate(e)}
                          requiredIndicator
                        />
                      </Box>
                      <div className="mt-2">
                        <h1 className="my-1">Email Content</h1>
                        <TextEditor
                          defaultContent={editorState ?? defaultTemplate}
                          setEditorState={setEditorState}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
                <div className="flex justify-end my-4">
                  <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-500">
                    Update
                  </button>
                </div>
              </Layout.Section>
            )}
          </Layout>
        </Page>
      </div>
    </>
  );
};

export default EmailTemplate;
