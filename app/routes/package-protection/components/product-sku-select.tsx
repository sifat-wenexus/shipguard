import {
  BlockStack,
  Box,
  Button,
  Card,
  Icon,
  InlineGrid,
  ResourceList,
  SkeletonBodyText,
  Text,
  TextField,
  Thumbnail,
} from '@shopify/polaris';
import {
  DeleteIcon,
  ProductListIcon,
  SearchIcon,
} from '@shopify/polaris-icons';
import { useEffect, useMemo, useState } from 'react';
import { ProductLoader } from '~/components/product-loader';
import { ProductSelect } from '~/components/product-select';
import { ProductVariantLoader } from '~/components/product-variant-loader';
import { ProductVariantSelect } from '~/components/product-variant-select';
import useDebounce from '~/hooks/use-debouncer';

const ProductSKUSelect = ({ formState }) => {
  const [selectedProduct, setSelectedProduct] = useState<string[]>([]);

  const [text, setText] = useState('');
  const pageSize = useMemo(() => ({ pageSize: 100000 }), []);
  const searchText = useDebounce(text, 300);

  const selectedProducts: string[] = [];
  const selectedProductVariants: string[] = [];
  selectedProduct.forEach((item) => {
    if (item.includes('ProductVariant')) {
      selectedProductVariants.push(item);
    }
    if (item.includes('Product') && !item.includes('ProductVariant')) {
      selectedProducts.push(item);
    }
  });

  // this effect for show modal on search something
  useEffect(() => {
    const button = document.getElementById('wenexus-product-select-modal-open');
    if (button && searchText !== '') {
      button.click();
    }
  }, [searchText]);
  return (
    <>
      <Box paddingBlockStart="100" paddingBlockEnd="100">
        <div className="grid grid-cols-7 gap-2">
          <div className="col-span-5 ">
            <TextField
              onChange={(text) => setText(text)}
              label=""
              placeholder={'Search Product or Variant.'}
              value={text}
              autoComplete="yes"
              prefix={<Icon source={SearchIcon} />}
            />
          </div>
          <div className="col-span-2">
            <ProductSelect
              className="include-exclude-button"
              onChange={(s) => {
                setSelectedProduct(
                  Array.isArray(s.selected) ? s.selected : [s.selected]
                );
              }}
              value={[]}
              multiple
              verb="Add"
              searchValue={searchText}
              selectedItem={selectedProduct}
              hideFilters={['vendor', 'tags', 'productType']}
              // showProduct
              // where={{ Product: { Variants: {} } }}
            >
              <button
                className="border h-[50px] w-full rounded-md font-semibold text-sm hover:bg-gray-200 hover:border-gray-400"
                id="wenexus-product-select-modal-open"
              >
                Browse
              </button>
            </ProductSelect>
          </div>
        </div>
      </Box>

      <Box paddingBlockStart="025" paddingBlockEnd="100">
        {selectedProducts.length > 0 ? (
          <ProductLoader
            ids={selectedProducts}
            args={pageSize}
            renderItems={(data, loading) => {
              if (loading || !data) {
                return <SkeletonBodyText lines={selectedProduct.length} />;
              }

              return data.map((item) => (
                <div className="my-2 " key={`product-${item.id}`}>
                  <Card roundedAbove="sm">
                    <BlockStack gap="100">
                      <ResourceList.Item
                        verticalAlignment="center"
                        // onClick={onItemClick}
                        onClick={(event) => console.log(event)}
                        name={item.title}
                        id={item.id}
                        media={
                          <Thumbnail
                            source={
                              item.featuredImage
                                ? item.featuredImage
                                : ProductListIcon
                            }
                            alt={item.title}
                            size="small"
                          />
                        }
                      >
                        {item.title}
                      </ResourceList.Item>
                      <InlineGrid columns="1fr auto">
                        <Text as="span" variant="headingSm" fontWeight="medium">
                          Product: {item.title}
                          {/* {selectedProductVariants.map((variant, index) => (
                            <Text as="span" key={`product-${item.id}`}>
                              {index === 0 ? item.title : '/' + item.title}
                            </Text>
                          ))} */}
                          {selectedProductVariants.length > 0 ? (
                            <ProductVariantLoader
                              ids={selectedProductVariants}
                              args={pageSize}
                              renderItems={(data, loading) => {
                                if (loading || !data) {
                                  return (
                                    <SkeletonBodyText
                                      lines={selectedProduct.length / 3}
                                    />
                                  );
                                }

                                return data.map((variant, index) => {
                                  if (item.id === variant.productId) {
                                    return (
                                      <Text
                                        as="span"
                                        key={`variant-${variant.id}`}
                                      >
                                        {' '}
                                        -{' '}
                                        {index === 0
                                          ? variant.title
                                          : `/${variant.title}`}
                                      </Text>
                                    );
                                  } else {
                                    return null;
                                  }
                                });
                              }}
                            />
                          ) : null}
                        </Text>
                        <Button
                          icon={DeleteIcon}
                          variant="tertiary"
                          tone="critical"
                          onClick={() =>
                            setSelectedProduct((prev) =>
                              prev.filter((e) => e !== item.id)
                            )
                          }
                          accessibilityLabel="Delete"
                        />
                      </InlineGrid>
                    </BlockStack>
                  </Card>
                </div>
              ));
            }}
          />
        ) : null}
      </Box>
    </>
  );
};

export default ProductSKUSelect;
