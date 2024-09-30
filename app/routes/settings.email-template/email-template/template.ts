import { $Enums } from '#prisma-client';
import { Liquid } from 'liquidjs';
import { prisma } from '~/modules/prisma.server';
abstract class Template<C = any> {
  // abstract variables(context?: C): Promise<Record<string, any>>;
  abstract name: $Enums.EmailTemplateName;
  abstract liquid: string;

  async render(context?: C): Promise<string> {
    // const variables = await this.variables(context);
    // console.log('render', this.liquid);
    // Fetch - Parse - Render
    const engine = new Liquid();
    if (this.liquid) {
      const parse = engine.parse(`${this.liquid}`);
      const res = await engine.render(parse, context!);
      return await res;
    }
    const liquidFromDb = await prisma.emailTemplate.findFirst({
      where: { name: this.name },
    });
    if (liquidFromDb && context) {
      const parse = engine.parse(`${liquidFromDb.body}`);
      const res = await engine.render(parse, context);
      return await res;
    }
    return 'Template Not Found!';
  }
}

export class ClaimRequestAdminTemplate extends Template {
  name: $Enums.EmailTemplateName = 'CLAIM_REQUEST_EMAIL_FOR_ADMIN';
  liquid = '';
}

export class ClaimRequestCustomerTemplate extends Template {
  name: $Enums.EmailTemplateName = 'CLAIM_REQUEST_EMAIL_FOR_CUSTOMER';
  liquid = '';
}
export class ClaimRefundCustomerTemplate extends Template {
  name: $Enums.EmailTemplateName = 'CLAIM_REFUND_EMAIL_FOR_CUSTOMER';
  liquid = '';
}
export class ClaimReOrderCustomerTemplate extends Template {
  name: $Enums.EmailTemplateName = 'CLAIM_REORDER_EMAIL_FOR_CUSTOMER';
  liquid = '';
}
export class ClaimCancelCustomerTemplate extends Template {
  name: $Enums.EmailTemplateName = 'CLAIM_CANCEL_EMAIL_FOR_CUSTOMER';
  liquid = '';
}
// const claimReqTemplate = new ClaimRequestAdminTemplate();

// claimReqTemplate.render({});
