import { ArrowLeftIcon, OrderIcon } from '@shopify/polaris-icons';
import ClaimRequestProcessCard from './claim-request-process-card';
import { ShadowBevelBox } from '~/components/shadow-bevel-box';
import SkeletonLoading from '~/components/skeliton-loading';
import { useI18n } from '@shopify/react-i18n';
import { useEffect, useState } from 'react';
import {
  PackageProtection,
  PackageProtectionClaimOrder,
  PackageProtectionOrder,
} from '#prisma-client';
import {
  BlockStack,
  Box,
  Button,
  Card,
  Divider,
  Icon,
  InlineGrid,
  Layout,
  Text,
} from '@shopify/polaris';

type IPackageProtectionOrder =
  | (PackageProtectionOrder & {
      email: String;
      PackageProtectionClaimOrder: PackageProtectionClaimOrder[];
    })
  | null;

const ClaimRequestProcess = ({ setIsProcess, orderId }) => {
  const [i18n] = useI18n();
  const [packageProtectionInformation, setPackageProtectionInformation] =
    useState<PackageProtection | null>(null);
  const [packageProtectionOrder, setPackageProtectionOrder] =
    useState<IPackageProtectionOrder>(null);
  const [loading, setLoading] = useState(false);

  const [tableData, setTableData] = useState<any>([]);
  const [refetch, setRefetch] = useState(0);

  const getData = async () => {
    setLoading(true);
    // const session=findOfflineSession()
    await fetch(`/get-claim-order-data?orderId=${orderId}`)
      .then((response) => response.json())
      .then((res) => {
        setPackageProtectionInformation(res.data.packageProtection);
        setPackageProtectionOrder(res.data.packageProtectionOrder);
        setTableData(res.data.convertedData);
        setLoading(false);
      })
      .catch((err) => setLoading(false));
  };
  useEffect(() => {
    getData();
  }, [refetch]);

  return (
    <>
      {loading ? (
        <Layout.Section variant="fullWidth">
          <SkeletonLoading />
        </Layout.Section>
      ) : (
        <>
          <Layout.Section variant="oneHalf">
            <Box paddingBlockEnd={'500'}>
              <Button icon={ArrowLeftIcon} onClick={() => setIsProcess(false)}>
                Back
              </Button>
            </Box>

            {tableData &&
              tableData?.map((data, i) => {
                return (
                  <ClaimRequestProcessCard
                    key={i}
                    data={data}
                    packageProtectionOrder={packageProtectionOrder}
                    setRefetch={setRefetch}
                  />
                );
              })}
            {/* </ShadowBevelBox> */}
          </Layout.Section>
          <Layout.Section variant="oneThird">
            {/* <Box paddingBlockEnd={'1200'}></Box> */}
            <div className="mt-0 md:mt-12"></div>
            <ShadowBevelBox
              icon={<Icon source={OrderIcon} />}
              title="Order Details"
            >
              <Card roundedAbove="sm">
                <BlockStack gap="200">
                  <InlineGrid columns="1fr auto">
                    <Text as="h2" variant="headingLg">
                      Customer Detail
                    </Text>
                  </InlineGrid>
                  <Text as="p" variant="bodyMd" tone="base">
                    {packageProtectionOrder?.email}
                  </Text>
                  <Divider borderColor="border-hover" />
                  <Text as="p" variant="bodyMd">
                    <span className="font-bold">Order Number: </span>
                    {packageProtectionOrder?.orderName}
                  </Text>
                  <Divider borderColor="border-hover" />
                  <Text as="p" variant="bodyMd">
                    <span className="font-bold">Order Amount: </span>{' '}
                    {i18n.formatCurrency(
                      Number(packageProtectionOrder?.orderAmount)
                    )}
                  </Text>
                  <Divider borderColor="border-hover" />
                  <Text as="p" variant="bodyMd">
                    <span className="font-bold ">Insurance Plan: </span>

                    <span className="capitalize">
                      {packageProtectionInformation?.insurancePriceType.toLowerCase()}
                    </span>
                  </Text>
                  <Divider borderColor="border-hover" />
                  <Text as="p" variant="bodyMd">
                    <span className="font-bold"> Insurance Amount: </span>
                    {i18n.formatCurrency(
                      Number(packageProtectionOrder?.protectionFee)
                    )}
                  </Text>
                </BlockStack>
              </Card>
            </ShadowBevelBox>
          </Layout.Section>
        </>
      )}
    </>
  );
};

export default ClaimRequestProcess;
