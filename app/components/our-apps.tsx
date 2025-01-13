import React from 'react';
import { Badge, Box, Button, Text } from '@shopify/polaris';

const OurApps = () => {
  const appsList = [
    {
      logo: 'https://cdn.shopify.com/s/files/applications/e908321256bdfc45838d5741fde0e28d_200x200.png?1734846471',
      description:'Automatic Schedule or Instant Flash Sales, Bulk Price Edits & Sales Discount Campaigns.',
      appUrl: 'https://apps.shopify.com/daily-deal-sales-discounts',
      heading: 'Discounts & Bulk Price Editors App',
      title: ' FlashX: Sales & Discounts',
    },
  ];

  return (
    <Box>
      <br />
      <h1 className="text-xl my-3 font-bold ms-4 sm:ms-0">Recommended</h1>
      {appsList.map((app, index) => {
        return (
          <div className="bg-white p-4 rounded-lg shadow-lg mb-4" key={index}>
            <div className="flex flex-col gap-2 sm:gap-5">
              <Text variant="headingMd" as="h4">
                {app.heading}
              </Text>
              <div className="flex flex-wrap items-center gap-2 rounded-lg border border-[#00000026] p-5 sm:gap-5">
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg sm:h-[60px] sm:w-[60px]">
                  <img src={app.logo} alt="app_icon" />
                </div>
                <div className="flex w-full flex-1 flex-col gap-2 sm:gap-3">
                  <div className="flex items-center gap-2 sm:gap-4">
                    <span
                      className="cursor-pointer	leading-4 text-[#2C6ECB] underline-offset-1 hover:underline"
                      onClick={() => window.open(app.appUrl, '_blank')}
                    >
                      {app.title}
                    </span>
                    <Badge tone="success">Free</Badge>
                  </div>
                  <span className="leading-5">{app.description}</span>
                </div>
                <div className="w-full sm:w-auto">
                  <Button
                    variant="primary"
                    tone="success"
                    target="_blank"
                    url={app.appUrl}
                  >
                    Install Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <br />
      <br />
      <br />
    </Box>
  );
};

export default OurApps;
