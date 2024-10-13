import type { GraphqlClient } from '~/shopify-api/lib/clients/graphql/graphql_client';
import packageYellow from '~/assets/icons/svg/Package_Protection yellow.svg';
import packageGreen from '~/assets/icons/svg/Package_Protection-green.svg';
import packageBlack from '~/assets/icons/svg/Package_Protection-black.svg';
import appLogo from '~/assets/images/inhouse-shipping-protection.png';
import packageFour from '~/assets/icons/svg/Package_Protection.svg';
import { getShopifyGQLClient } from '~/modules/shopify.server';
import { onDBEvtBuffered } from '~/modules/emitter.server';
import { queryProxy } from '~/modules/query/query-proxy';
import { getConfig } from '~/modules/get-config.server';
import { prisma } from '~/modules/prisma.server';
import { sleep } from '~/modules/utils/sleep';
import type { Product } from '#prisma-client';
import _ from 'lodash';

interface IShopifyBulkProductVariantCreateArgs {
  defaultPrice: number;
  productId: string;
  gql: GraphqlClient;
}

interface IProductVariant {
  price: number;
  options: string;
  sku: string;
  requiresShipping: boolean;
  inventoryItem: { tracked: boolean };
  taxable: boolean;
}

interface IShopifyBulkVariantUpdate {
  sku: string;
  options: string;
  requiresShipping: boolean;
  id: string;
  price: number;
  taxable: boolean;
}

interface IShopifyProductCreateAndUpdateArgs {
  productId?: string;
  status: 'ACTIVE' | 'DRAFT';
  tags?: string[];
  gql: GraphqlClient;
  vendor?: string;
}

export const PRODUCT_SKU: string = 'wenexus-shipping-protection';

const productImage = getConfig().appUrl + appLogo;

const icons: {
  id: string;
  icon: string;
}[] = [
  { id: 'one', icon: `${getConfig().appUrl}${packageGreen}` },
  { id: 'two', icon: `${getConfig().appUrl}${packageYellow}` },
  { id: 'three', icon: `${getConfig().appUrl}${packageBlack}` },
  { id: 'four', icon: `${getConfig().appUrl}${packageFour}` },
];

