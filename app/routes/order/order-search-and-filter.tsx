import { FilterIcon, SearchIcon, XIcon } from '@shopify/polaris-icons';
import { Box, Icon, Popover, TextField } from '@shopify/polaris';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Radio from '~/components/radio';

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

  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );
  const activator = (
    <div
      className="border border-gray-600 p-3 rounded-md font-medium hover:bg-gray-100 "
      onClick={togglePopoverActive}
    >
      <p className="flex justify-center">
        {' '}
        <span className="hidden md:block">
          <Icon source={FilterIcon} />
        </span>
        <span className="hidden md:block">Filter</span>{' '}
        <span className="md:hidden">
          {' '}
          <Icon source={FilterIcon} />
        </span>
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

  return (
    <>
      <div className="flex items-center w-full">
        <Box padding={'200'} width="100%">
          <TextField
            onChange={(text) => setInputText(text)}
            label=""
            placeholder={'Search Items'}
            value={inputText}
            autoComplete="yes"
            prefix={<Icon source={SearchIcon} />}
          />
        </Box>
        <Box padding={'200'}>
          <div className="flex mt-[2px]">
            <Popover
              active={popoverActive}
              activator={activator}
              // autofocusTarget="first-node"
              onClose={togglePopoverActive}
              preferredAlignment={'center'}
              fullHeight
            >
              <div className="w-full p-3">
                <h1 className="font-bold text-base">Fulfillment Status</h1>
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
              <div className="w-full p-3">
                <h1 className="font-bold text-base">Claim Status</h1>
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
            {/* <Popover
                active={popoverClaimActive}
                activator={activator}
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
              </Popover> */}
          </div>
        </Box>
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
