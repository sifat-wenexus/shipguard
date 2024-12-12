import ClaimFulfillModal from './claim-fulfill-modal';
import ClaimStatusModal from './claim-status-modal';
import { useI18n } from '@shopify/react-i18n';
import {
  Badge,
  BlockStack,
  Card,
  DataTable,
  Divider,
  IndexTable,
  InlineGrid,
  Link,
  Text,
  Thumbnail,
  Tooltip,
} from '@shopify/polaris';

const ClaimRequestProcessCard = ({
  data,
  packageProtectionOrder,
  setRefetch,
}) => {
  const [i18n] = useI18n();

  function formatDateTime(input) {
    const formatTime = new Intl.DateTimeFormat('en', {
      day: 'numeric',
      month: 'short',
      hour: 'numeric',
      minute: 'numeric',
    });
    return formatTime.format(new Date(input));
  }

  const { claimStatus, fulfillmentLineItems } = data;
  const { taxRate} = fulfillmentLineItems[0] || {};
  const totalAmount = fulfillmentLineItems.reduce((a: number, b) => {
    const originalPrice = Number(b.originalPrice) || 0;
    const discountPrice = Number(b.discountPrice) || 0;
    const quantity = Number(b.quantity) || 0;

    return a + (originalPrice - discountPrice) * quantity;
  }, 0);
  const totalVat =
    fulfillmentLineItems
      .filter((e) => e.taxable)
      .reduce((a, b) => {
        const originalPrice = Number(b.originalPrice) || 0;
        const discountPrice = Number(b.discountPrice) || 0;
        const quantity = Number(b.quantity) || 0;

        return a + (originalPrice - discountPrice) * quantity;
      }, 0) * (Number(taxRate) || 0);

  const totalAmountWithVat = totalAmount + totalVat;

  const claimDate = packageProtectionOrder?.PackageProtectionClaimOrder.find(
    (e) =>
      fulfillmentLineItems.some((i) => i.lineItemId === e.fulfillmentLineItemId)
  );

  return (
    <div key={data.id}>
      <Card roundedAbove="sm">
        <BlockStack gap="200">
          <InlineGrid columns="1fr auto">
            <Text as="h2" variant="headingLg">
              Claim {data.name}{' '}
              <Badge
                tone={
                  claimStatus === 'INPROGRESS'
                    ? 'warning'
                    : claimStatus === 'APPROVE'
                    ? 'success'
                    : claimStatus === 'CANCEL'
                    ? 'critical'
                    : claimStatus === 'REQUESTED'
                    ? 'info'
                    : 'new'
                }
              >
                {claimStatus === 'INPROGRESS'
                  ? 'In Progress'
                  : claimStatus
                      ?.toLowerCase()
                      .replace(/^\w/, (c) => c.toUpperCase()) ??
                    'Not requested'}
              </Badge>
            </Text>
            <ClaimStatusModal data={data} setRefetch={setRefetch} />
          </InlineGrid>
          <Text as="p" variant="bodyMd">
            <span className="font-bold">Date: </span>
            {packageProtectionOrder && formatDateTime(claimDate.createdAt)}
          </Text>

          <IndexTable
            key={data.id}
            // resourceName={{ singular: 'item', plural: 'items' }}
            itemCount={fulfillmentLineItems?.length}
            selectable={false}
            headings={[
              { title: 'Item' },
              { title: 'Price' },
              { title: 'Total' },
            ]}
          >
            {fulfillmentLineItems.map(
              (
                {
                  id,
                  title,
                  compareAtPrice,
                  originalPrice,
                  discountPrice,
                  quantity,
                  image,
                  name,
                  sku,
                },
                index
              ) => {
                return (
                  <IndexTable.Row
                    id={id?.toString()}
                    key={index}
                    //selected={selectedResources?.includes(OrderId)}
                    position={index}
                  >
                    <IndexTable.Cell>
                      <div
                        style={{
                          display: 'flex',
                          gap: '5px',
                          alignItems: 'center',
                        }}
                      >
                        <Thumbnail source={image} size="small" alt={name} />
                        <div>
                          <Tooltip content={title}>
                            <div className="w-[200px] overflow-hidden text-ellipsis ">
                              <Text
                                variant="bodyMd"
                                fontWeight="bold"
                                as="span"
                                breakWord={true}
                              >
                                {title}
                              </Text>
                            </div>
                          </Tooltip>

                          <Text
                            as="span"
                            variant="bodySm"
                            tone="subdued"
                            truncate
                          >
                            {sku ? `SKU:${sku}` : null}
                          </Text>
                        </div>
                      </div>
                    </IndexTable.Cell>
                    <IndexTable.Cell>
                      {Number(originalPrice) < Number(compareAtPrice) && (
                        <Text
                          textDecorationLine="line-through"
                          as="span"
                          tone="subdued"
                        >
                          {i18n.formatCurrency(Number(compareAtPrice))}
                        </Text>
                      )}
                      &nbsp;{' '}
                      {i18n.formatCurrency(
                        Number(originalPrice) - Number(discountPrice)
                      )}{' '}
                      x {quantity}
                    </IndexTable.Cell>
                    <IndexTable.Cell>
                      {i18n.formatCurrency(
                        Number(originalPrice) - Number(discountPrice) * quantity
                      )}
                    </IndexTable.Cell>
                  </IndexTable.Row>
                );
              }
            )}
          </IndexTable>
          <Divider borderColor="border-hover" />
          <div className="flex justify-end mr-3">
            <div className="w-full sm:w-[37%] ">
              <DataTable
                rows={[
                  [
                    <b key={'c'}>Total Amount:</b>,
                    <b key={'d'}>
                      {isNaN(totalAmountWithVat)
                        ? i18n.formatCurrency(Number(totalAmount))
                        : i18n.formatCurrency(totalAmountWithVat)}
                    </b>,
                  ],
                ]}
                headings={[]}
                columnContentTypes={['text', 'text', 'text', 'text']}
              />
            </div>
          </div>

          <Divider borderColor="border-hover" />
          <Text as="p" variant="bodyMd">
            <span className="font-bold">Customer Note: </span> {data.comments}
          </Text>
          <Text as="p" variant="headingMd">
            Attachments:
          </Text>
          <div className="flex gap-2 ">
            {data?.imageUrls?.map((img) => (
              <Link target="_blank" url={img} key={img}>
                {' '}
                <Thumbnail source={img} alt={img} size="large" />
              </Link>
            ))}
          </div>
        </BlockStack>
        <ClaimFulfillModal
          fulfillmentLineItems={fulfillmentLineItems.map((e, i) => ({
            ...e,
            id: i + 1,
            refundQuantity: 0,
            reorderQuantity: 0,
          }))}
          setRefetch={setRefetch}
          fulfillClaim={data.fulfillClaim}
          claimStatus={claimStatus}
        />
      </Card>

      <br />
    </div>
  );
};

export default ClaimRequestProcessCard;
