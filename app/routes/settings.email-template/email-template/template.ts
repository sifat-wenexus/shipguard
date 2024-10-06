import { prisma } from '~/modules/prisma.server';
import type { $Enums } from '#prisma-client';
import { Liquid } from 'liquidjs';

abstract class Template<C = any> {
  // abstract variables(context?: C): Promise<Record<string, any>>;
  abstract name: $Enums.EmailTemplateName;
  abstract liquid: string;
  abstract storeId: string;

  async render(context?: C): Promise<string> {
    // Fetch - Parse - Render
    const engine = new Liquid();
    if (this.liquid) {
      const parse = engine.parse(`${this.liquid}`);
      const res = await engine.render(parse, context!);
      return await res;
    }
    const liquidFromDb = await prisma.emailTemplate.findFirst({
      where: { name: this.name, storeId: this.storeId },
    });
    if (liquidFromDb && context) {
      const parse = engine.parse(`${liquidFromDb.body}`);
      const res = await engine.render(parse, context);
      return await res;
    }
    return 'Template Not Found!';
  }
}

export interface ClaimRequestAdminTemplateVariables {
  shop_name: string;
  order_id: string;
  customer_name: string;
  claim_reason: string;
  claim_date: string;
  order_url: string;
}

export interface ClaimRequestCustomerTemplateVariables {
  order_id: string;
  customer_name: string;
  claim_reason: string;
  claim_date: string;
  shop_name: string;
  shop_logo: string;
  order_url: string;
}

export interface ClaimRefundCustomerTemplateVariables {
  order_id: string;
  refund_amount: string;
  date: string;
  shop_name: string;
  shop_logo: string;
  order_url: string;
}

export interface ClaimReOrderCustomerTemplateVariables {
  order_id: string;
  replacement_order_id: string;
  shipping_details: string;
  shop_name: string;
  shop_logo: string;
  order_url: string;
}

export interface ClaimCancelCustomerTemplateVariables {
  order_id: string;
  customer_name: string;
  cancellation_reason: string;
  shop_name: string;
  shop_logo: string;
  order_url: string;
}

export class ClaimRequestAdminTemplate extends Template<ClaimRequestAdminTemplateVariables> {
  name: $Enums.EmailTemplateName = 'CLAIM_REQUEST_EMAIL_FOR_ADMIN';
  liquid = '';
  storeId: string = '';
}

export class ClaimRequestCustomerTemplate extends Template<ClaimRequestCustomerTemplateVariables> {
  name: $Enums.EmailTemplateName = 'CLAIM_REQUEST_EMAIL_FOR_CUSTOMER';
  liquid = '';
  storeId: string = '';
}

export class ClaimRefundCustomerTemplate extends Template<ClaimRefundCustomerTemplateVariables> {
  name: $Enums.EmailTemplateName = 'CLAIM_REFUND_EMAIL_FOR_CUSTOMER';
  liquid = '';
  storeId: string = '';
}

export class ClaimReOrderCustomerTemplate extends Template<ClaimReOrderCustomerTemplateVariables> {
  name: $Enums.EmailTemplateName = 'CLAIM_REORDER_EMAIL_FOR_CUSTOMER';
  liquid = '';
  storeId: string = '';
}

export class ClaimCancelCustomerTemplate extends Template<ClaimCancelCustomerTemplateVariables> {
  name: $Enums.EmailTemplateName = 'CLAIM_CANCEL_EMAIL_FOR_CUSTOMER';
  liquid = '';
  storeId: string = '';
}
