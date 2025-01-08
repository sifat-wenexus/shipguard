export const reqAdminTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Title</title>
    <style>
      body {
        margin: 0 auto !important;
        padding: 0 !important;
        width: 100% !important;
        background-color: #f0f0f0;
      }

      p {
        line-height: 25px;
        font-size: 16px;
        color: #333;
      }

      td {
        padding: 10px;
        font-size: 16px;
        border: 1px solid #ddd;
      }

      .email-container {
        max-width: 600px;
        margin: 40px auto;
        padding: 20px;
        background-color: white;
      }

      .email-header {
        text-align: center;
        margin-bottom: 40px;
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

      table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
      }

      a {
        color: #3498db;
        text-decoration: none;
      }

      /* Responsive Design */
      @media only screen and (max-width: 600px) {
        .email-container {
          padding: 15px;
        }
        .claim-button {
          padding: 8px 15px;
        }
        td {
          font-size: 14px;
        }
      }
    </style>
  </head>
  <body>
    <!-- Email Container -->
    <div class="email-container">
      <!-- Logo Section -->
      <div class="email-header">
        <img
          src="https://cdn.shopify.com/s/files/1/0900/3221/0212/files/Shipguard-shipping-protection.png?v=1731747621"
          alt="shipping-protection"
          width="220px"
          height="auto"
        />
      </div>

      <!-- Email Body -->
      <p>Dear <b>{{shop_name}}</b>,</p>
      <p>A new claim has been requested for the following order:</p>

      <!-- Order Details Table -->
      <table>
        <tbody>
          <tr>
            <td>Order Id</td>
            <td>
              <strong><a href="{{order_url}}" target="_blank">{{order_id}}</a></strong>
            </td>
          </tr>
          <tr>
            <td>Customer Name</td>
            <td><strong>{{customer_name}}</strong></td>
          </tr>
           <tr>
            <td>Issue</td>
            <td><strong>{{issue}}</strong></td>
          </tr>
           <tr>
            <td>Request Regulation</td>
            <td><strong>{{request_regulation}}</strong></td>
          </tr>
          <tr>
            <td>Claim Reason</td>
            <td><strong>{{claim_reason}}</strong></td>
          </tr>
          <tr>
            <td>Claim Date</td>
            <td><strong>{{claim_date}}</strong></td>
          </tr>
        </tbody>
      </table>

      <!-- Claim Button -->
      <div style="text-align: center;">
        <a class="claim-button" href="{{go_to_claim}}" style="color:white;" target="_blank">View Claim</a>
      </div>

      <!-- Footer -->
      <p>Please review the claim request and take appropriate action.</p>
      <br />
      <p>
        Best regards,<br />
        <strong>ShipGuard: Shipping Protection Team</strong>
      </p>
    </div> <!-- End of Email Container. -->
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
    html, body {
      margin: 0 auto !important;
      padding: 0 !important;
      width: 100% !important;
      background-color: #f0f0f0; /* Light gray background */
    }

    p {
      line-height: 25px;
      font-size: 16px;
    }

    td {
      padding: 10px;
      font-size: 16px;
    }

    .email-container {
      max-width: 600px;
      margin: 40px auto;
      padding: 20px;
      background-color: white;
    }

    .email-header {
      text-align: center;
      margin-bottom: 40px;
    }

    table {
      border-collapse: collapse;
      width: 100%;
    }

    table, td {
      border: 1px solid #ddd;
    }

    a {
      color: #3498db;
      text-decoration: none;
    }
  </style>
</head>
<body>

  <!-- Email Container -->
  <div class="email-container">

    <!-- Logo or Shop Name -->
    <div class="email-header">
      {%if shop_logo%}
        <img src="{{shop_logo}}" alt="{{shop_name}}" width="200px" height="auto">
      {%else%}
        <h2>{{shop_name}}</h2>
      {%endif%}
    </div>

    <!-- Email Content -->
    <p>Dear <b>{{customer_name}}</b>,</p>
    <p>We have received your claim request for Order <strong>{{order_id}}</strong>. Our team will review your claim and get back to you within 24 hours.</p>

    <!-- Order Details Table -->
    <table>
      <tbody>
        <tr>
          <td>Order ID</td>
          <td><strong>{{order_id}}</strong></td>
        </tr>
        <tr>
          <td>Claim Reason</td>
          <td><strong>{{claim_reason}}</strong></td>
        </tr>
        <tr>
          <td>Claim Date</td>
          <td><strong>{{claim_date}}</strong></td>
        </tr>
      </tbody>
    </table>

    <!-- Closing -->
    <p>If you have any questions, feel free to contact us.</p>
    <p>Best regards,<br><strong>{{shop_name}}</strong></p>

  </div> <!-- End of Email Container -->

</body>
</html>