onDBEvtBuffered(
  'packageProtection',
  ['create', 'update', 'delete'],
  5000,
  async (payloads) => {
    for (const storeId in payloads) {
      const payload = _.last(payloads[storeId]);

      const data = payload?.newData ?? payload?.oldData;
      const session = payload?.session;

      console.log(`Package Protection Listener: Processing store ${storeId}`);

      if (!data || !session) {
        console.log('No data or session');
        continue;
      }

      const packageProtectionProductAndVariants =
        await prisma.excludedPackageProtectionProduct.findMany({
          where: { storeId: storeId },
          include: { excludedPackageProtectionVariants: true },
        });
      const icon = icons.find((i) => i.id === data.icon)?.icon ?? packageGreen;

      const gql = getShopifyGQLClient(session);

      let metafields: Record<string, any> = [];

      if (packageProtectionProductAndVariants.length > 0) {
        metafields.push({
          key: 'packageProtectionProductAndVariants',
          namespace: 'package_protection',
          type: 'json',
          value: JSON.stringify(packageProtectionProductAndVariants),
        });
      } else {
        metafields.push({
          key: 'packageProtectionProductAndVariants',
          namespace: 'package_protection',
          type: 'json',
          value: JSON.stringify(packageProtectionProductAndVariants),
        });
      }

      if (data.enabled !== undefined) {
        metafields.push({
          key: 'enabled',
          namespace: 'package_protection',
          type: 'boolean',
          value: data.enabled.toString(),
        });
      }
      if (data.insurancePriceType !== undefined) {
        metafields.push({
          key: 'insurancePriceType',
          namespace: 'package_protection',
          type: 'single_line_text_field',
          value: data.insurancePriceType,
        });
      }
      if (data.price !== undefined) {
        metafields.push({
          key: 'price',
          namespace: 'package_protection',
          type: 'number_decimal',
          value: data.price.toString(),
        });
      }
      if (data.percentage !== undefined) {
        metafields.push({
          key: 'percentage',
          namespace: 'package_protection',
          type: 'number_decimal',
          value: data.percentage.toString(),
        });
      }

      if (data.icon !== undefined) {
        metafields.push({
          key: 'icon',
          namespace: 'package_protection',
          type: 'single_line_text_field',
          value: data.icon,
        });
      }
      if (data.switchColor) {
        metafields.push({
          key: 'switchColor',
          namespace: 'package_protection',
          type: 'single_line_text_field',
          value: data.switchColor,
        });
      }
      if (data.title) {
        metafields.push({
          key: 'title',
          namespace: 'package_protection',
          type: 'single_line_text_field',
          value: data.title,
        });
      }

      if (data.enabledDescription) {
        metafields.push({
          key: 'enabledDescription',
          namespace: 'package_protection',
          type: 'single_line_text_field',
          value: data.enabledDescription,
        });
      }

      if (data.disabledDescription) {
        metafields.push({
          key: 'disabledDescription',
          namespace: 'package_protection',
          type: 'single_line_text_field',
          value: data.disabledDescription,
        });
      }
      if (data.policyUrl) {
        metafields.push({
          key: 'policyUrl',
          namespace: 'package_protection',
          type: 'single_line_text_field',
          value: data.policyUrl,
        });
      }
      if (data.insuranceDisplayButton !== undefined) {
        metafields.push({
          key: 'insuranceDisplayButton',
          namespace: 'package_protection',
          type: 'boolean',
          value: data.insuranceDisplayButton.toString(),
        });
      }
      if (data.insuranceFulfillmentStatus) {
        metafields.push({
          key: 'insuranceFulfillmentStatus',
          namespace: 'package_protection',
          type: 'single_line_text_field',
          value: data.insuranceFulfillmentStatus,
        });
      }
      if (data.css) {
        metafields.push({
          key: 'css',
          namespace: 'package_protection',
          type: 'json',
          value: JSON.stringify(data.css) || 'null',
        });
      }
      if (data.cssSelector) {
        metafields.push({
          key: 'cssSelector',
          namespace: 'package_protection',
          type: 'single_line_text_field',
          value: data.cssSelector === '' ? 'null' : data.cssSelector,
        });
      }
      if (data.position !== undefined) {
        metafields.push({
          key: 'position',
          namespace: 'package_protection',
          type: 'single_line_text_field',
          value: data.position,
        });
      }
      if (data.showOnCartPage !== undefined) {
        metafields.push({
          key: 'showOnCartPage',
          namespace: 'package_protection',
          type: 'boolean',
          value: data.showOnCartPage.toString(),
        });
      }
      if (data.showOnMiniCart !== undefined) {
        metafields.push({
          key: 'showOnMiniCart',
          namespace: 'package_protection',
          type: 'boolean',
          value: data.showOnMiniCart.toString(),
        });
      }
      if (icon) {
        metafields.push({
          key: 'iconUrl',
          namespace: 'package_protection',
          type: 'single_line_text_field',
          value: icon.toString(),
        });
      }
      if (data.defaultSetting !== undefined) {
        metafields.push({
          key: 'defaultSetting',
          namespace: 'package_protection',
          type: 'boolean',
          value: data.defaultSetting.toString(),
        });
      }

      const store = await queryProxy.store.findFirst(
        {
          select: {
            appInstallationId: true,
            name: true,
          },
        },
        session
      );

      if (!store) {
        throw new Error('Store not found');
      }

      try {
        // trying two product create one for fixed another for penchant
        const existingProduct = await queryProxy.packageProtection.findUnique({
          where: { storeId: data.storeId },
          select: {
            percentageProductId: true,
            fixedProductId: true,
          },
        });
        const productResponse = await gql.query<any>({
          data: {
            query: `#graphql
           query {
            products(query:"sku:${PRODUCT_SKU}") {
                edges {
                  node {
                    id
                    title
                    tags
                  }
                }
              }
           }
            `,
          },
        });
        const existingShopifyProduct: {
          node: {
            id: string;
            title: string;
            tags: string[];
          };
        }[] = await productResponse.body.data.products.edges;

        if (
          (existingProduct?.fixedProductId &&
            existingProduct?.percentageProductId) ||
          existingShopifyProduct.length > 0
        ) {
          let fixedProductId = existingProduct?.fixedProductId;
          let percentageProductId = existingProduct?.percentageProductId;

          if (existingShopifyProduct.length > 0) {
            existingShopifyProduct.forEach((product) => {
              if (product.node.tags.includes('insurancetype-percentage')) {
                percentageProductId = product.node.id;
              }
              if (product.node.tags.includes('insurancetype-fixed')) {
                fixedProductId = product.node.id;
              }
            });
            await queryProxy.packageProtection.update({
              where: { storeId: data.storeId },
              data: {
                percentageProductId,
                fixedProductId,
              },
            });
          }

          if (data.insurancePriceType === 'FIXED_PRICE') {
            if (data.enabled) {
              await shopifyProductUpdate({
                productId: fixedProductId!,
                tags: ['insurancetype-fixed', 'wenexus-insurance'],
                vendor: store.name,
                status: 'ACTIVE',
                gql,
              });
              await shopifyProductUpdate({
                productId: percentageProductId!,
                tags: ['insurancetype-percentage', 'wenexus-insurance'],
                vendor: store.name,
                status: 'DRAFT',
                gql,
              });
            } else {
              await shopifyProductUpdate({
                productId: fixedProductId!,
                tags: ['insurancetype-fixed', 'wenexus-insurance'],
                vendor: store.name,
                status: 'DRAFT',
                gql,
              });
            }

            // product update done for fixed price - now updating product variants
            const variantExists = await queryProxy.productVariant.findFirst({
              where: { productId: fixedProductId },
            });

            if (variantExists) {
              const singleVariant = await shopifyBulkVariantUpdate(
                fixedProductId!,
                [
                  {
                    sku: PRODUCT_SKU,
                    options: data.price.toString(),
                    requiresShipping: false,
                    id: variantExists?.id,
                    price: data.price,
                    taxable: false,
                  },
                ],
                gql
              );
              await metafields.push({
                key: 'productVariants',
                namespace: 'package_protection',
                type: 'json',
                value: JSON.stringify(
                  singleVariant.productVariants.map((v) => ({
                    id: v.id.replace('gid://shopify/ProductVariant/', ''),
                    price: v.price,
                  }))
                ),
              });
            }

            await queryProxy.productVariant.update({
              data: {
                price: data.price,
                title: data.price.toString(),
              },

              where: { id: variantExists?.id },
            });
          }
          if (data.insurancePriceType === 'PERCENTAGE') {
            if (data.enabled) {
              await shopifyProductUpdate({
                productId: percentageProductId!,
                status: 'ACTIVE',
                tags: ['insurancetype-percentage', 'wenexus-insurance'],
                vendor: store.name,
                gql: gql,
              });

              await shopifyProductUpdate({
                productId: fixedProductId!,
                tags: ['insurancetype-fixed', 'wenexus-insurance'],
                vendor: store.name,
                status: 'DRAFT',
                gql,
              });
            } else {
              await shopifyProductUpdate({
                productId: percentageProductId!,
                tags: ['insurancetype-percentage', 'wenexus-insurance'],
                vendor: store.name,
                status: 'DRAFT',
                gql: gql,
              });
            }

            const prevVariants = await queryProxy.productVariant.findMany({
              pageSize: 100,
              where: {
                productId: { equals: percentageProductId },
              },
            });
            const productVariantsUpdate: IShopifyBulkVariantUpdate[] = [];

            await prevVariants.firstPage().then(async (variants) => {
              let price = data.defaultPercentage;
              for (let i = 0; i < variants.length; i++) {
                productVariantsUpdate.push({
                  sku: PRODUCT_SKU,
                  options: price.toString(),
                  requiresShipping: false,
                  id: variants[i].id,
                  taxable: false,
                  price: price,
                });

                price += 0.5;
              }
            });

            //bulk update
            const result = await shopifyBulkVariantUpdate(
              percentageProductId!,
              productVariantsUpdate,
              gql
            );
            await metafields.push({
              key: 'productVariants',
              namespace: 'package_protection',
              type: 'json',
              value: JSON.stringify(
                result.productVariants.map((v) => ({
                  id: v.id.replace('gid://shopify/ProductVariant/', ''),
                  price: v.price,
                }))
              ),
            });
          }
        } else {
          if (data.insurancePriceType === 'FIXED_PRICE') {
            let productId = '';
            if (data.enabled) {
              const createFixedProduct = await shopifyCreateProduct({
                status: 'ACTIVE',
                tags: ['insurancetype-fixed', 'wenexus-insurance'],
                gql,
                vendor: store.name,
              });

              productId = createFixedProduct.productCreate.product.id;
            } else {
              const createFixedProduct = await shopifyCreateProduct({
                status: 'DRAFT',
                tags: ['insurancetype-fixed', 'wenexus-insurance'],
                gql,
                vendor: store.name,
              });
              productId = createFixedProduct.productCreate.product.id;
            }
            const createPercentProduct = await shopifyCreateProduct({
              status: 'DRAFT',
              tags: ['insurancetype-percentage', 'wenexus-insurance'],
              gql,
              vendor: store.name,
            });
            const productGqlDraftId =
              createPercentProduct.productCreate.product.id;
            if (productId) {
              try {
                const fixedProduct: Partial<Product> = {
                  title: 'Package Protection',
                  productType: 'Warranty',
                  tags: ['insurancetype-fixed', 'wenexus-insurance'],
                  handle: 'package-protection-fixed',
                  vendor: store.name,
                  status: 'PUBLISHED',
                  storeId: data.storeId,
                  id: productId,
                };
                const percentageProduct: Partial<Product> = {
                  title: 'Package Protection',
                  productType: 'Warranty',
                  handle: 'package-protection-percentage',
                  tags: ['insurancetype-percentage', 'wenexus-insurance'],
                  vendor: store.name,
                  status: 'DRAFT',
                  storeId: data.storeId,
                  id: productGqlDraftId,
                };
                await queryProxy.product.upsert({
                  create: fixedProduct,
                  update: fixedProduct,
                  where: { id: productId },
                });
                await queryProxy.product.upsert(
                  {
                    create: percentageProduct,
                    update: percentageProduct,
                    where: { id: productGqlDraftId },
                  }
                );

                await queryProxy.packageProtection.update({
                  where: { storeId: data.storeId },
                  data: {
                    percentageProductId: productGqlDraftId,
                    fixedProductId: productId,
                  },
                });
              } catch (err) {
                console.error(err);
              }
              await shopifyBulkProductVariantCreate({
                defaultPrice: 0.25,
                productId: productGqlDraftId,
                gql,
              });

              // product creation done for fixed price - now creating product variants
              await sleep(1500);
              const variantExists = await queryProxy.productVariant.findFirst({
                where: { productId: productId },
              });

              const singleVariant = await shopifyBulkVariantUpdate(
                productId,
                [
                  {
                    sku: PRODUCT_SKU,
                    options: data.price.toString(),
                    requiresShipping: false,
                    id: variantExists?.id as string,
                    price: data.price,
                    taxable: false,
                  },
                ],
                gql
              );
              await metafields.push({
                key: 'productVariants',
                namespace: 'package_protection',
                type: 'json',
                value: JSON.stringify(
                  singleVariant.productVariants.map((v) => ({
                    id: v.id.replace('gid://shopify/ProductVariant/', ''),
                    price: v.price,
                  }))
                ),
              });

              await queryProxy.productVariant.update({
                data: {
                  price: data.price,
                  title: data.price.toString(),
                },

                where: { id: variantExists?.id },
              });
            }
          }
          if (data.insurancePriceType === 'PERCENTAGE') {
            let productId = '';
            if (data.enabled) {
              const createPercentProduct = await shopifyCreateProduct({
                status: 'ACTIVE',
                tags: ['insurancetype-percentage', 'wenexus-insurance'],
                gql,
                vendor: store.name,
              });

              productId = await createPercentProduct.productCreate.product?.id;
            } else {
              const createPercentProduct = await shopifyCreateProduct({
                status: 'DRAFT',
                tags: ['insurancetype-percentage', 'wenexus-insurance'],
                gql,
                vendor: store.name,
              });
              productId = await createPercentProduct.productCreate.product.id;
            }
            const createFixedProduct = await shopifyCreateProduct({
              status: 'DRAFT',
              tags: ['insurancetype-fixed', 'wenexus-insurance'],
              vendor: store.name,
              gql,
            });
            const productGqlDraftId = await createFixedProduct.productCreate
              .product.id;
            if (productId) {
              try {
                const fixedProduct: Partial<Product> = {
                  title: 'Package Protection',
                  productType: 'Warranty',
                  handle: 'package-protection-fixed',
                  tags: ['insurancetype-fixed', 'wenexus-insurance'],
                  vendor: store.name,
                  status: 'PUBLISHED',
                  storeId: data.storeId,
                  id: productGqlDraftId,
                };
                const percentageProduct: Partial<Product> = {
                  title: 'Package Protection',
                  productType: 'Warranty',
                  handle: 'package-protection-percentage',
                  tags: ['insurancetype-percentage', 'wenexus-insurance'],
                  vendor: store.name,
                  status: 'DRAFT',
                  storeId: data.storeId,
                  id: productId,
                };
                await queryProxy.product.upsert({
                  create: fixedProduct,
                  update: fixedProduct,
                  where: { id: productGqlDraftId },
                });
                await queryProxy.product.upsert(
                  {
                    create: percentageProduct,
                    update: percentageProduct,
                    where: { id: productId },
                  }
                );
                await queryProxy.packageProtection.update({
                  where: { storeId: data.storeId },
                  data: {
                    percentageProductId: productId,
                    fixedProductId: productGqlDraftId,
                  },
                });
              } catch (error) {
                console.error(error);
              }
            }
            // product creation done for percentage -> now creating product variants
            const res = await shopifyBulkProductVariantCreate({
              defaultPrice: data.defaultPercentage,
              productId,
              gql,
            });

            await metafields.push({
              key: 'productVariants',
              namespace: 'package_protection',
              type: 'json',
              value: JSON.stringify(
                res.map((e) => ({
                  id: e.id.replace('gid://shopify/ProductVariant/', ''),
                  price: e.price,
                }))
              ),
            });
          }
        }
      } catch (error) {
        console.error(error);
      }

      metafields = metafields.map((metafield) => ({
        ...metafield,
        ownerId: store.appInstallationId,
      }));

      // add metafields
      try {
        const res = await gql.query<any>({
          data: {
            query: `#graphql
            mutation ($metafields: [MetafieldsSetInput!]!) {
              metafieldsSet(metafields: $metafields) {
                metafields {
                  id
                }
                userErrors {
                  field
                  message
                }
              }
            }
            `,
            variables: {
              metafields,
            },
          },
        });
        if (res.body.data?.metafieldsSet?.userErrors?.length > 0) {
          console.log(
            'kono error nai',
            JSON.stringify(res.body.data.metafieldsSet)
          );
          throw new Error(
            `Error setting metafields: ${JSON.stringify(
              res.body.data.userErrors
            )}`
          );
        }
      } catch (err) {
        console.log('error-meta-filed', err);
      }
    }
  }
);

