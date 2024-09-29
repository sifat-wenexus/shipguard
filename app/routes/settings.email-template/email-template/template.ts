abstract class Template<C = any> {
  abstract variables(context?: C): Promise<Record<string, any>>;
  abstract id: string;

  async render(context?: C): Promise<string> {
    const variables = await this.variables(context);

    // Fetch - Parse - Render

    return '';
  }
}

class ClaimRequestTemplate extends Template<Record<string, any>> {
  id = 'claim-request';

  async variables(orderId?: Record<string, any>): Promise<Record<string, any>> {
    return {};
  }
}

const claimReqTemplate = new ClaimRequestTemplate();

claimReqTemplate.render({});
