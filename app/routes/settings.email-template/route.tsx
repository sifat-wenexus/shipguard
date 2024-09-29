import {
  ActionFunctionArgs,
  json,
  LinksFunction,
  LoaderFunctionArgs,
} from '@remix-run/node';
import {
  Button,
  Card,
  DropZone,
  Icon,
  Layout,
  Modal,
  Page,
  Text,
  TextField,
  Thumbnail,
} from '@shopify/polaris';

import {
  ArrowLeftIcon,
  EditIcon,
  NoteIcon,
  PaintBrushFlatIcon,
  UploadIcon,
  ViewIcon,
} from '@shopify/polaris-icons';
import { shopify as shopifyRemix } from '../../modules/shopify.server';
import { useCallback, useEffect, useRef, useState } from 'react';
import { shopify } from '~/modules/shopify.server';
import { prisma } from '~/modules/prisma.server';
import { useLoaderData } from '@remix-run/react';
import LiquidEditor from './components/text-editor';
import { $Enums, Prisma } from '#prisma-client';
import { ShadowBevelBox } from '~/components/shadow-bevel-box';
import {
  ClaimCancelCustomerVariable,
  ClaimRefundCustomerVariable,
  ClaimReOrderCustomerVariable,
  ClaimRequestAdminVariable,
  ClaimRequestCustomerVariable,
} from './components/template-variable';
import _ from 'lodash';
import style from './styles/route.css';
import { useBetterFetcher } from '~/hooks/use-better-fetcher';

const reqAdminTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email Title</title>
  <style>
  *{
  max-width:600px;
  margin:10px auto !important;
}
p{

    line-height: 25px;
}
  td{
padding:0px 10px}
  </style>
</head>
<body style=''>
  <div style="display:flex; justify-content:center;align-items:center; margin:50px 0px;">
   <img src="https://cdn.shopify.com/s/files/1/0900/3221/0212/files/Inhouse-Shipping-Protection_4a82e447-3fb5-48d1-b85e-7f46ab866e4a.png?v=1727505148" alt="inhouse-shipping-protection" width="220px" height="auto"></div>
  <p>Dear Admin,</p>
<p>A new claim has been requested for the following order:A new claim has been requested for the following order:A new claim has been requested for the following order:A new claim has been requested for the following order:A new claim has been requested for the following order:A new claim has been requested for the following order:A new claim has been requested for the following order:</p>
<table style="border-collapse: collapse; width: 100.035%; height: 144.574px;" border="1"><colgroup><col style="width: 49.9079%;"><col style="width: 49.9079%;"></colgroup>
<tbody>
<tr style="height: 36.1648px;">
<td>Order Id</td>
<td><strong>{order_id}</strong></td>
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
<td>Claim Date:</td>
<td><strong>{claim_date}</strong></td>
</tr>
</tbody>
</table>
<p>Please review the claim request and take appropriate action.</p>
<br/>
<p>Best regards,<br/> <strong>Inhouse Shipping Protection</strong> <strong>Team</strong></p>
<p>&nbsp;</p>
</body>
</html>`;

const reqCustomerTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email Title</title>
  <style>
  td{
padding:0px 10px}
  </style>
</head>
<body>
  <div style="display:flex; justify-content:center;align-items:center; margin:50px 0px;">
   <img src="" alt="shop name" width="220px" height="auto"></div>
  <p>Dear <b>{customer_name}</b>,</p>
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
<p>&nbsp;</p></body>
</html>`;

const refundCustomerTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email Title</title>
  <style>
  td{
padding:0px 10px}
  </style>
</head>
<body>
  <div style="display:flex; justify-content:center;align-items:center; margin:50px 0px;">
   <img src="" alt="shop name" width="220px" height="auto"></div> <p>Dear <b>{customer_name}</b>,</p>
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
<p>&nbsp;</p></body>
</html>`;

const reOrderCustomerTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email Title</title>
  <style>
  td{
padding:0px 10px}
  </style>
</head>
<body>
  <div style="display:flex; justify-content:center;align-items:center; margin:50px 0px;">
   <img src="" alt="shop name" width="220px" height="auto"></div> <p>Dear <b>{customer_name}</b>,</p>
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
<p>&nbsp;</p></body>
</html>`;

const cancelCustomerTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email Title</title>
  <style>
  td{
padding:0px 10px}
  </style>
