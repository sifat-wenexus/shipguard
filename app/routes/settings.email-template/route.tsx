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
import { ArrowLeftIcon, EditIcon, ThemeEditIcon } from '@shopify/polaris-icons';
import style from './styles/route.css';
import { useState } from 'react';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  ClassicEditor,
  Bold,
  Essentials,
  Italic,
  Mention,
  Paragraph,
  Undo,
} from 'ckeditor5';
import { SlashCommand } from 'ckeditor5-premium-features';

import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: style }];
const EmailTemplate = () => {
  const [template, setTemplate] = useState(null);
  const handleEditButton = (e) => {
    console.log(e);
    setTemplate(e);
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
                      <div>
                        <CKEditor
                          editor={ClassicEditor}
                          config={{
                            toolbar: {
                              items: ['undo', 'redo', '|', 'bold', 'italic'],
                            },
                            plugins: [
                              Bold,
                              Essentials,
                              Italic,
                              Mention,
                              Paragraph,
                              SlashCommand,
                              Undo,
                            ],
                            licenseKey: '<YOUR_LICENSE_KEY>',
                            mention: {
                              // Mention configuration
                            },
                            initialData:
                              '<p>Hello from CKEditor 5 in React!</p>',
                          }}
                        />
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
