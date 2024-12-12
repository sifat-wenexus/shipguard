import { reqAdminTemplate } from '~/routes/settings.email-template/components/default-template-code';
import { SendTestEmail } from '~/routes/settings.smtp-setup/components/send-test-email';
import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { getGoogleUserInfo } from '~/modules/get-google-user-info.server';
import { Link, useLoaderData, useRevalidator } from '@remix-run/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useBetterFetcher } from '~/hooks/use-better-fetcher';
import { queryProxy } from '~/modules/query/query-proxy';
import { getMailer } from '~/modules/get-mailer.server';
import type { Validator } from '~/hooks/use-form-state';
import { useFormState } from '~/hooks/use-form-state';
import SwitchButton from './components/switch-button';
import { GmailAPI } from '~/modules/gmail-api.server';
import { PageShell } from '~/components/page-shell';
import { shopify } from '~/modules/shopify.server';
import type { SmtpSetting } from '#prisma-client';
import GmailLogo from '~/assets/images/gmail.png';
import { prisma } from '~/modules/prisma.server';
import * as Icons from '@shopify/polaris-icons';
import GoogleLogo from '~/assets/images/Logo-google-icon-PNG.png'

import { useQuery } from '~/hooks/use-query';
import {
  AccountConnection,
  Box,
  Button,
  Card, Icon,
  Layout,
  Page,
  Select,
  Text,
  TextField,
} from '@shopify/polaris';
import { EmailIcon } from '@shopify/polaris-icons';
import { getGoogleAuthClient } from '~/modules/get-google-auth-client.server';

export async function action({ request }: ActionFunctionArgs) {
  const { session } = await shopify.authenticate.admin(request);

  const data = await request.formData();
  const action = data.get('action');

  if (action === 'disconnect') {
    const provider = data.get('provider');

    await queryProxy.smtpSetting.update({
      where: { id: session.storeId },
      data: {
        from: null,
        provider: null,
      },
    });

    if (provider === 'google') {
      const client = await getGoogleAuthClient(session.storeId!);
      client?.revokeCredentials();

      await queryProxy.googleAuthCredential.updateMany(
        {
          where: { connected: true },
          data: { connected: false },
        },
        { session }
      );

      return json({
        message: 'Google account disconnected.',
        success: true,
      });
    }

    return json({
      message:
        'Something went wrong, please try again. If the problem persists, contact support.',
      success: false,
    });
  }

  if (action === 'save') {
    const payload = JSON.parse(data.get('state')! as string);

    await queryProxy.smtpSetting.upsert(
      {
        where: {
          id: session.storeId,
        },
        create: {
          id: session.storeId,
          ...payload,
        },
        update: payload,
      },
      { session }
    );

    return json({
      message: 'SMTP settings saved.',
      success: true,
    });
  }

  if (action === 'test') {
    const settings = await prisma.smtpSetting.findFirstOrThrow({
      where: {
        id: session.storeId,
      },
      include: {
        Store: true,
      },
    });
    const storeEmail = settings.Store.email;
    const to = data.get('email') as string;

    const subject = (data.get('subject') as string) || 'Test Email';
    const body = reqAdminTemplate;

    if (settings.provider === 'google') {
      const gmailApi = new GmailAPI(session.storeId!);

      if (!gmailApi) {
        return json({
          success: false,
          message: `Google account not connected. Please connect your Google account to send test emails.`,
        });
      }

      const userInfo = await getGoogleUserInfo(session.storeId!);

      await gmailApi.sendEmail({
        to: to || storeEmail || userInfo!.email!,
        subject: subject,
        body: body,
      });
    } else {
      if (!storeEmail) {
        console.error(`No email found for store ${session.storeId}`);

        return json({
          success: false,
          message:
            'Something went wrong, please try again. If the problem persists, contact support.',
        });
      }

      const mailer = await getMailer(session.storeId!);

      if (!mailer) {
        console.error(`Mailer not found for store ${session.storeId}`);

        return json({
          success: false,
          message:
            'Something went wrong, please try again. If the problem persists, contact support.',
        });
      }

      await mailer.sendMail({
        from: settings.from!,
        to: to || storeEmail || settings.from!,
        subject: subject,
        html: body,
      });
    }

    return json({
      success: true,
      message: `A test email has been sent to ${to}.`,
    });
  }

  return json({
    success: false,
    message: 'Invalid action.',
  });
}