</head>
<body>
  <div style="display:flex; justify-content:center;align-items:center; margin:50px 0px;">
   <img src="" alt="shop name" width="220px" height="auto"></div> <p>Dear <b>{customer_name}</b>,</p>
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
<p>&nbsp;</p></body>
</html>`;
export async function loader({ request }: LoaderFunctionArgs) {
  const ctx = await shopify.authenticate.admin(request);
  const templates = await prisma.emailTemplate.findMany({
    where: { storeId: ctx.session.storeId },
  });

  if (!templates.length) {
    const defaultTemplatesPayload: Prisma.EmailTemplateCreateManyInput[] = [
      {
        storeId: ctx.session.storeId!,
        body: reqAdminTemplate,
        subject: 'New Claim Request Submitted: Order {order_ID}',
        name: 'CLAIM_REQUEST_EMAIL_FOR_ADMIN',
      },
      {
        storeId: ctx.session.storeId!,
        body: reqCustomerTemplate,
        subject: 'Claim Request Received: Order {order_ID}',
        name: 'CLAIM_REQUEST_EMAIL_FOR_CUSTOMER',
      },
      {
        storeId: ctx.session.storeId!,
        body: refundCustomerTemplate,
        subject: 'Claim Approved: Refund Issued for Order {order_ID}',
        name: 'CLAIM_REFUND_EMAIL_FOR_CUSTOMER',
      },
      {
        storeId: ctx.session.storeId!,
        body: reOrderCustomerTemplate,
        subject: 'Claim Approved: Replacement Order Confirmed for Order',
        name: 'CLAIM_REORDER_EMAIL_FOR_CUSTOMER',
      },
      {
        storeId: ctx.session.storeId!,
        body: cancelCustomerTemplate,
        subject: 'Claim Request Canceled: Order {order_ID}',
        name: 'CLAIM_CANCEL_EMAIL_FOR_CUSTOMER',
      },
    ];
    await prisma.emailTemplate.createMany({
      data: defaultTemplatesPayload,
    });
    return json({ message: 'something is wrong', status: false, data: null });
  }

  // const claimAdminTemplate =
  return json({
    message: 'Successfully fetched templates!',
    data: templates,
    status: true,
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const ctx = await shopifyRemix.authenticate.admin(request);

  const body = await request.formData();
  const action = body.get('action');
  if (action === 'update') {
    const state = JSON.parse(body.get('state') as string);
    const response = await prisma.emailTemplate.update({
      where: { name: state.name },
      data: { body: state.body, subject: state.subject },
    });
    return json({ message: 'Email Template updated', status: true, response });
  }
  return json({ success: false, message: 'Unknown action' });
}

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: style }];
const EmailTemplate = () => {
  const fetcher = useBetterFetcher();
  const { data, message } = useLoaderData<typeof loader>();
  const [templateSubject, setTemplateSubject] = useState<string>('');
  const [editorState, setEditorState] = useState(false);
  const [templatePreview, setTemplatePreview] = useState('');
  const [templateName, setTemplateName] = useState<$Enums.EmailTemplateName>();
  const [active, setActive] = useState(false);
  const [file, setFile] = useState<File>();

  const handleEditButton = (e: $Enums.EmailTemplateName) => {
    setTemplateName(e);
    const currentTemplate = data?.find((t) => t.name === e);
    if (currentTemplate) {
      setTemplateSubject(currentTemplate.subject);
      setTemplatePreview(currentTemplate.body);
      return;
    }
    if (e === 'CLAIM_REQUEST_EMAIL_FOR_ADMIN') {
      setTemplateSubject('New Claim Request Submitted: Order {{order_ID}}');
      setTemplatePreview(reqAdminTemplate);
    } else if (e === 'CLAIM_REQUEST_EMAIL_FOR_CUSTOMER') {
      setTemplateSubject('Claim Request Received: Order {{order_ID}}');
      setTemplatePreview(reqCustomerTemplate);
    } else if (e === 'CLAIM_REFUND_EMAIL_FOR_CUSTOMER') {
      setTemplateSubject(
        'Claim Approved: Refund Issued for Order {{order_ID}}'
      );
      setTemplatePreview(refundCustomerTemplate);
    } else if (e === 'CLAIM_REORDER_EMAIL_FOR_CUSTOMER') {
      setTemplateSubject(
        'Claim Approved: Replacement Order Confirmed for Order'
      );
      setTemplatePreview(reOrderCustomerTemplate);
    } else if (e === 'CLAIM_CANCEL_EMAIL_FOR_CUSTOMER') {
      setTemplateSubject('Claim Request Canceled: Order {{order_ID}}');
      setTemplatePreview(cancelCustomerTemplate);
    }
  };

  interface IName {
    name: $Enums.EmailTemplateName;
  }

  const templateItems: IName[] = [
    { name: 'CLAIM_REQUEST_EMAIL_FOR_ADMIN' },
    { name: 'CLAIM_REQUEST_EMAIL_FOR_CUSTOMER' },
    { name: 'CLAIM_REFUND_EMAIL_FOR_CUSTOMER' },
    { name: 'CLAIM_REORDER_EMAIL_FOR_CUSTOMER' },
    { name: 'CLAIM_CANCEL_EMAIL_FOR_CUSTOMER' },
  ];

  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

  const fileUpload = !file && <DropZone.FileUpload />;

  const handleDropZoneDrop = useCallback(
    (_dropFiles: File[], acceptedFiles: File[], _rejectedFiles: File[]) =>
      setFile(acceptedFiles[0]),
    []
  );
  const uploadedFiles = file && (
    <>
      <Thumbnail
        size="small"
        alt={file.name}
        source={
          validImageTypes.includes(file.type)
            ? window.URL.createObjectURL(file)
            : NoteIcon
        }
      />
      <div>
        {file.name}{' '}
        <Text variant="bodySm" as="p">
          {file.size} bytes
        </Text>
      </div>
    </>
  );
  const handleLogoUpload = useCallback(() => {
    console.log('uploading logo', file);
    if (!file) return;
    const form = new FormData();
    form.append('file', file);
    fetch('/api/files', {
      method: 'POST',
      body: form,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Upload successful:', data);
      })
      .catch((error) => {
        console.log('Upload failed:', error);
      });
  }, [file]);

  return (
    <>
      <div className="mt-8 sm:mt-4 m-2">
        <Page>
          <Layout>
            {!templateSubject ? (
              <Layout.Section variant="fullWidth">
                <div className="flex justify-between">
                  <div className="mb-4 flex items-center gap-4 ">
                    <Button icon={ArrowLeftIcon} url="/settings"></Button>
                    <Text as="h1" variant="headingLg">
                      Email Template Setup
                    </Text>
                  </div>
                  <div>
                    <Modal
                      activator={
                        <Button
                          icon={PaintBrushFlatIcon}
                          onClick={() => {
                            setActive(true);
                          }}
                        >
                          Customize Email Logo
                        </Button>
                      }
                      open={active}
                      onClose={() => {
                        setActive(false);
                      }}
                      title="Logo"
                      primaryAction={{
                        content: 'Done',
                        onAction: handleLogoUpload,
                      }}
                      secondaryActions={[
                        {
                          content: 'Cancel',
                          onAction: () => setActive(false),
                        },
                      ]}
                    >
                      <Modal.Section>
                        <DropZone
                          onDrop={handleDropZoneDrop}
                          variableHeight
                          allowMultiple={false}
                        >
                          {uploadedFiles}
                          {fileUpload}
                        </DropZone>
                      </Modal.Section>
                    </Modal>
                  </div>
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
                          <p>{_.capitalize(item.name.replace(/_/g, ' '))}</p>
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
                <div className="flex justify-between">
                  <div className="mb-4 flex items-center gap-4 ">
                    <Button
                      icon={ArrowLeftIcon}
                      onClick={() => {
                        setTemplateSubject('');
                        setEditorState(false);
                      }}
                    ></Button>
                    <Text as="h1" variant="headingLg">
                      Email Template
                    </Text>
                  </div>
                  <div>
                    {editorState ? (
                      <Button
                        variant="primary"
                        onClick={() => setEditorState(false)}
                      >
                        Preview
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        onClick={() => setEditorState(true)}
                      >
                        Edit Code
                      </Button>
                    )}
                  </div>
                </div>

                {editorState ? (
                  <LiquidEditor
                    templateSubject={templateSubject}
                    setTemplateSubject={setTemplateSubject}
                    templatePreview={templatePreview}
                    setTemplatePreview={setTemplatePreview}
                    templateName={templateName}
                  />
                ) : (
                  <>
                    {/* <iframe src=''></iframe> */}
                    <Layout>
                      <Layout.Section variant="oneHalf">
                        <ShadowBevelBox
                          icon={<Icon source={ViewIcon} />}
                          title="Preview"
                          className="bg-green-200"
                        >
                          <TextField
                            autoComplete="true"
                            label="Email Subject"
                            value={templateSubject}
                            readOnly
                          />

                          <iframe
                            srcDoc={templatePreview}
                            title="HTML Content"
                            className="w-full h-[50vh] mt-2"
                          />
                        </ShadowBevelBox>
                      </Layout.Section>
                      <Layout.Section variant="oneThird">
                        {templateName === 'CLAIM_REQUEST_EMAIL_FOR_ADMIN' ? (
                          <ClaimRequestAdminVariable />
                        ) : templateName ===
                          'CLAIM_REQUEST_EMAIL_FOR_CUSTOMER' ? (
                          <ClaimRequestCustomerVariable />
                        ) : templateName ===
                          'CLAIM_REFUND_EMAIL_FOR_CUSTOMER' ? (
                          <ClaimRefundCustomerVariable />
                        ) : templateName ===
                          'CLAIM_REORDER_EMAIL_FOR_CUSTOMER' ? (
                          <ClaimReOrderCustomerVariable />
                        ) : templateName ===
                          'CLAIM_CANCEL_EMAIL_FOR_CUSTOMER' ? (
                          <ClaimCancelCustomerVariable />
                        ) : null}
                      </Layout.Section>
                    </Layout>
                  </>
                )}
              </Layout.Section>
            )}
          </Layout>
        </Page>
      </div>
    </>
  );
};

export default EmailTemplate;
