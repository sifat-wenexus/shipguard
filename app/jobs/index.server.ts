
// import { AnalyzeCurrentTheme } from '~/jobs/analyze-current-theme.server';
import { ImportOrders } from '~/jobs/import-orders.server';
import { ShopRedact } from '~/jobs/shop-redact.server';
import { SendMailToAppOwnerServer } from '~/jobs/send-mail-to-app-owner.server';

export const jobExecutors = {
  // 'analyze-current-theme': AnalyzeCurrentTheme,
  'import-orders': ImportOrders,
  'shop-redact': ShopRedact,
  'send-email': SendMailToAppOwnerServer
};

export type JobName = keyof typeof jobExecutors;
