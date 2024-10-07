import { $Enums } from '#prisma-client';
import { getConfig } from '~/modules/get-config.server';
import { prisma } from '~/modules/prisma.server';

export const templateParameters = (
  name: $Enums.EmailTemplateName,
  logo: string
) => {
  switch (name) {
    case 'CLAIM_REQUEST_EMAIL_FOR_ADMIN':
      return {
        order_id: '{{order_id}}',
        customer_name: '{{customer_name}}',
        claim_reason: '{{claim_reason}}',
        claim_date: '{{claim_date}}',
        shop_name: '{{shop_name}}',
        order_url: '{{order_url}}',
      };

    case 'CLAIM_REQUEST_EMAIL_FOR_CUSTOMER':
      return {
        order_id: '{{order_id}}',
        customer_name: '{{customer_name}}',
        shop_name: '{{shop_name}}',
        shop_logo: logo,
        order_url: '{{order_url}}',
        claim_date: '{{claim_date}}',
        claim_reason: '{{claim_reason}}',
      };
    case 'CLAIM_REFUND_EMAIL_FOR_CUSTOMER':
      return {
        order_id: '{{order_id}}',
        shop_name: '{{shop_name}}',
        shop_logo: logo,
        refund_amount: '{{refund_amount}}',
        date: '{{date}}',
      };
    case 'CLAIM_REORDER_EMAIL_FOR_CUSTOMER':
      return {
        order_id: '{{order_id}}',
        shop_name: '{{shop_name}}',
        shop_logo: logo,
        replacement_order_id: '{{replacement_order_id}}',
        status: '{{status}}',
      };
    case 'CLAIM_CANCEL_EMAIL_FOR_CUSTOMER':
      return {
        order_id: '{{order_id}}',
        shop_name: '{{shop_name}}',
        shop_logo: logo,
        cancellation_reason: '{{cancellation_reason}}',
        customer_name: '{{customer_name}}',
      };
    default:
      return '';
  }
};
