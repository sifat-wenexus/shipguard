import { useBetterFetcher } from '~/hooks/use-better-fetcher';
import React, { useCallback, useMemo, useState } from 'react';
import { useI18n } from '@shopify/react-i18n';
import {
  BlockStack,
  DataTable,
  Divider, Icon,
  IndexTable,
  Modal,
  Select,
  Text,
  TextField,
  Thumbnail, Tooltip,
} from '@shopify/polaris';
import { AlertDiamondIcon } from '@shopify/polaris-icons';

export type IClaimType =
  | 'REFOUND_BY_AMOUNT_LINE_ITEM'
  | 'REFOUND_BY_AMOUNT'
  | 'REORDER';

const ClaimFulfillModal = ({
  fulfillmentLineItems: data,
  setRefetch,
  fulfillClaim,
                             claimStatus
}) => {
  const [i18n] = useI18n();
  const fetcher = useBetterFetcher();
  const [fulfillmentLineItems, setFulfillmentLineItems] = useState(data);
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
const [fulfillError, setFulfillError] = useState('');
  const [claimType, setClaimType] = useState<IClaimType>(
    'REFOUND_BY_AMOUNT_LINE_ITEM'
  );
  const [refundAmount, setRefundAmount] = useState('');

  const handleModalChange = useCallback(() => {
    if(claimStatus!=='APPROVE'){
      setFulfillError('Please Change Claim Status!');
      return;
    }
    setActive(!active);
  }, [active,claimStatus]);
  const handleClose = () => {
    setFulfillmentLineItems(data);
    handleModalChange();
  };

  const handleSubmit = async () => {
    setLoading(true);

    if (claimType === 'REORDER') {
      const reorderItems = fulfillmentLineItems.filter(
        (lineItem) => lineItem.reorderQuantity
      );
      if (!reorderItems.length) {
        setLoading(false);
        alert('Please add quantity to reorder');
        return;
      }
      await fetcher

        .submit(
          { loading: true, toast: true },
          {
            action: 'REORDER',
            state: JSON.stringify({
              reorderItems,
              // approveText,
              // selectedStatus,
              fulfillmentId: data.id,
            }),
          },
          {
            action: '/get-claim-order-data',
            method: 'POST',
          }
        )
        .then((e) => {
          setLoading(false);
          handleClose();
          setRefetch((p ) => p + 1);
        })
        .catch((err) => setLoading(false));
    } else if (claimType === 'REFOUND_BY_AMOUNT') {
      if (+refundAmount <= 0) {
        setLoading(false);
        alert('Please enter a valid refund amount');
        return;
      }
      await fetcher

        .submit(
          { loading: true, toast: true },
          {
            action: 'REFOUND_BY_AMOUNT',
            state: JSON.stringify({
              fulfillmentLineItems,
              refundAmount,
            }),
          },
          {
            action: '/get-claim-order-data',
            method: 'POST',
          }
        )
        .then((e) => {
          setLoading(false);
          handleClose();
          setRefetch((p) => p + 1);
        })
        .catch((err) => setLoading(false));
    } else if (claimType === 'REFOUND_BY_AMOUNT_LINE_ITEM') {
      const refundItems = fulfillmentLineItems.filter(
        (lineItem) => lineItem.refundQuantity
      );

      if (!refundItems.length) {
        setLoading(false);
        alert('Please add quantity to refund items');
        return;
      }
      const refundAmount = refundItems.reduce(
        (a, b) =>
          a +
          (Number(b.originalPrice) - Number(b.discountPrice)) *
            Number(b.refundQuantity),
        0
      );
      const totalVat =
        refundItems
          .filter((e) => e.taxable)
          .reduce(
            (a, b) =>
              a +
              (Number(b.originalPrice) - Number(b.discountPrice)) *
                Number(b.refundQuantity),

            0
          ) * taxRate;

      // ---------
      await fetcher

        .submit(
          { loading: true, toast: true },
          {
            action: 'REFOUND_BY_AMOUNT_LINE_ITEM',
            state: JSON.stringify({
              refundItems,
              refundAmount: refundAmount + totalVat,
            }),
          },
          {
            action: '/get-claim-order-data',
            method: 'POST',
          }
        )
        .then((e) => {
          setLoading(false);
          handleClose();
          setRefetch((p) => p + 1);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  };

  const options = useMemo(
    () => [
      {
        label: 'Refunded By Line Item',
        value: 'REFOUND_BY_AMOUNT_LINE_ITEM',
      },
      { label: 'Refunded By Amount', value: 'REFOUND_BY_AMOUNT' },
      { label: 'Reorder', value: 'REORDER' },
    ],
    []
  );

  const activator = (
    <>
      {fulfillError&&<p className=' font-bold p-3 rounded-md my-2 bg-yellow-400 flex gap-2 '><span><Icon source={AlertDiamondIcon}/> </span>{fulfillError}</p>}
      <button
        className="p-2 mt-2 rounded-md w-full font-semibold border bg-green-400 hover:bg-green-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
        onClick={handleModalChange}
        disabled={fulfillClaim}
      >
        Fulfill Claim
      </button>
    </>
  );
  const totalAmount = fulfillmentLineItems.reduce(
    (a:any, b:any) =>
      a +
      (Number(b.originalPrice) - Number(b.discountPrice)) *
        Number(b.refundQuantity),
    0
  );

  const { taxRate, taxPercentage, taxTitle } = fulfillmentLineItems[0] || {};

  const totalVat =
    fulfillmentLineItems
      .filter((e:any) => e.taxable)
      .reduce(
        (a:any, b:any) =>
          a +
          (Number(b.originalPrice) - Number(b.discountPrice)) *
            Number(b.refundQuantity),

        0
      ) * taxRate;

  const totalAmountWithVat = totalAmount + totalVat;

  let lineItemRender: React.ReactNode | null = null;
  if (claimType === 'REFOUND_BY_AMOUNT_LINE_ITEM') {
    const handleChange = (e: number, lineItemId:any) => {

      setFulfillmentLineItems((prev:any) =>
        prev.map((item:any) => {
          if (item.lineItemId === lineItemId) {
            return { ...item, refundQuantity: e > item.quantity ? 0 : e };
          } else {
            return item;
          }
        })
      );
    };
    lineItemRender = (
      <BlockStack gap="200">
        <IndexTable
          // resourceName={{ singular: 'item', plural: 'items' }}
          itemCount={fulfillmentLineItems?.length}
          selectable={false}
          headings={[
            { title: 'Item' },
            { title: 'Price' },
            { title: 'Quantity', alignment: 'center' },
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
                lineItemId,
                refundQuantity,

              },
              index:any
            ) => {
              return (
                <IndexTable.Row
                  id={id?.toString()}
                  key={id}
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
                    {Number(discountPrice) <Number(compareAtPrice)&&
                      <Text
                        textDecorationLine="line-through"
                        as="span"
                        tone="subdued"
                      >
                        {i18n.formatCurrency(Number(compareAtPrice))}
                      </Text>
                    }
                    &nbsp;{' '}
                    {i18n.formatCurrency(
                      Number(originalPrice) - Number(discountPrice)
                    )}
                  </IndexTable.Cell>
                  <IndexTable.Cell>
                    <div className="reorder-text-field flex justify-center">
                      <div className="4/5">
                        <TextField
                          label=""
                          autoComplete="off"
                          value={refundQuantity}
                          onChange={(q) => handleChange(Number(q), lineItemId)}
                          max={quantity}
                          min={0}
                          suffix={`/${quantity}`}
                          type="number"
                        />
                      </div>
                    </div>
                  </IndexTable.Cell>

                  <IndexTable.Cell>
                    {i18n.formatCurrency(
                      (Number(originalPrice) - Number(discountPrice)) * quantity
                    )}
                  </IndexTable.Cell>
                </IndexTable.Row>
              );
            }
          )}
        </IndexTable>
        <Divider borderColor="border-hover" />
        <div className="flex justify-end mr-4">
          <div className="w-2/5 ">
            <DataTable
              rows={[
                // ['Discount Value:', `-${i18n.formatCurrency(discountAmount)}`],
                [
                  `${taxTitle} (${taxPercentage}%) :`,
                  `${i18n.formatCurrency(totalVat)}`,
                ],
                [
                  <b key={'amount'}>Total Amount:</b>,
                  <b key={'total-amount'}>{i18n.formatCurrency(totalAmountWithVat)}</b>,
                ],
              ]}
              headings={[]}
              columnContentTypes={['text', 'text', 'text']}
            />
          </div>
        </div>
      </BlockStack>
    );
  }
  if (claimType === 'REORDER') {
    const handleChange = (e: number, lineItemId:any) => {
      setFulfillmentLineItems((prev:any) =>
        prev.map((item:any) => {
          if (item.lineItemId === lineItemId) {
            return { ...item, reorderQuantity: e > item.quantity ? 0 : e };
          } else {
            return item;
          }
        })
      );
    };
    const totalAmount = fulfillmentLineItems.reduce(
      (a:any, b:any) => a + Number(b.originalPrice) * Number(b.reorderQuantity),
      0
    );
    lineItemRender = (
      <BlockStack gap="200">
        <IndexTable
          // resourceName={{ singular: 'item', plural: 'items' }}
          itemCount={fulfillmentLineItems?.length}
          selectable={false}
          headings={[
            { title: 'Item' },
            { title: 'Price' },
            { title: 'Quantity', alignment: 'center' },
            { title: 'Total' },
          ]}
        >
          {fulfillmentLineItems.map(
            (
              {
                id,
                title,
                originalPrice,
                quantity,
                image,
                name,
                sku,
                reorderQuantity,
                lineItemId,
              },
              index:any
            ) => {
              return (
                <IndexTable.Row id={id?.toString()} key={id} position={index}>
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


                        {/*<Text variant="bodyMd" fontWeight="bold" as="span">*/}
                        {/*  {title}*/}
                        {/*</Text>*/}
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
                    {' '}
                    <Text as="span" tone="subdued">
                      {i18n.formatCurrency(Number(originalPrice))}
                    </Text>
                  </IndexTable.Cell>
                  <IndexTable.Cell>
                    <div className="reorder-text-field flex justify-center">
                      <div className="w-2/3">
                        <TextField
                          label=""
                          autoComplete="off"
                          value={reorderQuantity}
                          onChange={(e) => handleChange(Number(e), lineItemId)}
                          max={quantity}
                          min={0}
                          suffix={`/${quantity}`}
                          type="number"
                        />
                      </div>
                    </div>
                  </IndexTable.Cell>
                  <IndexTable.Cell>
                    {i18n.formatCurrency(
                      Number(originalPrice) * Number(quantity)
                    )}
                  </IndexTable.Cell>
                </IndexTable.Row>
              );
            }
          )}
        </IndexTable>
        <Divider borderColor="border-hover" />
        <div className="mr-8 my-2">
          <Text as="p" variant="headingMd" alignment="end">
            Total Amount: {i18n.formatCurrency(totalAmount)}
          </Text>
        </div>
      </BlockStack>
    );
  }
  if (claimType === 'REFOUND_BY_AMOUNT') {
    const refundTotalAmount = fulfillmentLineItems.reduce(
      (a:any, b:any) =>
        a +
        (Number(b.originalPrice) - Number(b.discountPrice)) *
          Number(b.quantity),
      0
    );
    const refundTotalVat =
      fulfillmentLineItems
        .filter((e:any) => e.taxable)
        .reduce(
          (a:any, b:any) =>
            a +
            (Number(b.originalPrice) - Number(b.discountPrice)) *
              Number(b.quantity),

          0
        ) * taxRate;

    const refundTotalAmountWithVat = refundTotalAmount + refundTotalVat;
    lineItemRender = (
      <TextField
        label="Refund Amount"
        type="number"
        placeholder={`0.00`}
        prefix={`${i18n.getCurrencySymbol(i18n.defaultCurrency).symbol}`}
        value={refundAmount}
        onChange={(e) => {
          setError(e > refundTotalAmountWithVat);
          e <= refundTotalAmountWithVat
            ? setRefundAmount(e)
            : setRefundAmount('');
        }}
        error={
          error &&
          'Refund amount cannot exceed ' +
            i18n.formatCurrency(refundTotalAmountWithVat) +
            ' (including ' +
            taxTitle +
            ')'
        }
        autoComplete="off"
        min={0}
      />
    );
  }

  return (
    <div>
      <Modal
        activator={activator}
        open={active}
        onClose={handleClose}
        title="Fulfill Claim"
        primaryAction={{
          content: 'Submit',
          onAction: handleSubmit,
          loading,
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: handleClose,
          },
        ]}
      >
        <Modal.Section>
          <Select
            label="Select Claim Type"
            options={options}
            value={claimType}
            onChange={(e) => setClaimType(e as IClaimType)}
          ></Select>
          <br />
          {lineItemRender}
        </Modal.Section>
      </Modal>
    </div>
  );
};

export default ClaimFulfillModal;