export async function loader({ request }: LoaderFunctionArgs) {
  const { session } = await shopify.authenticate.admin(request);

  const googleUserInfo = await getGoogleUserInfo(session.storeId!);

  const smtpSettings: SmtpSetting | null = await prisma.smtpSetting.findFirst({
    where: {
      id: session.storeId!,
    },
  });

  const { currencyCode } = await prisma.store.findFirstOrThrow({
    where: { id: session.storeId },
    select: { currencyCode: true },
  });

  return json({
    googleUserInfo,
    smtpSettings,
    currencyCode,
  });
}

const SMTP = () => {
  const loaderData = useLoaderData<typeof loader>();
  const [provider, setProvider] = useState<string>(
    loaderData.smtpSettings?.provider || 'google'
  );
  const fetcher = useBetterFetcher();
  const reValidator = useRevalidator();
  const [viewPassword, setViewPassword] = useState(false);

  const initialState: Omit<SmtpSetting, 'id' | 'createdAt'> = useMemo(
    () =>
      loaderData.smtpSettings || {
        provider: provider || 'google',
        protocol: 'smtp',
        from: null,
        host: null,
        port: null,
        username: null,
        password: null,
        timeout: 1000,
        tlsVersion: null,
        useProxy: false,
        proxyHost: null,
        proxyPort: null,
        proxyUsername: null,
        proxyPassword: null,
      },
    [loaderData.smtpSettings, provider]
  );
  const validators: Record<string, Validator<typeof initialState>> = useMemo(
    () => ({
      from: {
        target: 'staged',
        validate(value, state) {
          if (state.provider !== 'custom') {
            return;
          }

          if (!value) {
            return {
              message: 'Mail from is required.',
              type: 'error',
            };
          }

          const input = document.createElement('input');
          input.type = 'email';
          input.value = value;

          if (!input.checkValidity()) {
            return {
              message: 'Invalid email address.',
              type: 'error',
            };
          }
        },
      },
      protocol: {
        target: 'staged',
        validate(value, state) {
          if (state.provider !== 'custom') {
            return;
          }

          if (!value) {
            return {
              message: 'Protocol is required.',
              type: 'error',
            };
          }
        },
      },
      host: {
        target: 'staged',
        validate(value, state) {
          if (state.provider !== 'custom') {
            return;
          }

          if (!value) {
            return {
              message: 'Host is required.',
              type: 'error',
            };
          }
        },
      },
      port: {
        target: 'staged',
        validate(value, state) {
          if (state.provider !== 'custom') {
            return;
          }

          if (!value) {
            return {
              message: 'Port is required.',
              type: 'error',
            };
          }
        },
      },
      username: {
        target: 'staged',
        validate(value, state) {
          if (state.provider !== 'custom') {
            return;
          }

          if (!value) {
            return {
              message: 'Username is required.',
              type: 'error',
            };
          }
        },
      },
      password: {
        target: 'staged',
        validate(value, state) {
          if (state.provider !== 'custom') {
            return;
          }

          if (!value) {
            return {
              message: 'Password is required.',
              type: 'error',
            };
          }
        },
      },
      timeout: {
        target: 'staged',
        validate(value, state) {
          if (state.provider !== 'custom') {
            return;
          }

          if (!value) {
            return {
              message: 'Timeout is required.',
              type: 'error',
            };
          }
        },
      },
      proxyHost: {
        target: 'staged',
        validate(value, state) {
          if (state.provider !== 'custom' || !state.useProxy) {
            return;
          }

          if (!value) {
            return {
              message: 'Proxy Host is required.',
              type: 'error',
            };
          }
        },
      },
      proxyPort: {
        target: 'staged',
        validate(value, state) {
          if (state.provider !== 'custom' || !state.useProxy) {
            return;
          }

          if (!value) {
            return {
              message: 'Proxy Port is required.',
              type: 'error',
            };
          }
        },
      },
      proxyUsername: {
        target: 'staged',
        validate(value, state) {
          if (state.provider !== 'custom' || !state.useProxy) {
            return;
          }

          if (!value) {
            return {
              message: 'Proxy Username is required.',
              type: 'error',
            };
          }
        },
      },
      proxyPassword: {
        target: 'staged',
        validate(value, state) {
          if (state.provider !== 'custom' || !state.useProxy) {
            return;
          }

          if (!value) {
            return {
              message: 'Proxy Password is required.',
              type: 'error',
            };
          }
        },
      },
    }),
    []
  );

  const formState = useFormState(initialState, false, validators);
  const { state, staged } = formState;

  const TLSVersionOptions = [
    { label: 'TLSv1', value: 'TLSv1' },
    { label: 'TLSv1.1', value: 'TLSv1.1' },
    { label: 'TLSv1.2', value: 'TLSv1.2' },
    { label: 'TLSv1.3', value: 'TLSv1.3' },
  ];
  const protocolOptions = [
    { label: 'SMTP', value: 'smtp' },
    { label: 'SMTPS', value: 'smtps' },
  ];
  const options:{label:any,value:string}[] = [
    { label: <div className={'flex gap-2 items-center '}><span><img src={GoogleLogo} alt="" width={'15px'}/></span> Google</div>, value: 'google' },
    { label: 'Custom', value: 'custom' },
  ];

  const googleAuthQuery = useMemo(
    () =>
      queryProxy.googleAuthCredential.subscribeFindFirst({
        where: {
          connected: true,
        },
        select: {
          connected: true,
        },
      }),
    []
  );
  const googleAuth = useQuery(googleAuthQuery);

  const isGmailConnected = useMemo(
    () => !!(loaderData.googleUserInfo || googleAuth.data?.connected),
    [googleAuth.data?.connected, loaderData.googleUserInfo]
  );

  const authorize = useCallback(async () => {
    const url = await fetch('/google-oauth-url').then((r) => r.text());

    window.open(
      url,
      '_blank' /*, `height=800,width=800,toolbar=no,resizable=no,left=${window.screen.width / 2 - 400},top=${window.screen.height / 2 - 400}`*/
    );
  }, []);

  const disconnectGmail = useCallback(async () => {
    await fetcher.submit(
      {
        toast: true,
        loading: true,
      },
      {
        action: 'disconnect',
        provider: 'google',
      },
      {
        method: 'POST',
      }
    );
  }, [fetcher]);

  const save = useCallback(async () => {
    const messages = await formState.validate(state);

    if (Object.keys(messages).length > 0) {
      return;
    }

    await fetcher.submit(
      {
        toast: true,
        loading: true,
      },
      {
        action: 'save',
        state: JSON.stringify(state),
      },
      {
        method: 'POST',
      }
    );
  }, [fetcher, formState, state]);

  const test = useCallback(
    async (email: string, subject: string) => {
      await fetcher.submit(
        {
          toast: true,
          loading: true,
        },
        {
          action: 'test',
          email,
          subject,
        },
        {
          method: 'POST',
        }
      );
    },
    [fetcher]
  );

  useEffect(() => {
    if (isGmailConnected && !loaderData.googleUserInfo) {
      reValidator.revalidate();
    }
  }, [loaderData.googleUserInfo, isGmailConnected, reValidator]);

  return (
    <PageShell currencyCode={loaderData.currencyCode}>
      <div className="mt-8 sm:mt-4 m-2">
        <Page>
          <Layout>
            <Layout.Section variant="fullWidth">
              <div className="mb-4 flex items-center gap-4">
                <Button icon={Icons.ArrowLeftIcon} url="/settings"></Button>
                <Text as="h1" variant="headingLg">
                  SMTP Setup
                </Text>
              </div>
              <Card>
                <div className="w-full sm:p-4">
                  <Box paddingBlockStart="200" paddingBlockEnd="200">
                    <Select
                      label="SMTP Provider"
                      options={options}
                      requiredIndicator
                      value={provider}
                      tone="magic"
                      onChange={() => {
                        const provider =
                          state.provider === 'google' ? 'custom' : 'google';

                        setProvider(provider);
                        formState.addChange({ provider });
                      }}
                    />
                  </Box>
                  {provider === 'google' ? (
                    <Box paddingBlockStart="200" paddingBlockEnd="200">
                      <AccountConnection
                        details={
                          !isGmailConnected
                            ? "Connect your Google account via OAuth 2.0 to send emails using Gmail's SMTP server."
                            : `Your Google account is connected.`
                        }
                        avatarUrl={
                          loaderData.googleUserInfo?.picture || GmailLogo
                        }
                        title={
                          loaderData.googleUserInfo?.email || 'Google Account Integration'
                        }
                        connected={isGmailConnected}
                        accountName="Google"
                        action={{
                          content: isGmailConnected ? 'Disconnect' : 'Connect',
                          onAction: isGmailConnected
                            ? disconnectGmail
                            : authorize,
                          external: !isGmailConnected,
                        }}
                        termsOfService={
                          isGmailConnected ? null : (
                            <p>
                              By connecting your Google account, you agree to
                              accept our{' '}
                              <Link
                                to="/terms-of-service"
                                className="underline"
                                target={'_blank'}
                              >
                                Terms of Service
                              </Link>{' '}
                              and{' '}
                              <Link to="/privacy-policy" className="underline" target={'_blank'}>
                                Privacy Policy
                              </Link>
                              .
                            </p>
                          )
                        }
                      />
                    </Box>
                  ) : (
                    <>
                      <Box paddingBlockStart="200" paddingBlockEnd="200">
                        <TextField
                          onChange={(value) =>
                            formState.addToStaged({ from: value })
                          }
                          error={formState.messages.from?.message}
                          onBlur={() => formState.commitStaged()}
                          placeholder="name@company.com"
                          value={staged.from!}
                          autoComplete="true"
                          label="Mail From"
                          requiredIndicator
                          tone="magic"
                        />
                      </Box>
                      <div className="border border-gray-400 p-4 rounded my-4">
                        <Box paddingBlockStart="200" paddingBlockEnd="200">
                          <Text as="p" variant="headingMd">
                            Connection Settings
                          </Text>
                          <br />
                          <Select
                            onChange={(value) =>
                              formState.addChange({ protocol: value })
                            }
                            error={formState.messages.protocol?.message}
                            options={protocolOptions}
                            value={state.protocol!}
                            label="SMTP Protocol"
                            tone="magic"
                          />
                        </Box>
                        <div className="sm:flex gap-2">
                          {' '}
                          <Box
                            paddingBlockStart="200"
                            paddingBlockEnd="200"
                            width="100%"
                          >
                            <TextField
                              onChange={(value) =>
                                formState.addToStaged({ host: value })
                              }
                              error={formState.messages.host?.message}
                              onBlur={() => formState.commitStaged()}
                              placeholder="localhost"
                              value={staged.host!}
                              autoComplete="true"
                              requiredIndicator
                              label="SMTP Host"
                              tone="magic"
                            />
                          </Box>{' '}
                          <Box
                            paddingBlockStart="200"
                            paddingBlockEnd="200"
                            width="100%"
                          >
                            <TextField
                              onChange={(value) =>
                                formState.addToStaged({ port: parseInt(value) })
                              }
                              error={formState.messages.port?.message}
                              onBlur={() => formState.commitStaged()}
                              value={staged.port?.toString()}
                              autoComplete="true"
                              label="SMTP Port"
                              requiredIndicator
                              placeholder="25"
                              type="number"
                              tone="magic"
                            />
                          </Box>{' '}
                        </div>
                        <div className="sm:flex gap-2">
                          <Box
                            paddingBlockStart="200"
                            paddingBlockEnd="200"
                            width="100%"
                          >
                            <TextField
                              onChange={(value) =>
                                formState.addToStaged({ username: value })
                              }
                              error={formState.messages.username?.message}
                              onBlur={() => formState.commitStaged()}
                              placeholder="Enter username"
                              value={staged.username!}
                              autoComplete="true"
                              requiredIndicator
                              label="Username"
                              tone="magic"
                            />
                          </Box>
                          <Box
                            paddingBlockStart="200"
                            paddingBlockEnd="200"
                            width="100%"
                          >
                            <TextField
                              onChange={(value) =>
                                formState.addToStaged({ password: value })
                              }
                              onBlur={() => formState.commitStaged()}
                              error={formState.messages.password?.message}
                              suffix={
                                <Button
                                  onClick={() => setViewPassword(!viewPassword)}
                                  pressed={viewPassword}
                                  icon={Icons.ViewIcon}
                                />
                              }
                              type={viewPassword ? 'text' : 'password'}
                              placeholder="Enter password"
                              value={staged.password!}
                              autoComplete="true"
                              requiredIndicator
                              label="Password"
                              tone="magic"
                            />
                          </Box>
                        </div>
                        <Box paddingBlockStart="200" paddingBlockEnd="200">
                          <TextField
                            onChange={(value) =>
                              formState.addToStaged({
                                timeout: parseInt(value),
                              })
                            }
                            error={formState.messages.timeout?.message}
                            onBlur={() => formState.commitStaged()}
                            value={staged.timeout?.toString()}
                            label="Timeout (ms)"
                            autoComplete="true"
                            placeholder="10000"
                            requiredIndicator
                            type="number"
                            tone="magic"
                          />
                        </Box>{' '}
                        <Box paddingBlockStart="200" paddingBlockEnd="200">
                          <div className="flex items-center gap-2">
                            <SwitchButton
                              on={!!state.tlsVersion}
                              onChange={(on) =>
                                formState.addChange({
                                  tlsVersion: on ? 'TLSv1.2' : null,
                                })
                              }
                            />{' '}
                            Enable TLS
                          </div>
                        </Box>{' '}
                        {state.tlsVersion && (
                          <Box paddingBlockStart="200" paddingBlockEnd="200">
                            <Select
                              onChange={(value) =>
                                formState.addChange({ tlsVersion: value })
                              }
                              options={TLSVersionOptions}
                              value={state.tlsVersion}
                              label="TLS Version"
                              tone="magic"
                            />
                          </Box>
                        )}
                        <Box paddingBlockStart="200" paddingBlockEnd="200">
                          <div className="flex items-center gap-2">
                            <SwitchButton
                              on={state.useProxy}
                              onChange={(useProxy) =>
                                formState.addChange({ useProxy })
                              }
                            />{' '}
                            Enable Proxy
                          </div>
                        </Box>
                        {state.useProxy && (
                          <>
                            {' '}
                            <div className="sm:flex gap-2">
                              <Box
                                paddingBlockStart="200"
                                paddingBlockEnd="200"
                                width="100%"
                              >
                                <TextField
                                  onChange={(value) =>
                                    formState.addToStaged({ proxyHost: value })
                                  }
                                  error={formState.messages.proxyHost?.message}
                                  onBlur={() => formState.commitStaged()}
                                  value={staged.proxyHost!}
                                  autoComplete="true"
                                  label="Proxy Host"
                                  requiredIndicator
                                  tone="magic"
                                />
                              </Box>
                              <Box
                                paddingBlockStart="200"
                                paddingBlockEnd="200"
                                width="100%"
                              >
                                <TextField
                                  onChange={(value) =>
                                    formState.addToStaged({
                                      proxyPort: parseInt(value),
                                    })
                                  }
                                  error={formState.messages.proxyPort?.message}
                                  value={staged.proxyPort?.toString()}
                                  autoComplete="true"
                                  label="Proxy Port"
                                  requiredIndicator
                                  tone="magic"
                                />
                              </Box>
                            </div>
                            <div className="sm:flex gap-2 ">
                              <Box
                                paddingBlockStart="200"
                                paddingBlockEnd="200"
                                width="100%"
                              >
                                <TextField
                                  onChange={(value) =>
                                    formState.addToStaged({
                                      proxyUsername: value,
                                    })
                                  }
                                  error={
                                    formState.messages.proxyUsername?.message
                                  }
                                  onBlur={() => formState.commitStaged()}
                                  value={staged.proxyUsername!}
                                  autoComplete="true"
                                  label="Proxy User"
                                  tone="magic"
                                />
                              </Box>{' '}
                              <Box
                                paddingBlockStart="200"
                                paddingBlockEnd="200"
                                width="100%"
                              >
                                <TextField
                                  onChange={(value) =>
                                    formState.addToStaged({
                                      proxyPassword: value,
                                    })
                                  }
                                  error={
                                    formState.messages.proxyPassword?.message
                                  }
                                  onBlur={() => formState.commitStaged()}
                                  value={staged.proxyPassword!}
                                  label="Proxy Password"
                                  autoComplete="true"
                                  tone="magic"
                                />
                              </Box>
                            </div>
                          </>
                        )}
                      </div>
                      {/*<div className="border border-gray-400 p-4 rounded my-4">
                        <div className="flex">
                          <Box>
                            {' '}
                            <div
                              className="rounded-full p-2 ps-0"
                              onClick={() => setAuthType((p) => !p)}
                            >
                              <span
                                className={`${'px-4 py-1 rounded-full text-sm sm:text-lg cursor-pointer m-1 ms-0'} ${
                                  authType
                                    ? 'bg-[#00685B] text-white translate-x-full'
                                    : 'translate-x-0 hover:bg-gray-300'
                                }`}
                              >
                                Basic
                              </span>
                              <span
                                className={`${'px-4 py-1 rounded-full text-sm sm:text-lg cursor-pointer m-1'} ${
                                  !authType
                                    ? 'bg-[#00685B] text-white -translate-x-full'
                                    : 'translate-x-0 hover:bg-gray-300'
                                }`}
                              >
                                OAuth2
                              </span>
                            </div>
                          </Box>
                        </div>
                        {authType ? (
                          <div className="sm:flex gap-2">
                            <Box
                              paddingBlockStart="200"
                              paddingBlockEnd="200"
                              width="100%"
                            >
                              <TextField
                                autoComplete="true"
                                label="Username"
                                placeholder="Enter username"
                                tone="magic"
                              />
                            </Box>
                            <Box
                              paddingBlockStart="200"
                              paddingBlockEnd="200"
                              width="100%"
                            >
                              <TextField
                                autoComplete="true"
                                label="Password"
                                placeholder="Enter password"
                                tone="magic"
                                requiredIndicator
                              />
                            </Box>
                          </div>
                        ) : (
                          <>
                            {' '}
                            <div className="sm:flex gap-2">
                              {' '}
                              <Box
                                paddingBlockStart="200"
                                paddingBlockEnd="200"
                                width="100%"
                              >
                                <TextField
                                  autoComplete="true"
                                  label="Client ID"
                                  tone="magic"
                                  requiredIndicator
                                />
                              </Box>{' '}
                              <Box
                                paddingBlockStart="200"
                                paddingBlockEnd="200"
                                width="100%"
                              >
                                <TextField
                                  autoComplete="true"
                                  label="Client Secret"
                                  tone="magic"
                                  requiredIndicator
                                />
                              </Box>{' '}
                            </div>
                            <div className="sm:flex gap-2">
                              {' '}
                              <Box
                                paddingBlockStart="200"
                                paddingBlockEnd="200"
                                width="100%"
                              >
                                <TextField
                                  autoComplete="true"
                                  label="Authorization URI"
                                  tone="magic"
                                  requiredIndicator
                                />
                              </Box>{' '}
                              <Box
                                paddingBlockStart="200"
                                paddingBlockEnd="200"
                                width="100%"
                              >
                                <TextField
                                  autoComplete="true"
                                  label="Token URI"
                                  tone="magic"
                                  requiredIndicator
                                />
                              </Box>{' '}
                            </div>
                            <Box paddingBlockStart="200" paddingBlockEnd="200">
                              <TextField
                                helpText="Enter the scopes separated by comma."
                                autoComplete="true"
                                requiredIndicator
                                label="Scope"
                                tone="magic"
                              />
                            </Box>{' '}
                          </>
                        )}
                      </div>*/}
                    </>
                  )}

                  <Box paddingBlockStart="200" paddingBlockEnd="200">
                    <div className="flex gap-2 justify-end">
                      {Boolean(
                        state.provider === 'google' && isGmailConnected
                      ) || loaderData.smtpSettings?.id ? (
                        <SendTestEmail onTest={test} />
                      ) : null}

                      {provider === 'custom' ||
                      loaderData.smtpSettings?.provider === 'custom' ? (
                        <button
                          className="px-4 py-2 bg-[#006558] text-white font-bold shadow-md rounded-md disabled:opacity-40"
                          disabled={Boolean(
                            state.provider === 'google' && !isGmailConnected
                          )}
                          onClick={save}
                        >
                          Save
                        </button>
                      ) : null}
                    </div>
                  </Box>
                </div>
              </Card>
            </Layout.Section>
          </Layout>
        </Page>
      </div>
    </PageShell>
  );
};

export default SMTP;
