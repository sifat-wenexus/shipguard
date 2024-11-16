import {ReferenceEntityTemplateSchema} from '@shopify/generate-docs';

const data: ReferenceEntityTemplateSchema = {
  name: 'Admin',
  description:
    'Contains functions for authenticating and interacting with the Admin API.\n\nThis function can handle requests for apps embedded in the Admin, Admin extensions, or non-embedded apps.',
  category: 'Authenticate',
  type: 'object',
  isVisualComponent: false,
  definitions: [
    {
      title: 'authenticate.admin',
      description:
        'Authenticates requests coming from the Shopify admin.\n\nThe shape of the returned object changes depending on the `isEmbeddedApp` config.',
      type: 'AuthenticateAdmin',
    },
  ],
  jsDocTypeExamples: [
    'EmbeddedAdminContext',
    'AdminApiContext',
    'BillingContext',
  ],
  related: [
    {
      name: 'API context',
      subtitle: 'Interact with the Admin API.',
      url: '/docs/api/shopify-app-remix/apis/admin-api',
    },
    {
      name: 'Billing context',
      subtitle: 'Bill merchants for your app using the Admin API.',
      url: '/docs/api/shopify-app-remix/apis/billing',
    },
  ],
};

export default data;
