import { UpdateProductCollection } from '~/jobs/update-product-collection';
// import { AnalyzeCurrentTheme } from '~/jobs/analyze-current-theme.server';
import { ImportProducts } from '~/jobs/import-products.server';
import { ImportOrders } from '~/jobs/import-orders.server';
import { ShopRedact } from '~/jobs/shop-redact.server';
import { SendMailToAppOwnerServer } from '~/jobs/send-mail-to-app-owner.server';


export const jobExecutors = {
  'update-product-collection': UpdateProductCollection,
  // 'analyze-current-theme': AnalyzeCurrentTheme,
  'import-products': ImportProducts,
  'import-orders': ImportOrders,
  'shop-redact': ShopRedact,
  'send-email': SendMailToAppOwnerServer
};

export type JobName = keyof typeof jobExecutors;
