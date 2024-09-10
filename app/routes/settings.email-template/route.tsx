import { LinksFunction } from '@remix-run/node';
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

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: style }];
const EmailTemplate = () => {
  const [template, setTemplate] = useState(null);
  const [editorState, setEditorState] = useState(null);

  const handleEditButton = (e) => {
    setTemplate(e);
  };

  const onEditorStateChange = (e) => {
    console.log('onEditorStateChange', e);
  };

  const templateItems = [
    { name: 'Claim Request Email For Admin' },
    { name: 'Claim Request Email For Customer' },
    { name: 'Claim Refund Email For Customer' },
    { name: 'Claim Re-order Email For Customer' },
    { name: 'Claim Cancel Email For Customer' },
  ];

  const defaultTemplateContent = `<p>Mr/Mrs/Ms {customer_name}</p>
${
  template === 'Claim Request Email For Admin' ||
  template === 'Claim Request Email For Customer'
    ? '<p>You have requested claim on your order : {order_no}. Your claim has been requested.</p>'
    : ''
}
${
  template === 'Claim Refund Email For Customer'
    ? '<p>You have requested claim on your order : {order_no}. Your claim has been approved and soon you will be refunded you amount in your account.</p>'
    : ''
}
${
  template === 'Claim Re-order Email For Customer'
    ? '<p>You have requested claim on your order :  {order_no}. Your claim will be reorder soon.</p>'
    : ''
}
${
  template === 'Claim Cancel Email For Customer'
    ? '<p>You have requested claim on your order : {order_no}. Your claim has been canceled.</p>'
    : ''
}
<p>Order Detail :&nbsp;</p>
<table style="border-collapse: collapse; width: 100.035%; height: 108.516px;" border="1"><colgroup><col style="width: 49.9079%;"><col style="width: 49.9079%;"></colgroup>
<tbody>
<tr style="height: 36.1719px;">
<td>Customer Name</td>
<td>{customer_name}</td>
</tr>
<tr style="height: 36.1719px;">
<td>Order No</td>
<td>{order_no}</td>
</tr>
<tr style="height: 36.1719px;">
<td>Status</td>
<td>{claimed}</td>
</tr>
</tbody>
</table>
<p>Thank You.</p>`;

  const adminTemplate = `<p>Dear Admin,</p>
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
<td>Order No</td>
<td><strong>{order_no}</strong></td>
</tr>
<tr style="height: 36.1648px;">
<td>Status</td>
<td><strong>{claimed}</strong></td>
</tr>
</tbody>
</table>
<p>Please review the claim request and take appropriate action.</p>
<p>Best regards,<br><strong>Inhouse Shipping Protection</strong> <strong>Team</strong></p>`;

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
                    onClick={() => setTemplate(null)}
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
                          requiredIndicator
                        />
                      </Box>
                      <div className="mt-2">
                        <TextEditor defaultContent={adminTemplate} />
                      </div>
                    </div>
                  </div>
                </Card>
              </Layout.Section>
            )}
          </Layout>
        </Page>
      </div>
    </>
  );
};

export default EmailTemplate;
