import { defineModels } from '~/modules/query/define-model.server';
import type { Session } from '~/shopify-api/lib';
import type Prisma from '#prisma-client';
import Joi from 'joi';

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
    'emailTemplateLogo',
    'fixedMultiplePlan',
    'defaultSetting',
    'fixedProductId',
    'showOnCartPage',
    'showOnMiniCart',
    'switchColor',
    'cssSelector',
    'percentage',
    'minimumFee',
    'maximumFee',
    'policyUrl',
    'isSingle',
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
    'orderDate',
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
    'hasPackageProtection',
  ]);

  const packageProtectionClaimOrderMultipleFields = new Set<
    keyof Prisma.PackageProtectionClaimOrder
  >([
    'images',
    'orderId',
    'storeId',
    'issue',
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
        update: {
          fields: new Set(['appStatus', 'lastMigrationId']),
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

    jobExecution: {
      permissions: {
        subscribe: true,
        read: {
          fields: true,
          permission: oneLevelPermission,
        },

        create: {
          fields: true,
          permission: oneLevelPermission,
        },
        update: {
          fields: true,
          permission: oneLevelPermission,
        },
        delete: {
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
          permission: oneLevelPermission,
        },
        create: {
          fields: packageProtectionMultipleFields,
          preset: oneLevelPermission,
          permission: oneLevelPermission,
          validation: oneLevelPermission,
        },
        update: {
          fields: packageProtectionMultipleFields,
          permission: oneLevelPermission,
        },
        delete: {
          permission: oneLevelPermission,
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
          permission: oneLevelPermission,
        },
        create: {
          fields: packageProtectionOrderMultipleFields,
          preset: oneLevelPermission,
          permission: oneLevelPermission,
          validation: oneLevelPermission,
        },
        update: {
          fields: packageProtectionOrderMultipleFields,
          permission: oneLevelPermission,
        },
        delete: {
          permission: oneLevelPermission,
        },
      },
    },

    packageProtectionClaimOrder: {
      permissions: {
        subscribe: true,
        read: {
          fields: true,
          permission: oneLevelPermission,
        },
        create: {
          fields: packageProtectionClaimOrderMultipleFields,
          preset: oneLevelPermission,
          permission: oneLevelPermission,
          validation: oneLevelPermission,
        },
        update: {
          fields: packageProtectionClaimOrderMultipleFields,
          permission: oneLevelPermission,
        },
        delete: {
          permission: oneLevelPermission,
        },
      },
    },

    googleAuthCredential: {
      permissions: {
        subscribe: true,
        read: {
          fields: true,
          permission(session) {
            return {
              id: session.storeId!,
            };
          },
        },
        delete: {
          permission(session) {
            return {
              id: session.storeId!,
            };
          },
        },
        update: {
          fields: new Set(['payload']),
          permission(session) {
            return {
              id: session.storeId!,
            };
          },
        },
      },
    },
    smtpSetting: {
      schema: Joi.object({
        provider: Joi.string().valid('google', 'custom').required(),
        from: Joi.string().email().optional().allow(null),
        host: Joi.string().hostname().optional().allow(null),
        port: Joi.number().integer().min(1).max(65535).optional().allow(null),
        proxyHost: Joi.string().hostname().optional().allow(null),
        proxyPort: Joi.number()
          .integer()
          .min(1)
          .max(65535)
          .optional()
          .allow(null),
      }).unknown(true),
      permissions: {
        subscribe: true,
        read: {
          fields: true,
          permission: oneLevelPermissionWithId,
        },
        create: {
          fields: true,
          preset: oneLevelPermissionWithId,
          permission: oneLevelPermissionWithId,
          validation: oneLevelPermissionWithId,
        },
        update: {
          fields: true,
          permission: oneLevelPermissionWithId,
          validation: oneLevelPermissionWithId,
        },
        delete: {
          permission: oneLevelPermissionWithId,
        },
      },
    },
    jobDependency: {
      permissions: {
        subscribe: true,
        read: {
          fields: true,
          permission(session) {
            return {
              Job: {
                storeId: session.storeId!,
              },
            };
          },
        },
      },
    },
    bulkOperation: {
      permissions: {
        subscribe: true,
        read: {
          fields: true,
          permission(session) {
            return {
              Job: {
                storeId: session.storeId!,
              },
            };
          },
        },
      },
    },
  };
});
