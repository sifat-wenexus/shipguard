import { Box, Icon, Popover, TextField } from '@shopify/polaris';
import { CaretDownIcon, SearchIcon, XIcon } from '@shopify/polaris-icons';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Radio from '~/components/radio';
import { useBetterFetcher } from '~/hooks/use-better-fetcher';
import { queryProxy } from '~/modules/query/query-proxy';

export interface IFilterOptions {
  label: string;
  selected: boolean;
  value: string;
}

const OrderSearchAndFilter = ({
  filterOption,
}: {
  filterOption: {
    inputText: string;
    setInputText: Function;
    filterItems: IFilterOptions[];
    setFilterItems: Function;
  };
}) => {
  const { inputText, setInputText, filterItems, setFilterItems } = filterOption;
  const fulfillmentsStatusLabels: IFilterOptions[] = useMemo(
    () => [
      { label: 'Unfulfilled', value: 'UNFULFILLED', selected: false },
      { label: 'Fulfilled', value: 'FULFILLED', selected: false },
      {
        label: 'Partially Fulfilled',
        value: 'PARTIALLY_FULFILLED',
        selected: false,
      },
    ],
    []
  );

  const claimStatusLabels: IFilterOptions[] = useMemo(
    () => [
      { label: 'Requested', value: 'REQUESTED', selected: false },
      {
        label: 'Partially Approved',
        value: 'PARTIALLYAPPROVE',
        selected: false,
      },
      { label: 'Approved', value: 'APPROVE', selected: false },
      { label: 'Cancel', value: 'CANCEL', selected: false },
    ],
    []
  );
  const [fulfillmentStatus, setFulfillmentStatus] = useState<IFilterOptions[]>(
    fulfillmentsStatusLabels
  );
  const [claimStatus, setClaimStatus] =
    useState<IFilterOptions[]>(claimStatusLabels);

  const [popoverFulfillmentActive, setPopoverFulfillmentActive] =
    useState(false);
  const [popoverClaimActive, setPopoverClaimActive] = useState(false);

  const togglePopoverFulfillmentActive = useCallback(
    () => setPopoverFulfillmentActive((popoverActive) => !popoverActive),
    []
  );
  const togglePopoverClaimActive = useCallback(
    () => setPopoverClaimActive((popoverActive) => !popoverActive),
    []
  );
  const activatorFulfillment = (
    <div
      className="border border-gray-600 p-3 rounded-tl-md rounded-bl-md font-medium hover:bg-gray-100 "
      onClick={togglePopoverFulfillmentActive}
    >
      <p className="flex">
        {' '}
        Fulfillment Status <Icon source={CaretDownIcon} />
      </p>
    </div>
  );
  const activatorClaim = (
    <div
      className="border border-gray-600 p-3 rounded-tr-md rounded-br-md font-medium hover:bg-gray-100 "
      onClick={togglePopoverClaimActive}
    >
      <p className="flex">
        {' '}
        Claim Status <Icon source={CaretDownIcon} />
      </p>
    </div>
  );

  const handleFulfillmentSelect = (index: number) => {
    setFulfillmentStatus((prev) =>
      prev.map((e, i) => {
        if (i === index) {
          return { ...e, selected: true };
        }
        return { ...e, selected: false };
      })
    );
  };
  const handleClaimSelect = (index: number) => {
    setClaimStatus((prev) =>
      prev.map((e, i) => {
        if (i === index) {
          return { ...e, selected: true };
        }
        return { ...e, selected: false };
      })
    );
  };
  useEffect(() => {
    setFilterItems(
      fulfillmentStatus
        .filter((element) => element.selected)
        .concat(claimStatus.filter((element) => element.selected))
    );
  }, [fulfillmentStatus, claimStatus]);
  // console.log(filterItems);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-9">
        <div className="col-span-1 md:col-span-6">
          <Box padding={'200'}>
            <TextField
              onChange={(text) => setInputText(text)}
              label=""
              placeholder={'Search Items'}
              value={inputText}
              autoComplete="yes"
              prefix={<Icon source={SearchIcon} />}
            />
          </Box>
        </div>
        <div className="col-span-1 md:col-span-3 ">
          <Box padding={'200'}>
            <div className="flex mt-[2px]">
              <Popover
                active={popoverFulfillmentActive}
                activator={activatorFulfillment}
                // autofocusTarget="first-node"
                onClose={togglePopoverFulfillmentActive}
                preferredAlignment={'center'}
                fullHeight
              >
                <div className="w-full p-3">
                  {fulfillmentStatus.map((item, index) => (
                    <Radio
                      onChange={() => handleFulfillmentSelect(index)}
                      checked={item.selected}
                      label={item.label}
                      id={index + 'fulfillments'}
                    />
                  ))}

                  <span
                    onClick={() => {
                      setFulfillmentStatus(
                        fulfillmentsStatusLabels.map((item) => ({
                          ...item,
                          selected: false,
                        }))
                      );
                    }}
                    className="text-base text-blue-500 hover:to-blue-700 hover:underline cursor-pointer"
                  >
                    clear
                  </span>
                </div>
              </Popover>
              <Popover
                active={popoverClaimActive}
                activator={activatorClaim}
                autofocusTarget="first-node"
                onClose={togglePopoverClaimActive}
                preferredAlignment={'center'}
              >
                <div className="w-full p-3">
                  {claimStatus.map((item, index) => (
                    <Radio
                      onChange={() => handleClaimSelect(index)}
                      checked={item.selected}
                      label={item.label}
                      id={index + 'claim'}
                    />
                  ))}

                  <span
                    onClick={() => {
                      setClaimStatus(
                        claimStatusLabels.map((item) => ({
                          ...item,
                          selected: false,
                        }))
                      );
                    }}
                    className="text-base text-blue-500 hover:to-blue-700 hover:underline cursor-pointer"
                  >
                    clear
                  </span>
                </div>
              </Popover>
            </div>
          </Box>
        </div>
      </div>
      {filterItems.length > 0 && (
        <div className="flex p-2">
          {filterItems.map((item, index) => (
            <div
              key={index}
              className="border border-gray-300 p-2 py-1 mx-2 flex rounded"
            >
              {item.label}
              <span
                onClick={() => {
                  setFulfillmentStatus((prev) =>
                    prev.map((e) =>
                      e.label === item.label ? { ...e, selected: false } : e
                    )
                  );
                  setClaimStatus((prev) =>
                    prev.map((e) =>
                      e.label === item.label ? { ...e, selected: false } : e
                    )
                  );
                }}
                className="ms-2 cursor-pointer hover:bg-gray-300 hover:rounded-md"
              >
                {' '}
                <Icon source={XIcon} />
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default OrderSearchAndFilter;
