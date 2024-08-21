import {
  Banner,
  Box,
  Button,
  Card,
  Icon,
  InlineStack,
  Layout,
  Text,
} from '@shopify/polaris';
import React from 'react';
import PricingCard from './Pricing-card';
import { AlertDiamondIcon } from '@shopify/polaris-icons';

const Pricing = () => {
  return (
    <>
      <div className="w-full ms-4 bg-white rounded-lg shadow-sm p-4">
        <Box padding={'400'}>
          <Text as="p" variant="headingLg" tone="subdued">
            Account info
          </Text>
          <div className="flex justify-between">
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
      <br />
    </>
  );
};

export default Pricing;