`;
export const refundCustomerTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email Title</title>
  <style>
    html, body {
      margin: 0 auto !important;
      padding: 0 !important;
      width: 100% !important;
      background-color: #f0f0f0; /* Light gray background */
    }

    p {
      line-height: 25px;
      font-size: 16px;
    }

    td {
      padding: 10px;
      font-size: 16px;
    }

    .email-container {
      max-width: 600px;
      margin: 40px auto;
      padding: 20px;
      background-color: white;
    }

    .email-header {
      text-align: center;
      margin-bottom: 40px;
    }

    table {
      border-collapse: collapse;
      width: 100%;
    }

    table, td {
      border: 1px solid #ddd;
    }

    a {
      color: #3498db;
      text-decoration: none;
    }
  </style>
</head>
<body>

  <!-- Email Container -->
  <div class="email-container">

    <!-- Logo or Shop Name -->
    <div class="email-header">
      {%if shop_logo%}
        <img src="{{shop_logo}}" alt="{{shop_name}}" width="200px" height="auto">
      {%else%}
        <h2>{{shop_name}}</h2>
      {%endif%}
    </div>

    <!-- Email Content -->
    <p>Dear <b>{{customer_name}}</b>,</p>
    <p>Your claim for Order <strong>{{order_id}}</strong> has been approved, and a refund of <strong>{{currency}} {{refund_amount}}</strong> has been processed. The refund will appear in your account within 24 hours.</p>

    <!-- Order Details Table -->
    <table>
      <tbody>
        <tr>
          <td>Order Id</td>
          <td><strong>{{order_id}}</strong></td>
        </tr>
        <tr>
          <td>Refund Amount</td>
          <td><strong>{{currency}} {{refund_amount}}</strong></td>
        </tr>
        {%if status == 'APPROVE'%}
          <tr>
          <td>Status</td>
          <td><strong>{{status}}</strong></td>
        </tr>
          {%endif%}
        {%if status_message and status == 'APPROVE'%}
          <tr>
          <td>Approve Message</td>
          <td><strong>{{status_message}}</strong></td>
        </tr>
          {%endif%}
        <tr>
          <td>Refund Processed On</td>
          <td><strong>{{date}}</strong></td>
        </tr>
      </tbody>
    </table>

    <!-- Closing -->
    <p>If you have any questions, feel free to contact us.</p>
    <p>Best regards,<br><strong>{{shop_name}}</strong></p>

  </div> <!-- End of Email Container -->

</body>
</html>

`;
export const reOrderCustomerTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email Title</title>
  <style>
    html, body {
      margin: 0 auto !important;
      padding: 0 !important;
      width: 100% !important;
      background-color: #f0f0f0; /* Light gray background */
    }

    p {
      line-height: 25px;
      font-size: 16px;
    }

    td {
      padding: 10px;
      font-size: 16px;
    }

    .email-container {
      max-width: 600px;
      margin: 40px auto;
      padding: 20px;
      background-color: white;
    }

    .email-header {
      text-align: center;
      margin-bottom: 40px;
    }

    table {
      border-collapse: collapse;
      width: 100%;
    }

    table, td {
      border: 1px solid #ddd;
    }

    a {
      color: #3498db;
      text-decoration: none;
    }
  </style>
</head>
<body>

  <!-- Email Container -->
  <div class="email-container">

    <!-- Logo or Shop Name -->
    <div class="email-header">
      {%if shop_logo%}
        <img src="{{shop_logo}}" alt="{{shop_name}}" width="200px" height="auto">
      {%else%}
        <h2>{{shop_name}}</h2>
      {%endif%}
    </div>

    <!-- Email Content -->
    <p>Dear <b>{{customer_name}}</b>,</p>
    <p>Your claim for Order <strong>{{order_id}}</strong> has been approved, and we have initiated a replacement order. You can expect your new shipment soon.</p>

    <!-- Order Details Table -->
    <table>
      <tbody>
        <tr>
          <td>Order Id</td>
          <td><strong>{{order_id}}</strong></td>
        </tr>
        <tr>
          <td>Replacement Order ID</td>
          <td><strong>{{replacement_order_id}}</strong></td>
        </tr>
        <tr>
          <td>Status</td>
          <td><strong>{{status}}</strong></td>
        </tr>
        {%if status_message and status == 'APPROVE'%}
          <tr>
          <td>Message</td>
          <td><strong>{{status_message}}</strong></td>
        </tr>
          {%endif%}

      </tbody>
    </table>

    <!-- Closing -->
    <p>Thank you for your continued support.</p>
    <p>Best regards,<br><strong>{{shop_name}}</strong></p>

  </div> <!-- End of Email Container -->

</body>
</html>
`;
export const cancelCustomerTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email Title</title>
  <style>
     html,
     body {
        margin: 0 auto !important;
        padding: 0 !important;
        width: 100% !important;
        background-color: #f0f0f0; /* Light gray background */
      }

      p {
        line-height: 25px;
        font-size: 16px;
      }

      td {
        padding: 10px;
        font-size: 16px;
      }

      .email-container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: white;
      }
  </style>
</head>
<body>

  <!-- Email Container -->
  <div class="email-container" style="max-width: 600px; margin: 40px auto; padding: 20px; background-color: white;">

    <!-- Logo or Shop Name -->
    <div style="text-align: center; margin-bottom: 40px;">
      {%if shop_logo%}
        <img src="{{shop_logo}}" alt="{{shop_name}}" width="200px" height="auto">
      {%else%}
        <h2>{{shop_name}}</h2>
      {%endif%}
    </div>

    <!-- Email Greeting and Content -->
    <p>Dear <b>{{customer_name}}</b>,</p>
    <p>Your claim request for Order <strong>{{order_id}}</strong> has been canceled. If you have any questions or believe this was done in error, please reach out to our support team.</p>

    <!-- Order Details Table -->
    <table style="border-collapse: collapse; width: 100%;" border="1">
      <colgroup>
        <col style="width: 50%;">
        <col style="width: 50%;">
      </colgroup>
      <tbody>
        <tr>
          <td>Order Id</td>
          <td><strong>{{order_id}}</strong></td>
        </tr>
        <tr>
          <td>Status</td>
          <td><strong>{{status}}</strong></td>
        </tr>
        <tr>
          <td>Cancellation Reason</td>
          <td><strong>{{cancellation_reason}}</strong></td>
        </tr>
      </tbody>
    </table>

    <!-- Closing -->
    <p>Thank you for your understanding.</p>
    <p>Best regards,<br><strong>{{shop_name}}</strong></p>

  </div> <!-- End of Email Container -->

</body>
</html>



`;
