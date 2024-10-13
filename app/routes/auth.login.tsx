import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { useActionData, useLoaderData, useSubmit } from '@remix-run/react';
import LogoImg from '~/assets/images/inhouse-shipping-protection.png';
import polarisStyles from '@shopify/polaris/build/esm/styles.css';
import { LoginErrorType } from '~/shopify-app-remix/server';
import React, { useCallback, useState } from 'react';
import { shopify } from '~/modules/shopify.server';
import * as Icons from '@shopify/polaris-icons';
import { json } from '@remix-run/node';

import {
  AppProvider,
  Box,
  Button,
  Card,
  Divider,
  FormLayout,
  Image,
  InlineStack, Link,
  Text,
  TextField,
} from '@shopify/polaris';

export const action = async ({ request }: ActionFunctionArgs) => {
  const errors = await shopify.login(request);

  return json({
    errors: {
      shop:
        errors.shop === LoginErrorType.InvalidShop
          ? 'Shop domain is invalid'
          : 'Shop domain is required',
    },
    values: { shop: '' },
  });
};

export async function loader({ request }: LoaderFunctionArgs) {
  const { searchParams } = new URL(request.url);
  let shop = searchParams.get('shop');

  if (shop) {
    const errors = await shopify.login(request);

    return json({
      errors: {
        shop:
          errors.shop === LoginErrorType.InvalidShop
            ? 'Shop domain is invalid'
            : 'Shop domain is required',
      },
      values: { shop: '' },
    });
  }

  return json({
    errors: {
      shop: '',
    },
    values: {
      shop: '',
    },
  });
}

export const links = () => [{ rel: 'stylesheet', href: polarisStyles }];
export default function AuthLogin() {
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const [shop, setShop] = useState(loaderData?.values?.shop || '');
  const { errors } = actionData || loaderData;
  const submit = useSubmit();

  const handleSubmit = useCallback(() => {
    const formData = new FormData();

    formData.append('shop', `${shop}.myshopify.com`);

    submit(formData, {
      method: 'post',
    });
  }, [shop, submit]);

  return (
    <AppProvider i18n={{}}>
      <div className="flex justify-center w-full h-full flex-wrap">
        <div className="lg:w-1/4 lg:mt-40 mt-20">
          <Card>
            <Box
              paddingBlockStart="200"
              paddingInlineStart="400"
              paddingInlineEnd="400"
            >
              <InlineStack blockAlign="center" align="space-evenly">
                <Image source={LogoImg} alt="Overall" width="70px" />
              </InlineStack>
            </Box>

            <br />

            <Text as="h1" variant="headingXl" alignment="center">
              Custom Installation
            </Text>

            <Text as="p" variant="bodySm" alignment="center">
              Enter your shop's domain name to install the app
            </Text>

            <br />
            <Divider />
            <br />

            <FormLayout>
              <TextField
                label="Shop's Domain Name"
                suffix=".myshopify.com"
                error={errors.shop}
                onChange={setShop}
                autoComplete="on"
                prefix="https://"
                value={shop}
                type="text"
                name="shop"
              />

              <Button
                icon={Icons.WrenchIcon}
                onClick={handleSubmit}
                variant="primary"
                tone="success"
                size="large"
                fullWidth
              >
                Install
              </Button>

              <Text as="p" variant="bodySm" alignment="center">
                By installing this app, you agree to our <Link url="/terms-of-service" target="_blank">Terms of
                Service</Link> and <Link url="/privacy-policy" target="_blank">Privacy Policy</Link>
              </Text>
            </FormLayout>
          </Card>
        </div>
      </div>
    </AppProvider>
  );
}
