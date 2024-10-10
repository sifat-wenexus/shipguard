import {
  ActionFunctionArgs,
  json,
  LinksFunction,
  LoaderFunctionArgs,
} from '@remix-run/node';
import {
  Button,
  Card,
  Icon,
  Layout,
  Modal,
  Page,
  Text,
  TextField,
} from '@shopify/polaris';

import {
  ArrowLeftIcon,
  EditIcon,
  PaintBrushFlatIcon,
  ViewIcon,
} from '@shopify/polaris-icons';
import { shopify as shopifyRemix } from '../../modules/shopify.server';
import { useCallback, useEffect, useMemo, useState } from 'react';
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
import { ClaimRequestAdminTemplate } from './email-template/template';
import {
  cancelCustomerTemplate,
  refundCustomerTemplate,
  reOrderCustomerTemplate,
  reqAdminTemplate,
  reqCustomerTemplate,
} from './components/default-template-code';
import LogoUpload from './components/logo-upload';
import { templateParameters } from './email-template/template-variable-params';
import { queryProxy } from '~/modules/query/query-proxy';
import { getConfig } from '~/modules/get-config.server';
import { useQuery } from '~/hooks/use-query';

export async function loader({ request }: LoaderFunctionArgs) {
  const ctx = await shopify.authenticate.admin(request);
  const templates = await prisma.emailTemplate.findMany({
    where: { storeId: ctx.session.storeId },
  });
  const appUrl = getConfig().appUrl;
  if (!templates.length) {
    const defaultTemplatesPayload: Prisma.EmailTemplateCreateManyInput[] = [
      {
        storeId: ctx.session.storeId!,
        body: reqAdminTemplate,
        subject: 'New Claim Request Submitted: Order {{order_id}}',
        name: 'CLAIM_REQUEST_EMAIL_FOR_ADMIN',
      },
      {
        storeId: ctx.session.storeId!,
        body: reqCustomerTemplate,
        subject: 'Claim Request Received: Order {{order_id}}',
        name: 'CLAIM_REQUEST_EMAIL_FOR_CUSTOMER',
      },
      {
        storeId: ctx.session.storeId!,
        body: refundCustomerTemplate,
        subject: 'Claim Approved: Refund Issued for Order {{order_id}}',
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
        subject: 'Claim Request Canceled: Order {{order_id}}',
        name: 'CLAIM_CANCEL_EMAIL_FOR_CUSTOMER',
      },
    ];
    await prisma.emailTemplate.createMany({
      data: defaultTemplatesPayload,
    });
    return json({
      message: 'something is wrong',
      data: null,
      storeId: ctx.session.storeId,
      appUrl,
      // logo,
    });
  }

  return json({
    message: 'Successfully fetched templates!',
    data: templates,
    storeId: ctx.session.storeId,
    appUrl,
    // logo,
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const ctx = await shopifyRemix.authenticate.admin(request);

  const body = await request.formData();
  const action = body.get('action');
  if (action === 'update') {
    const state = JSON.parse(body.get('state') as string);
    const response = await prisma.emailTemplate.update({
      where: {
        storeId_name: { storeId: ctx.session.storeId!, name: state.name },
      },
      data: { body: state.body, subject: state.subject },
    });
    return json({ message: 'Email Template updated', status: true, response });
  }
  return json({ success: false, message: 'Unknown action' });
}

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: style }];
const EmailTemplate = () => {
  const { data, message, storeId, appUrl } = useLoaderData<typeof loader>();
  const [templateSubject, setTemplateSubject] = useState<string>('');
  const [editorState, setEditorState] = useState(false);
  const [templatePreview, setTemplatePreview] = useState('');
  const [templateName, setTemplateName] = useState<$Enums.EmailTemplateName>();
  const [active, setActive] = useState(false);
  const [file, setFile] = useState<File>();
  const [liquidToHtml, setLiquidToHtml] = useState('');
  const [loading, setLoading] = useState(false);
  const [prevFile, setPreviousFile] = useState<any>();
  const getTemplate = async (variables) => {
    const claimAdminTemplate = new ClaimRequestAdminTemplate();
    claimAdminTemplate.liquid = templatePreview;
    return await claimAdminTemplate.render(variables);
  };

  const dataQuery = useMemo(
    () => queryProxy.packageProtection.subscribeFindFirst(),
    []
  );
  const packageProtection = useQuery(dataQuery);
  const logo = `${appUrl}api/files/${packageProtection.data?.emailTemplateLogo}`;

  useEffect(() => {
    queryProxy.file
      .findFirst({
        where: { id: packageProtection.data?.emailTemplateLogo },
      })
      .then((res) => setPreviousFile(res))
      .catch((err) => setPreviousFile(null));
  }, []);

  useEffect(() => {
    if (templateName) {
      getTemplate(templateParameters(templateName, logo))
        .then((res) => {
          setLiquidToHtml(res);
        })
        .catch((err) => {
          console.error(err);
          setLiquidToHtml('');
        });
    }
  }, [templatePreview, templateName, logo]);

  const handleEditButton = (e: $Enums.EmailTemplateName) => {
    setTemplateName(e);
    const currentTemplate = data?.find((t) => t.name === e);
    if (currentTemplate) {
      setTemplateSubject(currentTemplate.subject);
      setTemplatePreview(currentTemplate.body);
      return;
    }
    if (e === 'CLAIM_REQUEST_EMAIL_FOR_ADMIN') {
      setTemplateSubject('New Claim Request Submitted: Order {{order_id}}');
      setTemplatePreview(reqAdminTemplate);
    } else if (e === 'CLAIM_REQUEST_EMAIL_FOR_CUSTOMER') {
      setTemplateSubject('Claim Request Received: Order {{order_id}}');
      setTemplatePreview(reqCustomerTemplate);
    } else if (e === 'CLAIM_REFUND_EMAIL_FOR_CUSTOMER') {
      setTemplateSubject(
        'Claim Approved: Refund Issued for Order {{order_id}}'
      );
      setTemplatePreview(refundCustomerTemplate);
    } else if (e === 'CLAIM_REORDER_EMAIL_FOR_CUSTOMER') {
      setTemplateSubject(
        'Claim Approved: Replacement Order Confirmed for Order'
      );
      setTemplatePreview(reOrderCustomerTemplate);
    } else if (e === 'CLAIM_CANCEL_EMAIL_FOR_CUSTOMER') {
      setTemplateSubject('Claim Request Canceled: Order {{order_id}}');
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

  const handleLogoUpload = useCallback(() => {
    console.log('uploading logo', file);
    if (!file) return;
    const form = new FormData();
    form.append('file', file);
    setLoading(true);
    fetch('/api/files', {
      method: 'POST',
      body: form,
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then(async (result) => {
        console.log(' result.response.id ', result.response.id, storeId);
        setLoading(false);
        setActive(false);
        await queryProxy.packageProtection.update({
          where: { storeId: storeId },
          data: { emailTemplateLogo: result.response.id },
        });
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
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
                      title="Upload Your Company Logo"
                      primaryAction={{
                        content: 'Done',
                        onAction: handleLogoUpload,
                        loading: loading,
                      }}
                      secondaryActions={[
                        {
                          content: 'Cancel',
                          onAction: () => setActive(false),
                        },
                      ]}
                    >
                      <Modal.Section>
                        <LogoUpload
                          file={file}
                          setFile={setFile}
                          logo={logo}
                          prevFile={prevFile}
                        />
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
                            srcDoc={liquidToHtml}
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
