import { Card } from '@shopify/polaris';

export const ClaimRequestAdminVariable = () => {
  const variables: { name: string; key: string }[] = [
    { name: 'Shop Name', key: '{{shop_name}}' },
    { name: 'Order Id', key: '{{order_id}}' },
    { name: 'Customer Name', key: '{{customer_name}}' },
    { name: 'Claim Reason', key: '{{claim_reason}}' },
    { name: 'Claim Date', key: '{{claim_date}}' },
    { name: 'Order url', key: '{{order_url}}' },
  ];
  return (
    <>
      <Card>
        <div>
          <h3 className="text-lg mb-2"> Template Variable</h3>
          <p className="text-gray-600">
            You can use template variables to output a value in your templates.
            The available variables are:
          </p>
        </div>
        {variables.map((v, i) => (
          <div key={i} className="my-3">
            <h3 className=""> {v.name}</h3>
            <p className="text-gray-600">{v.key}</p>
          </div>
        ))}
      </Card>
    </>
  );
};

export const ClaimRequestCustomerVariable = () => {
  const variables: { name: string; key: string }[] = [
    { name: 'Order Id', key: '{{order_id}}' },
    { name: 'Customer Name', key: '{{customer_name}}' },
    { name: 'Claim Reason', key: '{{claim_reason}}' },
    { name: 'Claim Date', key: '{{claim_date}}' },
    { name: 'Shop Name', key: '{{shop_name}}' },
    { name: 'Shop Logo', key: '{{shop_logo}}' },
  ];
  return (
    <>
      <Card>
        <div>
          <h3 className="text-lg mb-2"> Template Variable</h3>
          <p className="text-gray-600">
            You can use template variables to output a value in your templates.
            The available variables are:
          </p>
        </div>
        {variables.map((v, i) => (
          <div key={i} className="my-3">
            <h3 className=""> {v.name}</h3>
            <p className="text-gray-600">{v.key}</p>
          </div>
        ))}
      </Card>
    </>
  );
};

export const ClaimRefundCustomerVariable = () => {
  const variables: { name: string; key: string }[] = [
    { name: 'Order Id', key: '{{order_id}}' },
    { name: 'Refund Amount', key: '{{refund_amount}}' },
    { name: 'Date', key: '{{date}}' },
    { name: 'Shop Name', key: '{{shop_name}}' },
    { name: 'Shop Logo', key: '{{shop_logo}}' },
    { name: 'Status', key: '{{status}}' },
    { name: 'Status Message', key: '{{status_message}}' },
  ];
  return (
    <>
      <Card>
        <div>
          <h3 className="text-lg mb-2"> Template Variable</h3>
          <p className="text-gray-600">
            You can use template variables to output a value in your templates.
            The available variables are:
          </p>
        </div>
        {variables.map((v, i) => (
          <div key={i} className="my-3">
            <h3 className=""> {v.name}</h3>
            <p className="text-gray-600">{v.key}</p>
          </div>
        ))}
      </Card>
    </>
  );
};

export const ClaimReOrderCustomerVariable = () => {
  const variables: { name: string; key: string }[] = [
    { name: 'Order Id', key: '{{order_id}}' },
    { name: 'Replacement Order Id', key: '{{replacement_order_id}}' },
    { name: 'Status', key: '{{status}}' },
    { name: 'Shop Name', key: '{{shop_name}}' },
    { name: 'Shop Logo', key: '{{shop_logo}}' },
    { name: 'Status Message', key: '{{status_message}}' },
  ];
  return (
    <>
      <Card>
        <div>
          <h3 className="text-lg mb-2"> Template Variable</h3>
          <p className="text-gray-600">
            You can use template variables to output a value in your templates.
            The available variables are:
          </p>
        </div>
        {variables.map((v, i) => (
          <div key={i} className="my-3">
            <h3 className=""> {v.name}</h3>
            <p className="text-gray-600">{v.key}</p>
          </div>
        ))}
      </Card>
    </>
  );
};

export const ClaimCancelCustomerVariable = () => {
  const variables: { name: string; key: string }[] = [
    { name: 'Order Id', key: '{{order_id}}' },
    { name: 'Customer Name', key: '{{customer_name}}' },
    { name: 'Cancellation Reason', key: '{{cancellation_reason}}' },
    { name: 'Shop Name', key: '{{shop_name}}' },
    { name: 'Shop Logo', key: '{{shop_logo}}' },
    { name: 'status', key: '{{status}}' },
  ];
  return (
    <>
      <Card>
        <div>
          <h3 className="text-lg mb-2"> Template Variable</h3>
          <p className="text-gray-600">
            You can use template variables to output a value in your templates.
            The available variables are:
          </p>
        </div>
        {variables.map((v, i) => (
          <div key={i} className="my-3">
            <h3 className=""> {v.name}</h3>
            <p className="text-gray-600">{v.key}</p>
          </div>
        ))}
      </Card>
    </>
  );
};
