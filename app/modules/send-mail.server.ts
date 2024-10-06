import { getMailer } from '~/modules/get-mailer.server';
import type { EmailTemplateName } from '#prisma-client';
import { GmailAPI } from '~/modules/gmail-api.server';
import { prisma } from '~/modules/prisma.server';

import type {
  ClaimReOrderCustomerTemplateVariables,
  ClaimRequestCustomerTemplateVariables,
  ClaimCancelCustomerTemplateVariables,
  ClaimRefundCustomerTemplateVariables,
  ClaimRequestAdminTemplateVariables,
} from '~/routes/settings.email-template/email-template/template';

import {
  ClaimRequestCustomerTemplate,
  ClaimReOrderCustomerTemplate,
  ClaimRefundCustomerTemplate,
  ClaimCancelCustomerTemplate,
  ClaimRequestAdminTemplate,
} from '~/routes/settings.email-template/email-template/template';
import { Liquid } from 'liquidjs';

type Variables<T extends EmailTemplateName> =
  T extends 'CLAIM_REQUEST_EMAIL_FOR_ADMIN'
    ? ClaimRequestAdminTemplateVariables
    : T extends 'CLAIM_REQUEST_EMAIL_FOR_CUSTOMER'
    ? ClaimRequestCustomerTemplateVariables
    : T extends 'CLAIM_REFUND_EMAIL_FOR_CUSTOMER'
    ? ClaimRefundCustomerTemplateVariables
    : T extends 'CLAIM_REORDER_EMAIL_FOR_CUSTOMER'
    ? ClaimReOrderCustomerTemplateVariables
    : T extends 'CLAIM_CANCEL_EMAIL_FOR_CUSTOMER'
    ? ClaimCancelCustomerTemplateVariables
    : never;

type SendOptions<T extends EmailTemplateName> =
  T extends 'CLAIM_REQUEST_EMAIL_FOR_ADMIN'
    ? {
        storeId: string;
        template: T;
        to: string;
        variables: Variables<'CLAIM_REQUEST_EMAIL_FOR_ADMIN'>;
        from?: string;
        internal?: boolean;
      }
    : {
        storeId: string;
        template: T;
        to: string;
        variables: Variables<T>;
      };

const templates = {
  CLAIM_REQUEST_EMAIL_FOR_ADMIN: ClaimRequestAdminTemplate,
  CLAIM_REQUEST_EMAIL_FOR_CUSTOMER: ClaimRequestCustomerTemplate,
  CLAIM_REFUND_EMAIL_FOR_CUSTOMER: ClaimRefundCustomerTemplate,
  CLAIM_REORDER_EMAIL_FOR_CUSTOMER: ClaimReOrderCustomerTemplate,
  CLAIM_CANCEL_EMAIL_FOR_CUSTOMER: ClaimCancelCustomerTemplate,
};

export async function sendMail<T extends EmailTemplateName>(
  options: SendOptions<T>
) {
  if ((options as any).internal) {
    const mailer = await getMailer();

    if (!mailer) {
      throw new Error('Internal mailer not configured');
    }

    const template = new templates[options.template]();
    const templateInDB = await prisma.emailTemplate.findFirstOrThrow({
      where: {
        name: options.template,
        storeId: options.storeId,
      },
    });

    template.name = templateInDB.name;
    template.storeId = templateInDB.storeId;
    await mailer.sendMail({
      from: (options as any).from ?? process.env.INTERNAL_MAILER_FROM,
      subject: await new Liquid().parseAndRender(
        templateInDB.subject,
        options.variables as any
      ),
      html: await template.render(options.variables as any),
      to: options.to,
    });

    return;
  }

  const settings = await prisma.smtpSetting.findFirst({
    where: {
      id: options.storeId,
    },
  });

  if (!settings) {
    throw new Error('SMTP settings not configured');
  }

  const template = new templates[options.template]();
  const templateInDB = await prisma.emailTemplate.findFirstOrThrow({
    where: {
      name: options.template,
      storeId: options.storeId,
    },
  });

  template.name = templateInDB.name;
  template.storeId = templateInDB.storeId;
  if (settings.provider === 'google') {
    const gmail = new GmailAPI(options.storeId);
    await gmail.sendEmail({
      to: options.to,
      subject: templateInDB.subject,
      body: await template.render(options.variables as any),
    });

    return;
  }

  const mailer = await getMailer(options.storeId);

  if (!mailer) {
    throw new Error('SMTP settings not configured');
  }

  await mailer.sendMail({
    from: settings.from!,
    subject: await new Liquid().parseAndRender(
      templateInDB.subject,
      options.variables as any
    ),
    html: await template.render(options.variables as any),
    to: options.to,
  });
}
