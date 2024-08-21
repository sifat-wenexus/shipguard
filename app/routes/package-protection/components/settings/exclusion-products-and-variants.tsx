import { SearchIcon } from '@shopify/polaris-icons';
import useDebounce from '~/hooks/use-debouncer';
import { useEffect, useState } from 'react';
import {
  ResourceListProps,
  ResourceItem,
  ResourceList,
  TextField,
  Avatar,
  Icon,
  Text,
  Box,
  Thumbnail,
} from '@shopify/polaris';

const ExclusionProductsAndVariants = ({ formState }) => {
  const [selectedItems, setSelectedItems] = useState<
    ResourceListProps['selectedItems']
  >([]);
  const [resourcesSelection, setResourcesSelection] = useState<any>([]);
  const [inputText, setInputText] = useState('');
  // const [resourcesSelected, setResourcesSelected] = useState<any[]>([]);
  const resourcesSelected = formState.state.excludeProductVariant;
  const searchText = useDebounce(inputText, 500);

  console.log('selected', resourcesSelected);

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
      (item) => !selectedItems?.includes(item.id)
    );
    const resourceSelected = notRemoveItem.map((el) => {
      return { id: el.id, variants: el.variants.map((e) => ({ id: e.id })) };
    });
    setResourcesSelection(resourceSelected);
    // setResourcesSelected(notRemoveItem);
    formState.addChange({ excludeProductVariant: notRemoveItem });
    setSelectedItems([]);
  };

  // handle click fn
  const handleClick = (e) => {
    setSelectedItems((prev) =>
      prev?.includes(e)
        ? Array(prev).filter((item) => item !== e)
        : [...prev, e]
    );
  };

  const clicked = async () => {
    const res = await shopify.resourcePicker({
      type: 'product',
      multiple: true,
      selectionIds: resourcesSelection,
    });
    // setResourcesSelected(res);
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

  console.log('resourcesSelection', resourcesSelection);

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
              // id="wenexus-product-variants-select-modal-open"
              onClick={clicked}
            >
              Browse
            </button>
          </div>
        </div>
      </Box>

      <Box paddingBlockStart="025" paddingBlockEnd="100">
        {resourcesSelected?.length > 0 && resourcesSelected ? (
          <ResourceList
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
            items={resourcesSelected}
            renderItem={(item) => {
              const { id, title, images, image, variants, totalVariants } =
                item;

              const imageUrl = !image
                ? images[0].originalSrc
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
            selectedItems={selectedItems}
            onSelectionChange={setSelectedItems}
            selectable
          />
        ) : null}
      </Box>
    </>
  );
};

export default ExclusionProductsAndVariants;
