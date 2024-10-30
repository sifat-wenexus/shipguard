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

interface IShopifyBulkVariantUpdate {
  optionValues: {
    id?: string;
    linkedMetafieldValue?: string;
    name?: string;
    optionId?: string;
    optionName?: string;
  }[];
  id?: string;
  price: number;
  taxable: boolean;
  inventoryItem: {
    sku: string;
    requiresShipping: boolean;
    tracked?: boolean;
    cost?: number;
  };
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
let percentageValueIncreaseBy = 0;

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

      if (+data.minimumFee >= 0 && +data.maximumFee > 0) {
        percentageValueIncreaseBy = Number(
          ((+data.maximumFee - +data.minimumFee) / 99).toFixed(2)
        );
      }

      let metaFields: Record<string, any> = [];

      if (packageProtectionProductAndVariants.length > 0) {
        metaFields.push({
          key: 'packageProtectionProductAndVariants',
          namespace: 'package_protection',
          type: 'json',
          value: JSON.stringify(packageProtectionProductAndVariants),
        });
      } else {
        metaFields.push({
          key: 'packageProtectionProductAndVariants',
          namespace: 'package_protection',
          type: 'json',
          value: JSON.stringify(packageProtectionProductAndVariants),
        });
      }

      if (data.enabled !== undefined) {
        metaFields.push({
          key: 'enabled',
          namespace: 'package_protection',
          type: 'boolean',
          value: data.enabled.toString(),
        });
      }
      if (data.insurancePriceType !== undefined) {
        metaFields.push({
          key: 'insurancePriceType',
          namespace: 'package_protection',
          type: 'single_line_text_field',
          value: data.insurancePriceType,
        });
      }
      if (data.fixedMultiplePlan !== undefined) {
        metaFields.push({
          key: 'fixedMultiplePlan',
          namespace: 'package_protection',
          type: 'json',
          value: JSON.stringify(data.fixedMultiplePlan),
        });
      }
      if (data.price !== undefined) {
        metaFields.push({
          key: 'price',
          namespace: 'package_protection',
          type: 'number_decimal',
          value: data.price.toString(),
        });
      }
      if (data.percentage !== undefined) {
        metaFields.push({
          key: 'percentage',
          namespace: 'package_protection',
          type: 'number_decimal',
          value: data.percentage.toString(),
        });
      }

      if (data.icon !== undefined) {
        metaFields.push({
          key: 'icon',
          namespace: 'package_protection',
          type: 'single_line_text_field',
          value: data.icon,
        });
      }
      if (data.switchColor !== undefined) {
        metaFields.push({
          key: 'switchColor',
          namespace: 'package_protection',
          type: 'single_line_text_field',
          value: data.switchColor,
        });
      }
      if (data.title !== undefined) {
        metaFields.push({
          key: 'title',
          namespace: 'package_protection',
          type: 'single_line_text_field',
          value: data.title,
        });
      }

      if (data.enabledDescription !== undefined) {
        metaFields.push({
          key: 'enabledDescription',
          namespace: 'package_protection',
          type: 'single_line_text_field',
          value: data.enabledDescription,
        });
      }

