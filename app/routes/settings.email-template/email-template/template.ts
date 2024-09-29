import { $Enums } from '#prisma-client';
import { Liquid } from 'liquidjs';
import { prisma } from '~/modules/prisma.server';
abstract class Template<C = any> {
  // abstract variables(context?: C): Promise<Record<string, any>>;
  abstract name: $Enums.EmailTemplateName;

  async render(context?: C): Promise<string> {
    console.log('render', context);
    // const variables = await this.variables(context);
    // console.log('render', variables);
    // Fetch - Parse - Render
    const liquid = await prisma.emailTemplate.findFirst({
      where: { name: this.name },
    });
    if (liquid && context) {
      console.log('liquid', `${liquid.body}`);
      const engine = new Liquid();
      const parse = engine.parse(`${liquid.body}`);
      const res = await engine.render(parse, context);
      return await res;
    }
    return 'Template Not Found!';
  }
}

export class ClaimRequestAdminTemplate extends Template {
  name: $Enums.EmailTemplateName = 'CLAIM_REQUEST_EMAIL_FOR_ADMIN';
}

export class ClaimRequestCustomerTemplate extends Template {
  name: $Enums.EmailTemplateName = 'CLAIM_REQUEST_EMAIL_FOR_CUSTOMER';
}
export class ClaimRefundCustomerTemplate extends Template {
  name: $Enums.EmailTemplateName = 'CLAIM_REFUND_EMAIL_FOR_CUSTOMER';
}
export class ClaimReOrderCustomerTemplate extends Template {
  name: $Enums.EmailTemplateName = 'CLAIM_REORDER_EMAIL_FOR_CUSTOMER';
}
export class ClaimCancelCustomerTemplate extends Template {
  name: $Enums.EmailTemplateName = 'CLAIM_CANCEL_EMAIL_FOR_CUSTOMER';
}
// const claimReqTemplate = new ClaimRequestAdminTemplate();

// claimReqTemplate.render({});
