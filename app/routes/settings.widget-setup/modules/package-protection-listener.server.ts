import type { GraphqlClient } from '~/shopify-api/lib/clients/graphql/graphql_client';
import packageYellow from '~/assets/icons/svg/Package_Protection yellow.svg';
import packageGreen from '~/assets/icons/svg/Package_Protection-green.svg';
import packageBlack from '~/assets/icons/svg/Package_Protection-black.svg';
import packageFour from '~/assets/icons/svg/Package_Protection.svg';
import { getShopifyGQLClient } from '~/modules/shopify.server';
import { onDBEvtBuffered } from '~/modules/emitter.server';
import { queryProxy } from '~/modules/query/query-proxy';
import { getConfig } from '~/modules/get-config.server';
import { prisma } from '~/modules/prisma.server';
import { sleep } from '~/modules/utils/sleep';
import productImage from '~/assets/images/Inhouse Shipping Protection.png';
import _ from 'lodash';

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

        console.log('existing product', existingProduct);

        if (
          existingProduct?.fixedProductId &&
          existingProduct?.percentageProductId
        ) {
          if (data.insurancePriceType === 'FIXED_PRICE') {
            if (data.enabled) {
              await shopifyProductUpdate({
                productId: existingProduct.fixedProductId,
                status: 'ACTIVE',
                imageUrl: productImage,
                gql,
              });
              await shopifyProductUpdate({
                productId: existingProduct.percentageProductId,
                status: 'DRAFT',
                imageUrl: productImage,
                gql,
              });
            } else {
              await shopifyProductUpdate({
                productId: existingProduct.fixedProductId,
                status: 'DRAFT',
                imageUrl: productImage,
                gql,
              });
            }

            // product update done for fixed price - now updating product variants
            const variantExists = await queryProxy.productVariant.findFirst({
              where: { productId: existingProduct.fixedProductId },
            });
            if (variantExists) {
              const singleVariant = await shopifySingleVariantUpdate(
                {
                  price: data.price,
                  id: variantExists.id,
                  options: data.price.toString(),
                },
                gql
              );
              await metafields.push({
                key: 'productVariants',
                namespace: 'package_protection',
                type: 'json',
                value: JSON.stringify([
                  {
                    id: singleVariant.id.replace(
                      'gid://shopify/ProductVariant/',
                      ''
                    ),
                    price: singleVariant.price,
                  },
                ]),
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
                productId: existingProduct.percentageProductId,
                status: 'ACTIVE',
                imageUrl: productImage,
                gql: gql,
              });

              await shopifyProductUpdate({
                productId: existingProduct.fixedProductId,
                status: 'DRAFT',
                imageUrl: productImage,
                gql,
              });
            } else {
              await shopifyProductUpdate({
                productId: existingProduct.percentageProductId,
                status: 'DRAFT',
                imageUrl: productImage,
                gql: gql,
              });
            }

            const prevVariants = await queryProxy.productVariant.findMany({
              pageSize: 100,
              where: {
                productId: { equals: existingProduct.percentageProductId },
              },
            });
            const productVariantsUpdate: Record<string, any> = [];

            await prevVariants.firstPage().then(async (variants) => {
              let price = data.defaultPercentage;
              for (let i = 0; i < variants.length; i++) {
                productVariantsUpdate.push({
                  id: variants[i].id,
                  price: price,
                  options: price.toString(),
                });

                price += 0.5;
              }
            });

            //bulk update
            const result = await gql.query<any>({
              data: {
                query: `#graphql
                mutation productVariantsBulkUpdate($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
                  productVariantsBulkUpdate(productId: $productId, variants: $variants) {
                    productVariants{
                      id
                      price
                    }
                    userErrors{
                      field
                      message
                    }
                  }
                }`,
                variables: {
                  productId: existingProduct.percentageProductId,
                  variants: productVariantsUpdate,
                },
              },
            });

            await metafields.push({
              key: 'productVariants',
              namespace: 'package_protection',
              type: 'json',
              value: JSON.stringify(
                result.body.data.productVariantsBulkUpdate.productVariants.map(
                  (v) => ({
                    id: v.id.replace('gid://shopify/ProductVariant/', ''),
                    price: v.price,
                  })
                )
              ),
            });
          }
        } else {
          if (data.insurancePriceType === 'FIXED_PRICE') {
            let productId = '';
            if (data.enabled) {
              const createFixedProduct = await shopifyCreateProduct({
                imageUrl: icon,
                status: 'ACTIVE',
                tags: ['insurancetype-fixed', 'overall-insurance'],
                gql,
                vendor: store.name,
              });

              productId = createFixedProduct.productCreate.product.id;
            } else {
              const createFixedProduct = await shopifyCreateProduct({
                imageUrl: icon,
                status: 'DRAFT',
                tags: ['insurancetype-fixed', 'overall-insurance'],
                gql,
                vendor: store.name,
              });
              productId = createFixedProduct.productCreate.product.id;
            }
            const createPercentProduct = await shopifyCreateProduct({
              imageUrl: icon,
              status: 'DRAFT',
              tags: ['insurancetype-percentage', 'overall-insurance'],
              gql,
              vendor: store.name,
            });
            const productGqlDraftId =
              createPercentProduct.productCreate.product.id;
            if (productId) {
              try {
                const fixedProduct = {
                  title: 'Package Protection',
                  productType: 'Warranty',
                  tags: ['insurancetype-fixed', 'overall-insurance'],
                  handle: 'package-protection-fixed',
                  vendor: store.name,
                  status: 'PUBLISHED',
                  storeId: data.storeId,
                  id: productId,
                };
                const percentageProduct = {
                  title: 'Package Protection',
                  productType: 'Warranty',
                  handle: 'package-protection-percentage',
                  tags: ['insurancetype-percentage', 'overall-insurance'],
                  vendor: store.name,
                  status: 'DRAFT',
                  storeId: data.storeId,
                  id: productGqlDraftId,
                };
                const fixedProductResult = await queryProxy.product.upsert({
                  create: fixedProduct,
                  update: fixedProduct,
                  where: { id: productId },
                });
                const percentageProductResult = await queryProxy.product.upsert(
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

              const singleVariant = await shopifySingleVariantUpdate(
                {
                  price: data.price,
                  id: variantExists?.id,
                  options: data.price.toString(),
                },
                gql
              );
              await metafields.push({
                key: 'productVariants',
                namespace: 'package_protection',
                type: 'json',
                value: JSON.stringify([
                  {
                    id: singleVariant.id.replace(
                      'gid://shopify/ProductVariant/',
                      ''
                    ),
                    price: singleVariant.price,
                  },
                ]),
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
                imageUrl: icon,
                status: 'ACTIVE',
                tags: ['insurancetype-percentage', 'overall-insurance'],
                gql,
                vendor: store.name,
              });
              productId = await createPercentProduct.productCreate.product.id;
            } else {
              const createPercentProduct = await shopifyCreateProduct({
                imageUrl: icon,
                status: 'DRAFT',
                tags: ['insurancetype-percentage', 'overall-insurance'],
                gql,
                vendor: store.name,
              });
              productId = await createPercentProduct.productCreate.product.id;
            }
            const createFixedProduct = await shopifyCreateProduct({
              imageUrl: icon,
              status: 'DRAFT',
              tags: ['insurancetype-fixed', 'overall-insurance'],
              gql,
              vendor: store.name,
            });
            const productGqlDraftId = await createFixedProduct.productCreate
              .product.id;
            if (productId) {
              try {
                const fixedProduct = {
                  title: 'Package Protection',
                  productType: 'Warranty',
                  handle: 'package-protection-fixed',
                  tags: ['insurancetype-fixed', 'overall-insurance'],
                  vendor: store.name,
                  status: 'PUBLISHED',
                  storeId: data.storeId,
                  id: productGqlDraftId,
                };
                const percentageProduct = {
                  title: 'Package Protection',
                  productType: 'Warranty',
                  handle: 'package-protection-percentage',
                  tags: ['insurancetype-percentage', 'overall-insurance'],
                  vendor: store.name,
                  status: 'DRAFT',
                  storeId: data.storeId,
                  id: productId,
                };
                const fixedProductResult = await queryProxy.product.upsert({
                  create: fixedProduct,
                  update: fixedProduct,
                  where: { id: productGqlDraftId },
                });
                const percentageProductResult = await queryProxy.product.upsert(
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
        console.log('error', error);
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

        if (res.body.data?.userErrors?.length > 0) {
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
      sku: 'overall-package-protection',
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

async function shopifySingleVariantUpdate(input, gql: GraphqlClient) {
  const res = await gql.query<any>({
    data: {
      query: `#graphql
      mutation updateProductVariantMetafields($input: ProductVariantInput!) {
        productVariantUpdate(input: $input) {
          product {
            id
          },
          productVariant{
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
        input: input,
      },
    },
  });
  return res.body.data.productVariantUpdate.productVariant;
}

interface IShopifyProductCreateAndUpdateArgs {
  productId?: string;
  status: 'ACTIVE' | 'DRAFT';
  imageUrl: string;
  tags?: string[];
  gql: GraphqlClient;
  vendor?: string;
}

async function shopifyProductUpdate({
  productId,
  status,
  imageUrl,
  gql,
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
        },
        // media: {
        //   mediaContentType: 'IMAGE',
        //   originalSource: imageUrl,
        // },
      },
    },
  });
}

async function shopifyCreateProduct({
  tags,
  imageUrl,
  status,
  gql,
  vendor,
}: IShopifyProductCreateAndUpdateArgs): Promise<any> {
  console.log(
    '------------------------------------product creating---------------------------------------------'
  );
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
          ],
        },
        media: {
          alt: 'package-protection',
          mediaContentType: 'IMAGE',
          originalSource: imageUrl,
        },
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
  const published = await gql.query<any>({
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
