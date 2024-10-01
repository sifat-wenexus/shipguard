import { UpdateProductCollection } from '~/jobs-old/update-product-collection';
import { ImportCollections } from '~/jobs-old/import-collections.server';
import { ImportProducts } from '~/jobs-old/import-products.server';
import type { JobConstructor } from '~/modules/job-old/job';

export const jobExecutors: Record<string, JobConstructor> = {
  'update-product-collection': UpdateProductCollection,
  'import-collections': ImportCollections,
  'import-products': ImportProducts,
};
