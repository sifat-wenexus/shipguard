import { $Enums } from '#prisma-client';

export const templateParameters = (name: $Enums.EmailTemplateName) => {
  switch (name) {
    case 'CLAIM_REQUEST_EMAIL_FOR_ADMIN':
      return {
        order_id: '{{order_id}}',
        customer_name: '{{customer_name}}',
        claim_reason: '{{claim_reason}}',
        claim_date: '{{claim_date}}',
        shop_name: '{{shop_name}}',
        order_url: 'https://www.google.com/',
      };

    case 'CLAIM_REQUEST_EMAIL_FOR_CUSTOMER':
      return {
        order_id: '{{order_id}}',
        customer_name: '{{customer_name}}',
        shop_name: '{{shop_name}}',
        order_url: '{{order_url}}',
        claim_date: '{{claim_date}}',
        claim_reason: '{{claim_reason}}',
      };
    case 'CLAIM_REFUND_EMAIL_FOR_CUSTOMER':
      return {
        order_id: '{{order_id}}',
        shop_name: '{{shop_name}}',
        refund_amount: '{{refund_amount}}',
        date: '{{date}}',
        shop_logo:
          'https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/0aba50357c0466ec11ccba803cc0ccad?_a=AQAEuiZ',
      };
    case 'CLAIM_REORDER_EMAIL_FOR_CUSTOMER':
      return {
        order_id: '{{order_id}}',
        shop_name: '{{shop_name}}',
        replacement_order_id: '{{replacement_order_id}}',
        shipping_details: '{{shipping_details}}',
        shop_logo:
          'https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/0aba50357c0466ec11ccba803cc0ccad?_a=AQAEuiZ',
      };
    case 'CLAIM_CANCEL_EMAIL_FOR_CUSTOMER':
      return {
        order_id: '{{order_id}}',
        shop_name: '{{shop_name}}',
        cancellation_reason: '{{cancellation_reason}}',
        customer_name: '{{customer_name}}',
        shop_logo:
          'https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/0aba50357c0466ec11ccba803cc0ccad?_a=AQAEuiZ',
      };
    default:
      return '';
  }
};