      if (data.disabledDescription !== undefined) {
        metaFields.push({
          key: 'disabledDescription',
          namespace: 'package_protection',
          type: 'single_line_text_field',
          value: data.disabledDescription,
        });
      }
      if (data.policyUrl !== null) {
        metaFields.push({
          key: 'policyUrl',
          namespace: 'package_protection',
          type: 'json',
          value: JSON.stringify(data.policyUrl),
        });
      }
      if (data.insuranceDisplayButton !== undefined) {
        metaFields.push({
          key: 'insuranceDisplayButton',
          namespace: 'package_protection',
          type: 'boolean',
          value: data.insuranceDisplayButton.toString(),
        });
      }
      if (data.insuranceFulfillmentStatus) {
        metaFields.push({
          key: 'insuranceFulfillmentStatus',
          namespace: 'package_protection',
          type: 'single_line_text_field',
          value: data.insuranceFulfillmentStatus,
        });
      }
      if (data.css !== undefined) {
        metaFields.push({
          key: 'css',
          namespace: 'package_protection',
          type: 'json',
          value: JSON.stringify(data.css) || 'null',
        });
      }
      if (data.cssSelector) {
        metaFields.push({
          key: 'cssSelector',
          namespace: 'package_protection',
          type: 'single_line_text_field',
          value: data.cssSelector === '' ? 'null' : data.cssSelector,
        });
      }
      if (data.position !== undefined) {
        metaFields.push({
          key: 'position',
          namespace: 'package_protection',
          type: 'single_line_text_field',
          value: data.position,
        });
      }
      if (data.showOnCartPage !== undefined) {
        metaFields.push({
          key: 'showOnCartPage',
          namespace: 'package_protection',
          type: 'boolean',
          value: data.showOnCartPage.toString(),
        });
      }
      if (data.showOnMiniCart !== undefined) {
        metaFields.push({
          key: 'showOnMiniCart',
          namespace: 'package_protection',
          type: 'boolean',
          value: data.showOnMiniCart.toString(),
        });
      }
      if (icon) {
        metaFields.push({
          key: 'iconUrl',
          namespace: 'package_protection',
          type: 'single_line_text_field',
          value: icon.toString(),
        });
      }
      if (data.defaultSetting !== undefined) {
        metaFields.push({
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
            products(first:10,query:"sku:${PRODUCT_SKU}") {
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
          tries: 20,
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

          if (
            data.insurancePriceType === 'FIXED_PRICE' ||
            data.insurancePriceType === 'FIXED_MULTIPLE'
          ) {
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

            const variantsForDelete = await queryProxy.productVariant.findMany({
              where: { productId: fixedProductId },
              pageSize: 100,
            });
            const variants = await variantsForDelete.firstPage();
            if (variants.length > 0) {
              await shopifyBulkVariantsDelete(
                fixedProductId!,
                variants.map((variant) => variant.id),
                gql
              );
            }

            const option = await getProductWithOption(fixedProductId!, gql);
            if (data.insurancePriceType === 'FIXED_PRICE') {
              const balkVariant = await shopifyBulkVariantsCreate(
                fixedProductId!,
                [
                  {
                    optionValues: [
                      {
                        name: Number(data.price).toFixed(2),
                        optionName: option[0].name,
                      },
                    ],
                    price: +data.price,
                    taxable: false,
                    inventoryItem: {
                      requiresShipping: false,
                      tracked: false,
                      sku: PRODUCT_SKU,
                    },
                  },
                ],
                gql
              );
              await metaFields.push({
                key: 'productVariants',
                namespace: 'package_protection',
                type: 'json',
                value: JSON.stringify(
                  balkVariant.productVariants.map((v) => ({
                    id: v.id.replace('gid://shopify/ProductVariant/', ''),
                    price: v.price,
                  }))
                ),
              });
            }
            if (data.insurancePriceType === 'FIXED_MULTIPLE') {
              let multiplePlane: any = null;

              multiplePlane = data.fixedMultiplePlan;

              if (multiplePlane) {
                const balkVariant = await shopifyBulkVariantsCreate(
                  fixedProductId!,
                  multiplePlane?.map((plan) => {
                    return {
                      optionValues: [
                        {
                          name: plan.protectionFees,
                          optionName: option[0].name,
                        },
                      ],
                      price: plan.protectionFees,
                      taxable: false,
                      inventoryItem: {
                        tracked: false,
                        sku: PRODUCT_SKU,
                        requiresShipping: false,
                      },
                    };
                  }),
                  gql
                );
                await metaFields.push({
                  key: 'productVariants',
                  namespace: 'package_protection',
                  type: 'json',
                  value: JSON.stringify(
                    balkVariant.productVariants.map((v) => ({
                      id: v.id.replace('gid://shopify/ProductVariant/', ''),
                      price: v.price,
                    }))
                  ),
                });
              }
            }
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
            const option = await getProductWithOption(
              percentageProductId!,
              gql
            );
            await prevVariants.firstPage().then((variants) => {
              let price = +data.minimumFee;
              for (let i = 0; i < variants.length; i++) {
                productVariantsUpdate.push({
                  optionValues: [
                    {
                      name: Number(price).toFixed(2),
                      optionName: option[0].name,
                    },
                  ],
                  id: variants[i].id,
                  taxable: false,
                  price: Number(price.toFixed(2)),
                  inventoryItem: {
                    sku: PRODUCT_SKU,
                    requiresShipping: false,
                    tracked: false,
                  },
                });

                price += percentageValueIncreaseBy;
              }
            });

            //bulk update
            const result = await shopifyBulkVariantUpdate(
              percentageProductId!,
              productVariantsUpdate,
              gql
            );
            await metaFields.push({
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
          if (
            data.insurancePriceType === 'FIXED_PRICE' ||
            data.insurancePriceType === 'FIXED_MULTIPLE'
          ) {
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
                await queryProxy.product.upsert({
                  create: percentageProduct,
                  update: percentageProduct,
                  where: { id: productGqlDraftId },
                });

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

              const options = await getProductWithOption(
                productGqlDraftId!,
                gql
              );
              const productVariants: IShopifyBulkVariantUpdate[] = [];
              let price = +data.minimumFee;
              for (let i = 1; i <= 100; i++) {
                productVariants.push({
                  price: Number(price.toFixed(2)),
                  optionValues: [
                    {
                      optionName: options[0].name,
                      name: Number(price).toFixed(2),
                    },
                  ],
                  inventoryItem: {
                    requiresShipping: false,
                    sku: PRODUCT_SKU,
                    tracked: false,
                  },
                  taxable: false,
                });
                price += percentageValueIncreaseBy;
              }

              await shopifyBulkVariantsCreate(
                productGqlDraftId,
                productVariants,
                gql
              );

              // product creation done for fixed price - now creating product variants
              await sleep(1500);
              const variantsForDelete = await prisma.productVariant.findMany({
                where: { productId: productId },
              });
              const option = await getProductWithOption(productId!, gql);
              if (variantsForDelete.length) {
                await shopifyBulkVariantsDelete(
                  productId,
                  variantsForDelete.map((variant) => variant.id),
                  gql
                );
              }
              if (data.insurancePriceType === 'FIXED_PRICE') {
                const balkVariant = await shopifyBulkVariantsCreate(
                  productId,
                  [
                    {
                      optionValues: [
                        {
                          name: Number(data.price).toFixed(2),
                          optionName: option[0].name,
                        },
                      ],
                      price: +data.price,
                      taxable: false,
                      inventoryItem: {
                        sku: PRODUCT_SKU,
                        requiresShipping: false,
                        tracked: false,
                      },
                    },
                  ],
                  gql
                );
                await metaFields.push({
                  key: 'productVariants',
                  namespace: 'package_protection',
                  type: 'json',
                  value: JSON.stringify(
                    balkVariant.productVariants.map((v) => ({
                      id: v.id.replace('gid://shopify/ProductVariant/', ''),
                      price: v.price,
                    }))
                  ),
                });
              }
              if (data.insurancePriceType === 'FIXED_MULTIPLE') {
                if (!data.fixedMultiplePlan) return;
                const multiplePlane = data.fixedMultiplePlan as any[];

                const balkVariant = await shopifyBulkVariantsCreate(
                  productId,
                  multiplePlane?.map((plan) => {
                    return {
                      optionValues: [
                        {
                          name: plan.protectionFees,
                          optionName: option[0].name,
                        },
                      ],
                      price: plan.protectionFees,
                      taxable: false,
                      inventoryItem: {
                        tracked: false,
                        sku: PRODUCT_SKU,
                        requiresShipping: false,
                      },
                    };
                  }),
                  gql
                );
                await metaFields.push({
                  key: 'productVariants',
                  namespace: 'package_protection',
                  type: 'json',
                  value: JSON.stringify(
                    balkVariant.productVariants.map((v) => ({
                      id: v.id.replace('gid://shopify/ProductVariant/', ''),
                      price: v.price,
                    }))
                  ),
                });
              }
              // const variantExists = await queryProxy.productVariant.findFirst({
              //   where: { productId: productId },
              // });

              // const singleVariant = await shopifyBulkVariantUpdate(
              //   productId,
              //   [
              //     {
              //       sku: PRODUCT_SKU,
              //       options: data.price.toString(),
              //       requiresShipping: false,
              //       id: variantExists?.id as string,
              //       price: data.price,
              //       taxable: false,
              //     },
              //   ],
              //   gql
              // );
              // await metafields.push({
              //   key: 'productVariants',
              //   namespace: 'package_protection',
              //   type: 'json',
              //   value: JSON.stringify(
              //     singleVariant.productVariants.map((v) => ({
              //       id: v.id.replace('gid://shopify/ProductVariant/', ''),
              //       price: v.price,
              //     }))
              //   ),
              // });

              // await queryProxy.productVariant.update({
              //   data: {
              //     price: data.price,
              //     title: data.price.toString(),
              //   },

              //   where: { id: variantExists?.id },
              // });
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
                await queryProxy.product.upsert({
                  create: percentageProduct,
                  update: percentageProduct,
                  where: { id: productId },
                });
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

            const option = await getProductWithOption(productId!, gql);
            const productVariants: IShopifyBulkVariantUpdate[] = [];
            let price = +data.minimumFee;
            for (let i = 1; i <= 100; i++) {
              productVariants.push({
                price: price,
                optionValues: [
                  {
                    optionName: option[0].name,
                    name: Number(price).toFixed(2),
                  },
                ],
                inventoryItem: {
                  requiresShipping: false,
                  sku: PRODUCT_SKU,
                  tracked: false,
                },
                taxable: false,
              });
              price += percentageValueIncreaseBy;
            }
            // product creation done for percentage -> now creating product variants
            const res = await shopifyBulkVariantsCreate(
              productId,
              productVariants,
              gql
            );

            await metaFields.push({
              key: 'productVariants',
              namespace: 'package_protection',
              type: 'json',
              value: JSON.stringify(
                res.productVariants.map((e) => ({
                  id: e.id.replace('gid://shopify/ProductVariant/', ''),
                  price: Number(e.price).toFixed(2),
                }))
              ),
            });
          }
        }
      } catch (error) {
        console.error(JSON.stringify(error));
      }

      metaFields = metaFields.map((metafield) => ({
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
              metafields: metaFields,
            },
          },
          tries: 20,
        });
        if (res.body.data?.metafieldsSet?.userErrors?.length > 0) {
          console.log(
            'kono error nai',
            JSON.stringify(res.body.data.metafieldsSet)
          );
          throw new Error(
            `Error setting metafields: ${JSON.stringify(
              res.body.data.metafieldsSet.userErrors
            )}`
          );
        }
      } catch (err) {
        console.log('error-meta-filed', err);
      }
    }
  }
);

async function getProductWithOption(productId: string, gql: GraphqlClient) {
  const res = await gql.query<any>({
    data: {
      query: `#graphql
    query product($id: ID!) {
      product(id: $id) {
       options{
        name
       }

      }
    }
    `,
      variables: {
        id: productId,
      },
    },
  });
  return res.body.data.product.options;
}

async function shopifyBulkVariantsCreate(
  productId: string,
  variants: IShopifyBulkVariantUpdate[],
  gql: GraphqlClient
) {
  const res = await gql.query<any>({
    data: {
      query: `#graphql
    mutation productVariantsBulkCreate($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
      productVariantsBulkCreate(productId: $productId, variants: $variants) {
        product {
          id
        }
        productVariants {
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
        variants: variants,
      },
    },
  });
  return res.body.data.productVariantsBulkCreate;
}

async function shopifyBulkVariantsDelete(
  productId: string,
  variants: string[],
  gql: GraphqlClient
) {
  const res = await gql.query<any>({
    data: {
      query: `#graphql
      mutation productVariantsBulkDelete($productId: ID!, $variantsIds: [ID!]!) {
        productVariantsBulkDelete(productId: $productId, variantsIds: $variantsIds) {
          product {
            id
          },
          userErrors {
            field
            message
          }
        }
      }`,
      variables: {
        productId: productId,
        variantsIds: variants,
      },
    },
    tries: 20,
  });
  return res.body.data.productVariantsBulkDelete;
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
    tries: 20,
  });
  return res.body.data.productVariantsBulkUpdate;
}

export async function shopifyProductUpdate({
  productId,
  status,
  gql,
  vendor,
  tags,
}: IShopifyProductCreateAndUpdateArgs): Promise<any> {
  if (!productId) return;
  const getOldImage = await gql.query<any>({
    data: {
      query: `#graphql
    query product($id: ID!) {
      product(id: $id) {
        media(first:20) {
        nodes{
          id
        }
        }
      }
    }
    `,
      variables: {
        id: productId,
      },
    },
    tries: 20,
  });

  if (getOldImage.body.data.product.media.nodes.length > 1) {
    await gql.query<any>({
      data: {
        query: `#graphql
      mutation productDeleteMedia($mediaIds: [ID!]!, $productId: ID!) {
        productDeleteMedia(mediaIds: $mediaIds, productId: $productId) {
          deletedProductImageIds
          mediaUserErrors {
            field
            message
          }

        }
      }`,
        variables: {
          mediaIds: getOldImage.body.data.product.media.nodes.map(
            (media) => media.id
          ),
          productId: productId,
        },
      },
      tries: 20,
    });
    await gql.query<any>({
      data: {
        query: `#graphql
    mutation productCreateMedia($media: [CreateMediaInput!]!, $productId: ID!) {
      productCreateMedia(media: $media, productId: $productId) {

        mediaUserErrors {
          field
          message
        }

      }
    }`,
        variables: {
          media: [
            {
              alt: 'package-protection',
              mediaContentType: 'IMAGE',
              originalSource: productImage,
            },
          ],
          productId: productId,
        },
      },
      tries: 20,
    });
  }

  const res = await gql.query<any>({
    data: {
      query: `#graphql
      mutation  productUpdate($input:ProductUpdateInput!) {
        productUpdate(product: $input){
          product {
            id
            media(first:20){
              nodes{
                id
                mediaContentType
              }
            }
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
          id: productId,
          status: status,
          vendor,
          tags,
        },
      },
    },
    tries: 20,
  });
  return res.body.data;
}

async function shopifyCreateProduct({
  tags,
  status,
  gql,
  vendor,
}: IShopifyProductCreateAndUpdateArgs): Promise<any> {
  const res = await gql.query<any>({
    data: {
      query: `#graphql
      mutation productCreate($input:ProductCreateInput!,$media:[CreateMediaInput!]) {
        productCreate(product:$input,media:$media){
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
    tries: 20,
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
    tries: 20,
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
    tries: 20,
  });
};
