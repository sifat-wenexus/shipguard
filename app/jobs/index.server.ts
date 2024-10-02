import { UpdateProductCollection } from '~/jobs/update-product-collection';
import { ImportCollections } from '~/jobs/import-collections.server';
import { ImportProducts } from '~/jobs/import-products.server';
import { Job } from '~/modules/job/job';

export class TestJob extends Job<any> {
  async execute(): Promise<any> {
    console.log(this.job.payload);

    return Promise.reject('Hello, World!');
  }
}

export const jobExecutors = {
  'update-product-collection': UpdateProductCollection,
  'import-collections': ImportCollections,
  'import-products': ImportProducts,
  'test-job': TestJob,
};

export type JobName = keyof typeof jobExecutors;
