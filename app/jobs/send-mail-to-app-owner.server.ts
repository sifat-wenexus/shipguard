import { prisma } from '~/modules/prisma.server';
import { Job } from '~/modules/job/job';
import { getMailer } from '~/modules/get-mailer.server';

export class SendMailToAppOwnerServer extends Job {
  async execute() {
    if (!this.job.storeId) {
      return 'Store ID not provided';
    }

    const store = await prisma.store.findFirst({
      where: {
        id: this.job.storeId,
      },
    });

    if (!store) {
      return 'Store not found';
    }

    const emailBody = `
<html>
<head>
<style>
   body {
        margin: 0 auto !important;
        padding: 0 !important;
        width: 100% !important;
        background-color: #f0f0f0;
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

</style>
</head>
<body>
<div class="email-container">
  <div class="email-header">
        <img
          src="https://cdn.shopify.com/s/files/1/0900/3221/0212/files/Shipguard-shipping-protection.png?v=1731747621"
          alt="shipping-protection"
          width="220px"
          height="auto"
        />
      </div>
  <p><strong>Store Information:</strong></p>
  <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 100%;">
    <thead>
      <tr style="background-color: #f2f2f2;">
        <th style="text-align: left;">Field</th>
        <th style="text-align: left;">Details</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Domain</strong></td>
        <td>${store.domain}</td>
      </tr>
      <tr>
        <td><strong>Store Name</strong></td>
        <td>${store.name}</td>
      </tr>
      <tr>
        <td><strong>Email</strong></td>
        <td>${store.email || "Not provided"}</td>
      </tr>
      <tr>
        <td><strong>Timezone ID</strong></td>
        <td>${store.timezoneId}</td>
      </tr>
      <tr>
        <td><strong>Currency Code</strong></td>
        <td>${store.currencyCode}</td>
      </tr>
    </tbody>
  </table>

  <p>Best regards,</p>
  <p><strong>Shipguard Team</strong> </p>
  </div>
</body>
</html>
`;


    try {
      const uninstalled = this.job.payload.uninstalled;

      const mailer = await getMailer();
      console.log('Sending mail', { uninstalled });
      await mailer?.sendMail({
        from: `no-reply@${process.env.INTERNAL_MAILER_DOMAIN}`,
        to: 'hello@wenexus.io',
        text: `App ${uninstalled ? 'Uninstall' : 'Installation'} for store: ${
          store.name
        }`,
        subject: `App ${
          uninstalled ? 'Uninstall' : 'Installation'
        } for store: ${store.name}`,
        html: emailBody,
      });
    } catch (e) {
      console.error(e);
    }
  }
}
