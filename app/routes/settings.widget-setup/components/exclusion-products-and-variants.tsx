import { SearchIcon } from '@shopify/polaris-icons';
import useDebounce from '~/hooks/use-debounce';
import { useEffect, useState } from 'react';
import {
  ResourceListProps,
  ResourceItem,
  ResourceList,
  TextField,
  Icon,
  Text,
  Box,
  Thumbnail,
  Button,
  IndexTable,
  useIndexResourceState,
} from '@shopify/polaris';

const ExclusionProductsAndVariants = ({ formState }) => {
  const resourcesSelected = formState.state.excludeProductVariant;
  const {
    selectedResources,
    allResourcesSelected,
    handleSelectionChange,
    clearSelection,
  } = useIndexResourceState(resourcesSelected);
  const [selectedItems, setSelectedItems] = useState<
    ResourceListProps['selectedItems']
  >([]);
  const [resourcesSelection, setResourcesSelection] = useState<any>([]);
  const [inputText, setInputText] = useState('');
  const searchText = useDebounce(inputText, 500);

  // this effect for show modal on search something
  useEffect(() => {
    const button = document.getElementById(
      'wenexus-product-variants-select-modal-open'
    );
    if (button && searchText !== '') {
      button.click();
      setInputText('');
    }
  }, [searchText]);

  // handleRemove fn
  const handleRemove = () => {
    const notRemoveItem = resourcesSelected.filter(
      (item) => !selectedResources?.includes(item.id)
    );
    const resourceSelected = notRemoveItem.map((el) => {
      return { id: el.id, variants: el.variants.map((e) => ({ id: e.id })) };
    });
    setResourcesSelection(resourceSelected);
    formState.addChange({ excludeProductVariant: notRemoveItem });
    clearSelection();
    // setSelectedItems([]);
  };

  // handle click fn
  // const handleClick = (e) => {
  //   setSelectedItems((prev: any) =>
  //     prev?.includes(e)
  //       ? Array(prev).filter((item) => item !== e)
  //       : [...prev, e]
  //   );
  // };

  const clicked = async () => {
    const res = await shopify.resourcePicker({
      type: 'product',
      multiple: true,
      selectionIds: resourcesSelection,
    });
    if (res) {
      formState.addChange({ excludeProductVariant: res });
      setResourcesSelection(
        res?.map((el) => {
          return {
            id: el.id,
            variants: el.variants.map((e) => ({
              id: e.id,
            })),
          };
        })
      );
    }
  };

  useEffect(() => {
    const prevSelected = resourcesSelected?.map((el) => {
      return {
        id: el.id,
        variants: el.variants.map((e) => ({
          id: e.id,
        })),
      };
    });
    setResourcesSelection(prevSelected);
  }, [resourcesSelected]);

  // -----

  console.log(resourcesSelected, selectedItems, selectedResources);
  return (
    <>
      <Box paddingBlockStart="100" paddingBlockEnd="100">
        <div className="grid grid-cols-7 gap-2">
          <div className="col-span-5 ">
            <TextField
              onChange={(text) => setInputText(text)}
              label=""
              placeholder={'Search Product or Variant.'}
              value={inputText}
              autoComplete="yes"
              prefix={<Icon source={SearchIcon} />}
            />
          </div>
          <div className="col-span-2">
            <button
              className="border h-[50px] w-full rounded-md font-semibold text-sm hover:bg-gray-200 border-gray-400"
              onClick={clicked}
            >
              Browse
            </button>
          </div>
        </div>
      </Box>

      <Box paddingBlockStart="025" paddingBlockEnd="100">
        {resourcesSelected?.length > 0 && resourcesSelected ? (
          <>
            <IndexTable
              headings={[{ title: 'Product' }]}
              itemCount={resourcesSelected?.length}
              selectedItemsCount={
                allResourcesSelected ? 'All' : selectedResources.length
              }
              onSelectionChange={handleSelectionChange}
              promotedBulkActions={[
                {
                  content: 'Remove product',
                  onAction: handleRemove,
                },
              ]}
            >
              {resourcesSelected.map(
                (
                  { id, title, images, image, variants, totalVariants },
                  index
                ) => {
                  const imageUrl = !image
                    ? images[0]?.originalSrc
                    : JSON.parse(images)[0]?.originalSrc;

                  return (
                    <IndexTable.Row
                      id={id}
                      key={id}
                      selected={selectedResources.includes(id)}
                      position={index}
                    >
                      <IndexTable.Cell>
                        <div className="flex gap-2 items-center">
                          <Thumbnail
                            source={imageUrl}
                            alt="product"
                            size="small"
                          />
                          <div>
                            <Text variant="bodyMd" fontWeight="bold" as="h3">
                              {title}
                            </Text>
                            <div className="font-thin text-xs text-gray-600">
                              {variants.length === totalVariants
                                ? null
                                : variants.length === 1
                                ? variants.length + ' Variant Selected'
                                : variants.length + ' Variants Selected'}
                            </div>
                          </div>
                        </div>
                      </IndexTable.Cell>
                    </IndexTable.Row>
                  );
                }
              )}
            </IndexTable>

            {/* <ResourceList
              resourceName={{
                singular: 'Product',
                plural: 'Products',
              }}
              promotedBulkActions={[
                {
                  content: 'Remove product',
                  onAction: handleRemove,
                },
              ]}
              selectedItems={selectedItems}
              onSelectionChange={setSelectedItems}
              selectable
              showHeader
              items={resourcesSelected}
              renderItem={(item) => {
                const { id, title, images, image, variants, totalVariants } =
                  item;

                const imageUrl = !image
                  ? images[0]?.originalSrc
                  : JSON.parse(images)[0]?.originalSrc;

                const media = (
                  <Thumbnail
                    alt="product-image"
                    size="small"
                    source={imageUrl ?? undefined}
                  />
                );
                return (
                  <ResourceItem
                    id={id}
                    media={media}
                    accessibilityLabel={`View details for ${title}`}
                    onClick={(e): void => handleClick(e)}
                  >
                    <Text variant="bodyMd" fontWeight="bold" as="h3">
                      {title}
                    </Text>
                    <div className="font-thin text-xs text-gray-600">
                      {variants.length === totalVariants
                        ? null
                        : variants.length === 1
                        ? variants.length + ' Variant Selected'
                        : variants.length + ' Variants Selected'}
                    </div>
                  </ResourceItem>
                );
              }}
            /> */}
          </>
        ) : null}
      </Box>
    </>
  );
};

export default ExclusionProductsAndVariants;
