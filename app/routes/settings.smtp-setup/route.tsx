import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { useBetterFetcher } from '~/hooks/use-better-fetcher';
import { queryProxy } from '~/modules/query/query-proxy';
import { ArrowLeftIcon } from '@shopify/polaris-icons';
import { useCallback, useMemo, useState } from 'react';
import { Link, useLoaderData } from '@remix-run/react';
import SwitchButton from './components/switch-button';
import { shopify } from '~/modules/shopify.server';
import GmailLogo from '~/assets/images/gmail.png';
import { prisma } from '~/modules/prisma.server';
import { useQuery } from '~/hooks/use-query';
import { json } from '@remix-run/node';

import {
  AccountConnection,
  TextField,
  Button,
  Select,
  Layout,
  Card,
  Page,
  Text,
  Box,
} from '@shopify/polaris';

export async function loader({ request }: LoaderFunctionArgs) {
  const { session } = await shopify.authenticate.admin(request);

  const gmailAuth = await prisma.gmailAuthCredential.findFirst({
    where: {
      id: session.storeId,
    },
  });

  return json({
    isGmailConnected: !!gmailAuth?.payload,
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const { session } = await shopify.authenticate.admin(request);

  const data = await request.formData();
  const action = data.get('action');

  if (action === 'disconnect') {
    const provider = data.get('provider');

    if (provider === 'google') {
      await queryProxy.gmailAuthCredential.delete({
        where: {
          id: session.storeId,
        },
      }, { session });

      return json({
        message: 'Google account disconnected.',
        success: true,
      });
    }

    return json({
      message: 'Something went wrong, please try again. If the problem persists, contact support.',
      success: false,
    });
  }
}

const SMTP = () => {
  const [selected, setSelected] = useState('google');
  const [selectedSmtp, setSelectedSmtp] = useState('smtp');
  const [TLS, setTLS] = useState(false);
  const [proxy, setProxy] = useState(false);
  const [TLSVersion, setTLSVersion] = useState('');
  const [button, setButton] = useState(false);
  const fetcher = useBetterFetcher();

  const loaderData = useLoaderData<typeof loader>();

  const handleSelectChange = useCallback(
    (value: string) => setSelected(value),
    [],
  );
  const handleSelectSmtpChange = useCallback(
    (value: string) => setSelectedSmtp(value),
    [],
  );
  const handleTLSVersionChange = useCallback(
    (value: string) => setTLSVersion(value),
    [],
  );
  const options = [
    { label: 'Google', value: 'google' },
    { label: 'Custom', value: 'custom' },
  ];
  const protocolOptions = [
    { label: 'SMTP', value: 'smtp' },
    { label: 'SMTPS', value: 'smtps' },
  ];
  const TLSVersionOptions = [
    { label: 'TLSv1', value: 'TLSv1' },
    { label: 'TLSv1.1', value: 'TLSv1.1' },
    { label: 'TLSv1.2', value: 'TLSv1.2' },
    { label: 'TLSv1.3', value: 'TLSv1.3' },
  ];

  const gmailAuthQuery = useMemo(() => queryProxy.gmailAuthCredential.subscribeFindFirst(), []);
  const gmailAuth = useQuery(gmailAuthQuery);

  const isGmailConnected = useMemo(() => loaderData.isGmailConnected || !!gmailAuth.data?.payload, [gmailAuth.data?.payload, loaderData.isGmailConnected]);

  const authorize = useCallback(async () => {
    const url = await fetch('/gmail-oauth-url').then(r => r.text());

    window.open(url, '_blank'/*, `height=800,width=800,toolbar=no,resizable=no,left=${window.screen.width / 2 - 400},top=${window.screen.height / 2 - 400}`*/);
  }, []);

  const disconnectGmail = useCallback(async () => {
    await fetcher.submit({
      toast: true,
      loading: true,
    }, {
      action: 'disconnect',
      provider: 'google',
    }, {
      method: 'POST',
    });
  }, [fetcher]);

  return (
    <>
      <div className="mt-8 sm:mt-4 m-2">
        <Page>
          <Layout>
            <Layout.Section variant="fullWidth">
              <div className="mb-4 flex items-center gap-4">
                <Button icon={ArrowLeftIcon} url="/settings"></Button>
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
                      onChange={handleSelectChange}
                      tone="magic"
                      value={selected}
                      requiredIndicator
                    />
                  </Box>
                  {selected === 'google' ? (
                    <Box paddingBlockStart="200" paddingBlockEnd="200">
                      <AccountConnection
                        details={!isGmailConnected ? 'Connect with your Google account to send emails using Gmail\'s SMTP server.' : 'Your Google account is connected.'}
                        termsOfService={
                          isGmailConnected ? null : (
                            <p>
                              By connecting your Google account, you agree to accept our{' '} <Link
                              to="/gmail-terms-of-service" className="underline">Terms of Service</Link> and{' '} <Link
                              to="/gmail-privacy-policy" className="underline">Privacy Policy</Link>.
                            </p>
                          )
                        }
                        connected={isGmailConnected}
                        title="Google Account"
                        avatarUrl={GmailLogo}
                        accountName="Google"
                        action={{
                          content: isGmailConnected ? 'Disconnect' : 'Connect',
                          onAction: isGmailConnected ? disconnectGmail : authorize,
                          external: !isGmailConnected,
                        }} />
                    </Box>
                  ) : (
                    <>
                      <Box paddingBlockStart="200" paddingBlockEnd="200">
                        <TextField
                          autoComplete="true"
                          label="Mail From"
                          placeholder="name@company.com"
                          tone="magic"
                          requiredIndicator
                        />
                      </Box>{' '}
                      <div className="border border-gray-400 p-4 rounded my-4">
                        <Box paddingBlockStart="200" paddingBlockEnd="200">
                          <Text as="p" variant="headingMd">
                            Connection Settings
                          </Text>
                          <br />
                          <Select
                            label="SMTP Protocol"
                            options={protocolOptions}
                            onChange={handleSelectSmtpChange}
                            value={selectedSmtp}
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
                              autoComplete="true"
                              label="SMTP Host"
                              placeholder="localhost"
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
                              label="SMTP Port"
                              placeholder="25"
                              tone="magic"
                              requiredIndicator
                            />
                          </Box>{' '}
                        </div>
                        <Box paddingBlockStart="200" paddingBlockEnd="200">
                          <TextField
                            autoComplete="true"
                            label="Timeout(msec)"
                            placeholder="10000"
                            tone="magic"
                            requiredIndicator
                          />
                        </Box>{' '}
                        <Box paddingBlockStart="200" paddingBlockEnd="200">
                          <div className="flex items-center gap-2">
                            <SwitchButton on={TLS} setOn={setTLS} /> Enable TLS
                          </div>
                        </Box>{' '}
                        {TLS && (
                          <Box paddingBlockStart="200" paddingBlockEnd="200">
                            <Select
                              label="TLS Version"
                              options={TLSVersionOptions}
                              onChange={handleTLSVersionChange}
                              value={TLSVersion}
                              tone="magic"
                            />
                          </Box>
                        )}
                        <Box paddingBlockStart="200" paddingBlockEnd="200">
                          <div className="flex items-center gap-2">
                            <SwitchButton on={proxy} setOn={setProxy} /> Enable
                            Proxy
                          </div>
                          {/* <SwitchButton /> */}
                          {/* <Checkbox
                            label="Enable Proxy"
                            checked={proxy}
                            onChange={() => setProxy((p) => !p)}
                          /> */}
                        </Box>
                        {proxy && (
                          <>
                            {' '}
                            <div className="sm:flex gap-2">
                              <Box
                                paddingBlockStart="200"
                                paddingBlockEnd="200"
                                width="100%"
                              >
                                <TextField
                                  autoComplete="true"
                                  label="Proxy host"
                                  tone="magic"
                                  requiredIndicator
                                />
                              </Box>
                              <Box
                                paddingBlockStart="200"
                                paddingBlockEnd="200"
                                width="100%"
                              >
                                <TextField
                                  autoComplete="true"
                                  label="Proxy port"
                                  tone="magic"
                                  requiredIndicator
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
                                  autoComplete="true"
                                  label="Proxy user"
                                  tone="magic"
                                />
                              </Box>{' '}
                              <Box
                                paddingBlockStart="200"
                                paddingBlockEnd="200"
                                width="100%"
                              >
                                <TextField
                                  autoComplete="true"
                                  label="Proxy password"
                                  tone="magic"
                                />
                              </Box>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="border border-gray-400 p-4 rounded my-4">
                        <Box paddingBlockStart="200" paddingBlockEnd="200">
                          <Text as="p" variant="headingMd">
                            Authentication
                          </Text>
                          <br />
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
                          </Box>{' '}
                        </Box>
                        <div className="flex">
                          <Box>
                            {' '}
                            <div
                              className="rounded-full p-2 ps-0"
                              onClick={() => setButton((p) => !p)}
                            >
                              <span
                                className={`${'px-4 py-1 rounded-full text-sm sm:text-lg cursor-pointer m-1 ms-0'} ${
                                  button
                                    ? 'bg-[#00685B] text-white translate-x-full'
                                    : 'translate-x-0 hover:bg-gray-300'
                                }`}
                              >
                                Basic
                              </span>
                              <span
                                className={`${'px-4 py-1 rounded-full text-sm sm:text-lg cursor-pointer m-1'} ${
                                  !button
                                    ? 'bg-[#00685B] text-white -translate-x-full'
                                    : 'translate-x-0 hover:bg-gray-300'
                                }`}
                              >
                                OAuth2
                              </span>
                            </div>
                          </Box>
                        </div>
                        {button ? (
                          <Box paddingBlockStart="200" paddingBlockEnd="200">
                            <TextField
                              autoComplete="true"
                              label="Password"
                              placeholder="Enter password"
                              tone="magic"
                              requiredIndicator
                            />
                          </Box>
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
                                  label="Client secret"
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
                                autoComplete="true"
                                label="Scope"
                                tone="magic"
                                requiredIndicator
                              />
                            </Box>{' '}
                          </>
                        )}
                      </div>
                      <Box paddingBlockStart="200" paddingBlockEnd="200">
                        <div className="flex gap-2 justify-end">
                          {' '}
                          <button className="px-4 py-2 bg-white font-bold shadow-md rounded-lg border">
                            Send test mail
                          </button>
                          <button className="px-4 py-2 bg-[#006558] text-white font-bold shadow-md rounded-md ">
                            Save
                          </button>
                        </div>
                      </Box>{' '}
                    </>
                  )}
                </div>
              </Card>
            </Layout.Section>
          </Layout>
        </Page>
      </div>
    </>
  );
};

export default SMTP;
