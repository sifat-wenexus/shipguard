import {
  Box,
  Card,
  SkeletonBodyText,
  SkeletonDisplayText,
} from '@shopify/polaris';
import React from 'react';

const DashboardLoading = () => {
  return (
    <>
      <Box paddingBlockStart={'400'} paddingBlockEnd={'400'}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 md:gap:4">
          <div className="col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 gap-y-4 ">
              {new Array(6).fill(',').map((e, i) => (
                <div key={i} className="col-span-1">
                  <Card>
                    <SkeletonDisplayText size="small" />
                    <div className="mt-2"></div>
                    <SkeletonBodyText lines={2} />
                  </Card>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-2 border h-full">
            <div className="bg-white rounded-lg shadow-sm h-full p-4">
              <SkeletonDisplayText size="small" />
              <div className="mt-3"></div>
              <SkeletonBodyText lines={2} />
              <div className="mt-3"></div>

              <SkeletonDisplayText size="small" />
              <div className="mt-3"></div>
              <SkeletonBodyText lines={2} />
            </div>
          </div>
        </div>
      </Box>
      <div className="grid grid-cols-2 gap-4">
        <Box paddingBlockStart={'400'} paddingBlockEnd={'400'}>
          <div className="bg-white rounded-lg shadow-sm h-full p-4">
            <SkeletonDisplayText size="small" />
            <div className="mt-3"></div>
            <SkeletonBodyText lines={2} />
            <div className="mt-3"></div>

            <SkeletonDisplayText size="small" />
            <div className="mt-3"></div>
            <SkeletonBodyText lines={2} />
          </div>
        </Box>

        <Box paddingBlockStart={'400'} paddingBlockEnd={'400'}>
          <div className="bg-white rounded-lg shadow-sm h-full p-4">
            <SkeletonDisplayText size="small" />
            <div className="mt-3"></div>
            <SkeletonBodyText lines={2} />
            <div className="mt-3"></div>

            <SkeletonDisplayText size="small" />
            <div className="mt-3"></div>
            <SkeletonBodyText lines={2} />
          </div>
        </Box>
      </div>
    </>
  );
};

export default DashboardLoading;
