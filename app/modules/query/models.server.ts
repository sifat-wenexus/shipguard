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

  function packageProtectionPermission(session: Session) {
    return { storeId: session.storeId! };
  }

  const readAndSubscribeTrue = {
    subscribe: true,
    read: true,
  };

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

  const packageProtectionOrderMultipleFields = new Set<
    keyof Prisma.PackageProtectionOrder
  >([
    'storeId',
    'orderId',
    'claimDate',
    'orderName',
    'createdAt',
    'updatedAt',
    'claimStatus',
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
