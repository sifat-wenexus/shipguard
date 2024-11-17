import { UpdateProductCollection } from '~/jobs/update-product-collection';
import { ImportProducts } from '~/jobs/import-products.server';
import { ImportOrders } from '~/jobs/import-orders.server';
import { ShopRedact } from '~/jobs/shop-redact.server';


export const jobExecutors = {
  'update-product-collection': UpdateProductCollection,
  'import-products': ImportProducts,
  'import-orders': ImportOrders,
  'shop-redact': ShopRedact,
};

export type JobName = keyof typeof jobExecutors;
