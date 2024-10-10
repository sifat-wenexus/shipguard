import { UpdateProductCollection } from '~/jobs/update-product-collection';
import { ImportCollections } from '~/jobs/import-collections.server';
import { ImportProducts } from '~/jobs/import-products.server';
import { ImportOrders } from '~/jobs/import-orders.server';


export const jobExecutors = {
  'update-product-collection': UpdateProductCollection,
  'import-collections': ImportCollections,
  'import-products': ImportProducts,
  'import-orders': ImportOrders,
};

export type JobName = keyof typeof jobExecutors;
