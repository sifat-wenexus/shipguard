import { defineModels } from '~/modules/query/define-model.server';
import type { Session } from '~/shopify-api/lib';
import type Prisma from '#prisma-client';

export const models = defineModels(() => {
  function oneLevelPermission(session: Session) {
    return {
      storeId: session.storeId!,
    };
  }

  function oneLevelPermissionWithId(session: Session) {
    return {
      id: session.storeId!,
    };
  }

  function salesCampaignIncludePermission(session: Session) {
    return {
      Campaign: {
        storeId: session.storeId!,
      },
    };
  }
  function checkoutTermsSettingsPermission(session: Session) {
    return {
      storeId: session.storeId!,
    };
  }

  function packageProtectionPermission(session: Session) {
    return { storeId: session.storeId! };
  }

  function packageProtectionExcludeProductPermission(session: Session) {
    return { id: session.storeId! };
  }

  const readAndSubscribeTrue = {
    subscribe: true,
    read: true,
  };

  const scrollToTopMutationFields = new Set<keyof Prisma.ScrollToTopSettings>([
    'icon',
    'enabled',
    'showOnMobile',
    'showOnDesktop',
    'backgroundColor',
    'iconColor',
    'iconSize',
    'padding',
    'shape',
    'bottom',
    'right',
  ]);
  const salesCampaignMutationFields = new Set<keyof Prisma.SalesCampaign>([
    'status',
    'rangeType',
    'name',
    'description',
    'createCollection',
    'startDate',
    'endDate',
    'startDateTimezoneId',
    'endDateTimezoneId',
    'statusUpdatedAt',
  ]);
  const salesCampaignIncludeMutationFields = new Set<
    keyof Prisma.SalesCampaignInclude
  >([
    'campaignId',
    'name',
    'allProducts',
    'productVendors',
    'productTypes',
    'productTags',
    'productTitle',
    'discountType',
    'discountValue',
  ]);
  const salesCampaignExcludeMutationFields = new Set<
    keyof Prisma.SalesCampaignExclude
  >([
    'includeId',
    'campaignId',
    'productVendors',
    'productTypes',
    'productTags',
    'productTitle',
  ]);
  const salesCampaignVariantMutationFields = new Set<
    keyof Prisma.SalesCampaignVariant
  >(['campaignId', 'variantId', 'backupPrice', 'backupCompareAtPrice']);

  const checkoutTermsSettingsMultipleFields = new Set<
    keyof Prisma.CheckoutTermsSettings
  >([
    'enabled',
    'text',
    'warningText',
    'position',
    'showOnCartPage',
    'showOnMiniCart',
    'checked',
    'textFontSize',
    'textColor',
    'textLinkColor',
    'textLinkUnderline',
    'warningTextFontSize',
    'warningTextColor',
    'warningTextLinkColor',
    'warningTextLinkUnderline',
    'textAlign',
  ]);

  const packageProtectionMultipleFields = new Set<
    keyof Prisma.PackageProtection
  >([
    'insuranceFulfillmentStatus',
    'insuranceDisplayButton',
    'percentageProductId',
    'disabledDescription',
    'enabledDescription',
    'insurancePriceType',
    'defaultPercentage',
    'defaultSetting',
    'fixedProductId',
    'showOnCartPage',
    'showOnMiniCart',
    'switchColor',
    'cssSelector',
    'percentage',
    'policyUrl',
    'position',
    'enabled',
    'price',
    'title',
    'icon',
    'css',
  ]);

  const packageProtectionExcludeProductMultipleFields = new Set<
    keyof Prisma.ExcludedPackageProtectionProduct
  >([
    'image',
    'productId',
    'id',
    'productType',
    'status',
    'storeId',
    'title',
    'totalInventory',
    'vendor',
  ]);

  const packageProtectionExcludeVariantMultipleFields = new Set<
    keyof Prisma.ExcludedPackageProtectionVariant
  >([
    'inventoryManagement',
    'inventoryQuantity',
    'availableForSale',
    'selectedOptions',
    'inventoryPolicy',
    'compareAtPrice',
    'displayName',
    'productId',
    'barcode',
    'image',
    'price',
    'title',
    'sku',
  ]);

  const packageProtectionOrderMultipleFields = new Set<
    keyof Prisma.PackageProtectionOrder
  >([
    'storeId',
    'orderId',
    'claimDate',
    'orderName',
    'createdAt',
    'updatedAt',
    'orderAmount',
    'refundAmount',
    'protectionFee',
    'hasClaimRequest',
    'fulfillmentStatus',
  ]);

  const packageProtectionClaimOrderMultipleFields = new Set<
    keyof Prisma.PackageProtectionClaimOrder
  >([
    'images',
    'orderId',
    'comments',
    'claimStatus',
    'fulfillClaim',
    'fulfillmentId',
    'hasClaimRequest',
    'requestedResulation',
    'fulfillmentLineItemId',
    'claimStatusMessage',
  ]);

  return {
    country: {
      permissions: readAndSubscribeTrue,
    },
    timezone: {
      permissions: readAndSubscribeTrue,
    },
    timezoneSimplified: {
      permissions: readAndSubscribeTrue,
    },
    session: {
      permissions: {
        read: {
          fields: true,
          permission: (session: Session) => {
            return {
              id: session.id,
            };
          },
        },
      },
    },
    store: {
      permissions: {
        subscribe: true,
        read: {
          fields: true,
          permission: oneLevelPermissionWithId,
        },
      },
    },
    job: {
      permissions: {
        subscribe: true,
        read: {
          fields: true,
          permission: oneLevelPermission,
        },
      },
    },
    file: {
      permissions: {
        subscribe: true,
        read: {
          fields: true,
          permission(session) {
            return {
              OR: [
                {
                  storeId: null,
                },
                {
                  storeId: session.storeId!,
                },
              ],
            };
          },
        },
        delete: {
          permission: oneLevelPermission,
        },
      },
    },
    badgeImage: {
      permissions: {
        subscribe: true,
        read: {
          fields: true,
          permission(session) {
            return {
              Settings: {
                id: session.storeId!,
              },
            };
          },
        },
        delete: {
          permission(session) {
            return {
              Settings: {
                id: session.storeId!,
              },
            };
          },
        },
        create: {
          fields: new Set(['id']),
          preset(session) {
            return {
              settingId: session.storeId!,
            };
          },
          validation(session) {
            return {
              settingId: session.storeId!,
            };
          },
        },
      },
    },
    badgeGroup: {
      permissions: {
        subscribe: true,
        read: true,
      },
    },
    badgeSettings: {
      permissions: {
        subscribe: true,
        read: {
          fields: true,
          permission: oneLevelPermissionWithId,
        },
        update: {
          fields: new Set(['enabled']),
          permission: oneLevelPermissionWithId,
        },
        create: {
          fields: new Set(['enabled']),
          permission: oneLevelPermissionWithId,
          preset(session) {
            return {
              id: session.storeId!,
            };
          },
        },
      },
    },
    scrollToTopSettings: {
      permissions: {
        subscribe: true,
        read: {
          fields: true,
          permission: oneLevelPermissionWithId,
        },
        update: {
          fields: scrollToTopMutationFields,
          permission: oneLevelPermissionWithId,
        },
        create: {
          fields: scrollToTopMutationFields,
          permission: oneLevelPermissionWithId,
          preset(session) {
            return {
              id: session.storeId!,
            };
          },
        },
      },
    },
    collection: {
      permissions: {
        subscribe: true,
        read: {
          fields: true,
          permission: oneLevelPermission,
        },
      },
    },
    product: {
      permissions: {
        subscribe: true,
        read: true,
      },
    },
    productTag: {
      permissions: {
        subscribe: true,
        read: {
          fields: true,
          permission: oneLevelPermission,
        },
      },
    },
    productType: {
      permissions: {
        subscribe: true,
        read: {
          fields: true,
          permission: oneLevelPermission,
        },
      },
    },
    productVendor: {
      permissions: {
        subscribe: true,
        read: {
          fields: true,
          permission: oneLevelPermission,
        },
      },
    },
    productVariant: {
      permissions: {
        subscribe: true,
        read: {
          fields: true,
          permission(session) {
            return {
              Product: {
                storeId: session.storeId!,
              },
            };
          },
        },
      },
    },
    salesCampaign: {
      permissions: {
        subscribe: true,
        read: {
          fields: true,
          permission: oneLevelPermission,
        },
        create: {
          fields: salesCampaignMutationFields,
          permission: oneLevelPermission,
          preset(session) {
            return {
              storeId: session.storeId,
            };
          },
        },
        update: {
          fields: salesCampaignMutationFields,
          permission: oneLevelPermission,
        },
        delete: {
          permission: oneLevelPermission,
        },
      },
    },
    salesCampaignInclude: {
      permissions: {
        subscribe: true,
        read: {
          fields: true,
          permission: salesCampaignIncludePermission,
        },
        update: {
          fields: salesCampaignIncludeMutationFields,
          permission: salesCampaignIncludePermission,
          validation: salesCampaignIncludePermission,
        },
        create: {
          fields: salesCampaignIncludeMutationFields,
          validation: salesCampaignIncludePermission,
        },
        delete: {
          permission: salesCampaignIncludePermission,
        },
      },
    },
    salesCampaignExclude: {
      permissions: {
        subscribe: true,
        read: {
          fields: true,
          permission: salesCampaignIncludePermission,
        },
        update: {
          fields: salesCampaignExcludeMutationFields,
          permission: salesCampaignIncludePermission,
          validation: salesCampaignIncludePermission,
        },
        create: {
          fields: salesCampaignExcludeMutationFields,
          validation: salesCampaignIncludePermission,
        },
        delete: {
          permission: salesCampaignIncludePermission,
        },
      },
    },
    salesCampaignVariant: {
      permissions: {
        subscribe: true,
        read: {
          fields: true,
          permission: salesCampaignIncludePermission,
        },
        create: {
          fields: salesCampaignVariantMutationFields,
          permission: salesCampaignIncludePermission,
          validation: salesCampaignIncludePermission,
        },
        update: {
          fields: salesCampaignVariantMutationFields,
          permission: salesCampaignIncludePermission,
        },
        delete: {
          permission: salesCampaignIncludePermission,
        },
      },
    },
    checkoutTermsSettings: {
      permissions: {
        subscribe: true,
        read: {
          fields: true,
          permission: checkoutTermsSettingsPermission,
        },
        create: {
          fields: checkoutTermsSettingsMultipleFields,
          preset: checkoutTermsSettingsPermission,
          permission: checkoutTermsSettingsPermission,
          validation: checkoutTermsSettingsPermission,
        },
        update: {
          fields: checkoutTermsSettingsMultipleFields,
          permission: checkoutTermsSettingsPermission,
        },
        delete: {
          permission: checkoutTermsSettingsPermission,
        },
      },
    },
    packageProtection: {
      permissions: {
        subscribe: true,
        read: {
          fields: true,
          permission: packageProtectionPermission,
        },
        create: {
          fields: packageProtectionMultipleFields,
          preset: packageProtectionPermission,
          permission: packageProtectionPermission,
          validation: packageProtectionPermission,
        },
        update: {
          fields: packageProtectionMultipleFields,
          permission: packageProtectionPermission,
        },
        delete: {
          permission: packageProtectionPermission,
        },
      },
    },
    excludePackageProtectionProduct: {
      permissions: {
        subscribe: true,
        read: {
          fields: true,
          permission(session) {
            return {
              packageProtection: {
                storeId: session.storeId!,
              },
            };
          },
        },
        create: {
          fields: packageProtectionExcludeProductMultipleFields,
          preset: true,
          permissions: true,
          validation: true,
        },
        update: {
          fields: packageProtectionExcludeProductMultipleFields,
          permission: true,
        },
        delete: { permission: true },
      },
    },
    excludePackageProtectionVariant: {
      // permissions: {
      //   read: {
      //     fields: true,
      //     permission: packageProtectionExcludeProductPermission,
      //   },
      //   create: {
      //     fields: packageProtectionExcludeVariantMultipleFields,
      //     preset: packageProtectionExcludeProductPermission,
      //     permissions: packageProtectionExcludeProductPermission,
      //     validation: packageProtectionExcludeProductPermission,
      //   },
      //   update: {
      //     fields: packageProtectionExcludeVariantMultipleFields,
      //     permission: packageProtectionExcludeProductPermission,
      //   },
      //   delete: { permission: packageProtectionExcludeProductPermission },
      // },
    },

    packageProtectionOrder: {
      permissions: {
        subscribe: true,
        read: {
          fields: true,
          permission: packageProtectionPermission,
        },
        create: {
          fields: packageProtectionOrderMultipleFields,
          preset: packageProtectionPermission,
          permission: packageProtectionPermission,
          validation: packageProtectionPermission,
        },
        update: {
          fields: packageProtectionOrderMultipleFields,
          permission: packageProtectionPermission,
        },
        delete: {
          permission: packageProtectionPermission,
        },
      },
    },

    packageProtectionClaimOrder: {
      subscribe: true,
      read: {
        fields: true,
        permission: packageProtectionPermission,
      },
      create: {
        fields: packageProtectionClaimOrderMultipleFields,
        preset: packageProtectionPermission,
        permission: packageProtectionPermission,
        validation: packageProtectionPermission,
      },
      update: {
        fields: packageProtectionClaimOrderMultipleFields,
        permission: packageProtectionPermission,
      },
      delete: {
        permission: packageProtectionPermission,
      },
    },
  };
});
