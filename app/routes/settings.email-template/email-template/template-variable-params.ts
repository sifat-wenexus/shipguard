import { $Enums } from '#prisma-client';

export const templateParameters = (
  name: $Enums.EmailTemplateName,
  logo: string | null
) => {
  switch (name) {
    case 'CLAIM_REQUEST_EMAIL_FOR_ADMIN':
      return {
        request_regulation: '{{request_regulation}}',
        customer_name: '{{customer_name}}',
        claim_reason: '{{claim_reason}}',
        claim_date: '{{claim_date}}',
        shop_name: '{{shop_name}}',
        order_url: '{{order_url}}',
        order_id: '{{order_id}}',
        issue: '{{issue}}',
      };

    case 'CLAIM_REQUEST_EMAIL_FOR_CUSTOMER':
      return {
        customer_name: '{{customer_name}}',
        claim_reason: '{{claim_reason}}',
        claim_date: '{{claim_date}}',
        shop_name: '{{shop_name}}',
        order_id: '{{order_id}}',
        shop_logo: logo,
      };
    case 'CLAIM_REFUND_EMAIL_FOR_CUSTOMER':
      return {
        status_message: '{{status_message}}',
        refund_amount: '{{refund_amount}}',
        shop_name: '{{shop_name}}',
        order_id: '{{order_id}}',
        status: '{{status}}',
        date: '{{date}}',
        currency: 'BDT',
        shop_logo: logo,
      };
    case 'CLAIM_REORDER_EMAIL_FOR_CUSTOMER':
      return {
        replacement_order_id: '{{replacement_order_id}}',
        status_message: '{{status_message}}',
        shop_name: '{{shop_name}}',
        order_id: '{{order_id}}',
        status: '{{status}}',
        shop_logo: logo,
      };
    case 'CLAIM_CANCEL_EMAIL_FOR_CUSTOMER':
      return {
        cancellation_reason: '{{cancellation_reason}}',
        customer_name: '{{customer_name}}',
        shop_name: '{{shop_name}}',
        order_id: '{{order_id}}',
        status: '{{status}}',
        shop_logo: logo,
      };
    default:
      return '';
  }
};
