export const reqAdminTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Title</title>
    <style>
      body {
        max-width: 600px;
        margin: 10px auto !important;
      }
      p {
        line-height: 25px;
      }
      td {
        padding: 0px 10px;
      }
      .claim-button {
        text-decoration: none;
        border: 1px solid green;
        background-color: green;
        padding: 10px 20px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
      }
    </style>
  </head>
  <body style="">
    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 80px 0px;
      "
    >
      <img
        src="https://cdn.shopify.com/s/files/1/0900/3221/0212/files/Inhouse-Shipping-Protection_4a82e447-3fb5-48d1-b85e-7f46ab866e4a.png?v=1727505148"
        alt="inhouse-shipping-protection"
        width="220px"
        height="auto"
      />
    </div>
    <p>Dear <b>{{shop_name}}</b>,</p>
    <p>A new claim has been requested for the following order:</p>
    <table
      style="border-collapse: collapse; width: 100.035%; height: 144.574px"
      border="1"
    >
      <colgroup>
        <col style="width: 49.9079%" />
        <col style="width: 49.9079%" />
      </colgroup>
      <tbody>
        <tr style="height: 36.1648px">
          <td>Order Id</td>
          <td><strong>{{order_id}}</strong></td>
        </tr>
        <tr style="height: 36.0795px">
          <td>Customer Name</td>
          <td><strong>{{customer_name}}</strong></td>
        </tr>
        <tr style="height: 36.1648px">
          <td>Claim Reason</td>
          <td><strong>{{claim_reason}}</strong></td>
        </tr>
        <tr style="height: 36.1648px">
          <td>Claim Date:</td>
          <td><strong>{{claim_date}}</strong></td>
        </tr>
      </tbody>
    </table>
    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px 0px;
      "
    >
      <a class="claim-button" href="{{order_url}}">View Claim</a>
    </div>
    <p>Please review the claim request and take appropriate action.</p>
    <br />
    <p>
      Best regards,<br />
      <strong>Inhouse Shipping Protection</strong> <strong>Team</strong>
    </p>
    <p>&nbsp;</p>
  </body>
</html>
`;
export const reqCustomerTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email Title</title>
  <style>
  body{
  max-width:600px;
  margin:10px auto !important;
}
p{

    line-height: 25px;
}
  td{
padding:0px 10px}
  </style>
</head>
<body>
  <div style="display:flex; justify-content:center;align-items:center; margin:50px 0px;">
 {%if shop_logo%}
   <img src="{{shop_logo}}" alt="{{shop_name}}" width="220px" height="auto">
    {%else%}
    <h2>{{shop_name}}</h2>
   {%endif%}
  </div>
  <p>Dear <b>{{customer_name}}</b>,</p>
<p>We have received your claim request for Order {order_id}. Our team will review your claim and get back to you within 24hours.</p>
<table style="border-collapse: collapse; width: 100.035%; height: 144.574px;" border="1"><colgroup><col style="width: 49.9079%;"><col style="width: 49.9079%;"></colgroup>
<tbody>
<tr style="height: 36.1648px;">
<td>Order ID</td>
<td><strong>{{order_id}}</strong></td>
</tr>
<tr style="height: 36.1648px;">
<td>Claim Reason</td>
<td><strong>{{claim_reason}}</strong></td>
</tr>
<tr style="height: 36.1648px;">
<td>Claim Date</td>
<td><strong>{{claim_date}}</strong></td>
</tr>
</tbody>
</table>
<p>If you have any questions, feel free to contact us.</p>
<p>Best regards,<br><strong>{{shop_name}}</strong></p>
<p>&nbsp;</p></body>
</html>
`;
export const refundCustomerTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email Title</title>
 <style>
      body {
        max-width: 600px;
        margin: 10px auto !important;
      }
      p {
        line-height: 25px;
      }
      td {
        padding: 0px 10px;
      }

    </style>
</head>
<body>
 <div style="display:flex; justify-content:center;align-items:center; margin:50px 0px;">
 {%if shop_logo%}
   <img src="{{shop_logo}}" alt="{{shop_name}}" width="220px" height="auto">
    {%else%}
    <h2>{{shop_name}}</h2>
   {%endif%}
  </div>

