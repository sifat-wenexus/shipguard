import { shopify as shopifyRemix } from '../../modules/shopify.server';
import { Box, Layout, Page, Text } from '@shopify/polaris';
import PricingCard from './Pricing-card';
import type {  LoaderFunction } from '@remix-run/node';
export const loader: LoaderFunction = async ({ request }) => {
  await shopifyRemix.authenticate.admin(request);
  return null;
};

const Pricing = () => {
  return (
    <div className="ml-4 sm:ml-0 mt-10 sm:mt-4">
      <Page>
        <Layout>
          <div className="w-full ml-4 mb-2">
            <Text as="h1" variant="headingLg" alignment="start">
              Pricing
            </Text>
          </div>
          <div className="w-full ms-2 sm:ms-4 sm:me-0 me-2 bg-white rounded-lg shadow-sm p-4 mt-8 sm:mt-0">
            <Box padding={'400'}>
              <Text as="p" variant="headingLg" tone="subdued">
                Account info
              </Text>
              <div className="sm:flex sm:justify-between">
                <div>
                  <br />
                  <Text as="p" variant="headingMd">
                    Current plan
                  </Text>
                  <br />
                  <Text as="p" tone="subdued">
                    Standard-monthly
                  </Text>
                </div>
                <div>
                  <br />
                  <Text as="p" variant="headingMd">
                    Next bill
                  </Text>
                  <br />
                  <Text as="p" tone="subdued">
                    Due 14 Sep
                  </Text>
                </div>
                <div>
                  <br />
                  <Text as="p" variant="headingMd">
                    Insurance Revenue
                  </Text>
                  <br />
                  <Text as="p" tone="subdued">
                    $125,10
                  </Text>
                </div>
                {/* don't remove this empty div */}
                <div></div>
              </div>
            </Box>
          </div>
          <br />
          <PricingCard />
          <br />
        </Layout>
      </Page>
    </div>
  );
};

export default Pricing;