async function shopifyBulkProductVariantCreate({
  defaultPrice,
  productId,
  gql,
}: IShopifyBulkProductVariantCreateArgs): Promise<any> {
  const productVariants: IProductVariant[] = [];
  let price = defaultPrice;
  for (let i = 1; i <= 100; i++) {
    productVariants.push({
      price: price,
      options: price.toString(),
      sku: PRODUCT_SKU,
      requiresShipping: false,
      inventoryItem: { tracked: false },
      taxable: false,
    });
    price += 0.5;
  }
  // bulk
  const variantCreate = await gql.query<any>({
    data: {
      query: `#graphql
      mutation productVariantsBulkCreate($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
        productVariantsBulkCreate(productId: $productId, variants: $variants) {
          productVariants{
            id
            price
            sku
          }
          userErrors {
            field
            message
          }
        }
      }`,
      variables: {
        productId: productId,
        variants: productVariants,
      },
    },
  });

  const productVariantsCreatedList =
    await variantCreate.body.data.productVariantsBulkCreate.productVariants.map(
      (variant) => {
        return {
          ...variant,
          productId,
          title: variant.price.toString(),
        };
      }
    );

  await queryProxy.productVariant.createMany({
    data: productVariantsCreatedList,
  });
  return productVariantsCreatedList;
}

