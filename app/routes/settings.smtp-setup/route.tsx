import {
  Box,
  Button,
  Card,
  Checkbox,
  Icon,
  Layout,
  Page,
  Select,
  Text,
  TextField,
} from '@shopify/polaris';
import { ArrowLeftIcon, LogoGoogleIcon } from '@shopify/polaris-icons';
import { useCallback, useState } from 'react';

const SMTP = () => {
  const [selected, setSelected] = useState('custom');
  const [selectedSmtp, setSelectedSmtp] = useState('smtp');
  const [TLS, setTLS] = useState(false);
  const [proxy, setProxy] = useState(false);
  const [TLSVersion, setTLSVersion] = useState('');

  const handleSelectChange = useCallback(
    (value: string) => setSelected(value),
    []
  );
  const handleSelectSmtpChange = useCallback(
    (value: string) => setSelectedSmtp(value),
    []
  );
  const handleTLSVersionChange = useCallback(
    (value: string) => setTLSVersion(value),
    []
  );
  const options = [
    { label: 'Custom', value: 'custom' },
    { label: 'Google', value: 'google' },
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
  return (
    <div>
      <div className="ml-4 sm:ml-0 mt-10 sm:mt-4">
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
                <div className="w-full">
                  <Box paddingBlockStart="100" paddingBlockEnd="100">
                    <TextField
                      autoComplete="true"
                      label="Mail From"
                      placeholder="companyname@example.com"
                    />
                  </Box>{' '}
                  <Box paddingBlockStart="100" paddingBlockEnd="100">
                    <Select
                      label="SMTP Provider"
                      options={options}
                      onChange={handleSelectChange}
                      value={selected}
                    />
                  </Box>
                  {selected === 'google' ? (
                    <Box paddingBlockStart="100" paddingBlockEnd="100">
                      <Button
                        tone="success"
                        variant="primary"
                        size="large"
                        icon={<Icon source={LogoGoogleIcon} />}
                      >
                        Login With Google
                      </Button>
                    </Box>
                  ) : (
                    <div className="border border-gray-400 p-2 rounded my-4">
                      <Box paddingBlockStart="100" paddingBlockEnd="100">
                        <Text as="p" variant="headingMd">
                          Connection Settings
                        </Text>
                        <br />
                        <Select
                          label="SMTP Protocol"
                          options={protocolOptions}
                          onChange={handleSelectSmtpChange}
                          value={selectedSmtp}
                        />
                      </Box>
                      <div className="sm:flex gap-2">
                        {' '}
                        <Box
                          paddingBlockStart="100"
                          paddingBlockEnd="100"
                          width="100%"
                        >
                          <TextField
                            autoComplete="true"
                            label="SMTP Host"
                            placeholder="localhost"
                          />
                        </Box>{' '}
                        <Box
                          paddingBlockStart="100"
                          paddingBlockEnd="100"
                          width="100%"
                        >
                          <TextField
                            autoComplete="true"
                            label="SMTP Port"
                            placeholder="25"
                          />
                        </Box>{' '}
                      </div>
                      <Box paddingBlockStart="100" paddingBlockEnd="100">
                        <TextField
                          autoComplete="true"
                          label="Timeout(msec)"
                          placeholder="10000"
                        />
                      </Box>{' '}
                      <Box paddingBlockStart="100" paddingBlockEnd="100">
                        <Checkbox
                          label="Enable TLS"
                          checked={TLS}
                          onChange={() => setTLS((p) => !p)}
                        />
                      </Box>{' '}
                      {TLS && (
                        <Box paddingBlockStart="100" paddingBlockEnd="100">
                          <Select
                            label="TLS Version"
                            options={TLSVersionOptions}
                            onChange={handleTLSVersionChange}
                            value={TLSVersion}
                          />
                        </Box>
                      )}
                      <Box paddingBlockStart="100" paddingBlockEnd="100">
                        <Checkbox
                          label="Enable Proxy"
                          checked={proxy}
                          onChange={() => setProxy((p) => !p)}
                        />
                      </Box>
                      {proxy && (
                        <>
                          {' '}
                          <div className="sm:flex gap-2">
                            <Box
                              paddingBlockStart="100"
                              paddingBlockEnd="100"
                              width="100%"
                            >
                              <TextField
                                autoComplete="true"
                                label="Proxy host"
                              />
                            </Box>
                            <Box
                              paddingBlockStart="100"
                              paddingBlockEnd="100"
                              width="100%"
                            >
                              <TextField
                                autoComplete="true"
                                label="Proxy port"
                              />
                            </Box>
                          </div>
                          <div className="sm:flex gap-2 ">
                            <Box
                              paddingBlockStart="100"
                              paddingBlockEnd="100"
                              width="100%"
                            >
                              <TextField
                                autoComplete="true"
                                label="Proxy user"
                              />
                            </Box>{' '}
                            <Box
                              paddingBlockStart="100"
                              paddingBlockEnd="100"
                              width="100%"
                            >
                              <TextField
                                autoComplete="true"
                                label="Proxy password"
                              />
                            </Box>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            </Layout.Section>
          </Layout>
        </Page>
      </div>
    </div>
  );
};

export default SMTP;