<p>Dear <b>{{customer_name}}</b>,</p>
<p>Your claim for Order {{order_id}} has been approved, and a refund of {{refund_amount}} has been processed. The refund will appear in your account within 24hours.</p>
<table style="border-collapse: collapse; width: 100.035%; height: 144.574px;" border="1"><colgroup><col style="width: 49.9079%;"><col style="width: 49.9079%;"></colgroup>
<tbody>
<tr style="height: 36.1648px;">
<td>Order Id</td>
<td><strong>{{order_id}}</strong></td>
</tr>
<tr style="height: 36.1648px;">
<td>Refund Amount</td>
<td><strong>{{refund_amount}}</strong></td>
</tr>
<tr style="height: 36.1648px;">
<td>Refund Processed On</td>
<td><strong>{{date}}</strong></td>
</tr>
</tbody>
</table>
<p>If you have any questions, feel free to contact us.</p>
<p>Best regards,<br><strong>{{shop_name}}</strong></p>
<p>&nbsp;</p></body>
</html>`;
export const reOrderCustomerTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email Title</title>
 <style>
      body {
        max-width: 600px;
        margin: 10px auto !important;
      }
      p {
        line-height: 25px;
      }
      td {
        padding: 0px 10px;
      }

    </style>
</head>
<body>

 <div style="display:flex; justify-content:center;align-items:center; margin:50px 0px;">
 {%if shop_logo%}
   <img src="{{shop_logo}}" alt="{{shop_name}}" width="220px" height="auto">
    {%else%}
    <h2>{{shop_name}}</h2>
   {%endif%}
  </div>
  <p>Dear <b>{{customer_name}}</b>,</p>
<p>Your claim for Order {{order_id}} has been approved, and we have initiated a replacement order. You can expect your new shipment soon.</p>
<table style="border-collapse: collapse; width: 100.035%; height: 144.574px;" border="1"><colgroup><col style="width: 49.9079%;"><col style="width: 49.9079%;"></colgroup>
<tbody>
<tr style="height: 36.1648px;">
<td>Order Id</td>
<td><strong>{{order_id}}</strong></td>
</tr>
<tr style="height: 36.1648px;">
<td>Replacement Order ID</td>
<td><strong>{{replacement_order_id}}</strong></td>
</tr>
<tr style="height: 36.1648px;">
<td>Shipping Details</td>
<td><strong>{{shipping_details}}</strong></td>
</tr>
</tbody>
</table>
<p>Thank you for your continued support.</p>
<p>Best regards,<br><strong>{{shop_name}}</strong></p>
<p>&nbsp;</p></body>
</html>`;
export const cancelCustomerTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email Title</title>
  <style>
      body {
        max-width: 600px;
        margin: 10px auto !important;
      }
      p {
        line-height: 25px;
      }
      td {
        padding: 0px 10px;
      }

    </style>
</head>
<body>
   <div style="display:flex; justify-content:center;align-items:center; margin:50px 0px;">
 {%if shop_logo%}
   <img src="{{shop_logo}}" alt="{{shop_name}}" width="220px" height="auto">
    {%else%}
    <h2>{{shop_name}}</h2>
   {%endif%}
  </div>
  <p>Dear <b>{{customer_name}}</b>,</p>
<p>Your claim request for Order {{order_id}} has been canceled. If you have any questions or believe this was done in error, please reach out to our support team.</p>
<table style="border-collapse: collapse; width: 100.035%; height: 144.574px;" border="1"><colgroup><col style="width: 49.9079%;"><col style="width: 49.9079%;"></colgroup>
<tbody>
<tr style="height: 36.1648px;">
<td>Order Id</td>
<td><strong>{{order_id}}</strong></td>
</tr>
<tr style="height: 36.1648px;">
<td>Cancellation Reason</td>
<td><strong>{{cancellation_reason}}</strong></td>
</tr>
</tbody>
</table>
<p>Thank you for your understanding.</p>
<p>Best regards,<br><strong>{{shop_name}}</strong></p>
<p>&nbsp;</p></body>
</html>`;