async function shopifyBulkVariantUpdate(
  productId: string,
  variants: IShopifyBulkVariantUpdate[],
  gql: GraphqlClient
) {
  const res = await gql.query<any>({
    data: {
      query: `#graphql
      mutation productVariantsBulkUpdate($productId: ID!,$variants: [ProductVariantsBulkInput!]!) {
        productVariantsBulkUpdate(productId: $productId, variants: $variants) {
          product {
            id
          },
          productVariants{
            price
            id
          }
          userErrors {
            field
            message
          }
        }
      }`,
      variables: {
        productId: productId,
        variants: variants,
      },
    },
  });
  return res.body.data.productVariantsBulkUpdate;
}

export async function shopifyProductUpdate({
  productId,
  status,
  gql,
  vendor,
  tags,
}: IShopifyProductCreateAndUpdateArgs): Promise<void> {
  await gql.query<any>({
    data: {
      query: `#graphql
      mutation  productUpdate($input:ProductInput!,$media:[CreateMediaInput!]) {
        productUpdate(input:$input,media:$media){
          product {
            id
          }
        }
      }
      `,
      variables: {
        input: {
          id: productId,
          status: status,
          vendor,
          tags,
        },
        media: [
          {
            alt: 'package-protection',
            mediaContentType: 'IMAGE',
            originalSource: `${productImage}`,
          },
        ],
      },
    },
  });
}

