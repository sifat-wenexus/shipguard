import { UpdateProductCollection } from '~/jobs/update-product-collection';
import { ImportCollections } from '~/jobs/import-collections.server';
import { ImportProducts } from '~/jobs/import-products.server';
import type { JobConstructor } from '~/modules/job/job';

export const jobExecutors: Record<string, JobConstructor> = {
  'update-product-collection': UpdateProductCollection,
  'import-collections': ImportCollections,
  'import-products': ImportProducts,
};
