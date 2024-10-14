import { UpdateProductCollection } from '~/jobs/update-product-collection';
import { ImportProducts } from '~/jobs/import-products.server';
import { HandleWebhook } from '~/jobs/handle-webhook.server';
import { ImportOrders } from '~/jobs/import-orders.server';


export const jobExecutors = {
  'update-product-collection': UpdateProductCollection,
  'import-products': ImportProducts,
  'handle-webhook': HandleWebhook,
  'import-orders': ImportOrders,
};

export type JobName = keyof typeof jobExecutors;