async function shopifyCreateProduct({
  tags,
  status,
  gql,
  vendor,
}: IShopifyProductCreateAndUpdateArgs): Promise<any> {
  console.log('----------product creating-----------');
  const res = await gql.query<any>({
    data: {
      query: `#graphql
      mutation productCreate($input:ProductInput!,$media:[CreateMediaInput!]) {
        productCreate(input:$input,media:$media){
          product {
            id
          }
          userErrors{
            field
            message
          }
        }
      }
      `,
      variables: {
        input: {
          title: 'Package Protection',
          productType: 'Warranty',
          vendor: vendor,
          status: status,
          tags: tags,
          metafields: [
            {
              namespace: 'seo',
              key: 'hidden',
              value: '1',
              type: 'integer',
            },
            {
              namespace: 'package_protection',
              key: 'wenexus_shipping_protection',
              value: 'true',
              type: 'boolean',
            },
          ],
        },
        media: [
          {
            alt: 'package-protection',
            mediaContentType: 'IMAGE',
            originalSource: `${productImage}`,
          },
        ],
      },
    },
  });
  await productPublish(res.body.data.productCreate.product.id, gql);
  return await res.body.data;
}

const productPublish = async (productId: string, gql: GraphqlClient) => {
  const getPublications = await gql.query<any>({
    data: {
      query: `#graphql
      query publications {
        publications(first: 5) {
          edges {
            node {
              id
            }
          }
        }
      }`,
    },
  });
  const publicationsIds = getPublications.body.data.publications.edges.map(
    (e) => e.node.id
  );
  // published
  await gql.query<any>({
    data: {
      query: `#graphql
      mutation publishablePublish($id: ID!, $input: [PublicationInput!]!) {
        publishablePublish(id: $id, input: $input) {
          publishable {
            availablePublicationCount
          }
          shop {
            publicationCount
          }
          userErrors {
            field
            message
          }
        }
      }   `,
      variables: {
        id: productId,
        input: {
          publicationId: publicationsIds[0],
        },
      },
    },
  });
};
