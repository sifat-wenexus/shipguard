import { getThemeFileContent, getThemeFileInfo } from '~/modules/get-theme-file-content';
import { makeAlphaNumeric } from '~/modules/utils/alpha-numeric-string';
import { shopify as shopifyRemix } from '../modules/shopify.server';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { getConfig } from '~/modules/get-config.server';
import { prisma } from '~/modules/prisma.server';
import { json } from '@remix-run/react';

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const ctx = await shopifyRemix.authenticate.admin(request);

    const restAdminApi = await ctx.admin.rest.resources;
    let ebbedBlock = false;
    let claimPage = false;

    const install = await prisma.packageProtection.findFirst({
      where: { storeId: ctx.session.storeId },
      select: { enabled: true },
    });

    const theme = await restAdminApi.Theme.all({
      session: ctx.session,
    })
      .then((r) => r.data.find((item) => item.role === 'main'))
      .catch((err) => console.error(err));

    const store = await restAdminApi.Shop.all({
      session: ctx.session,
    })
      .then((r) => r.data[0])
      .catch((err) => console.error(err));

    const appName = makeAlphaNumeric(getConfig().name);
    console.log(`App Name: ${appName}`);
    try {
      const content = await getThemeFileContent(
        'config/settings_data.json',
        ctx.session
      );

      if (!content) {
        return json({
          theme,
          store,
          ebbedBlock,
          install: install?.enabled,
          claimPage,
          appExtensionId: process.env.SHOPIFY_IHSP_THEME_ID,
        });
      }

      const templateInfo = await getThemeFileInfo(
        'templates/page.claim-request.json',
        ctx.session
      );

      if (templateInfo) {
        claimPage = true;
        return json({
          theme,
          store,
          ebbedBlock,
          install: install?.enabled,
          claimPage,
          appExtensionId: process.env.SHOPIFY_IHSP_THEME_ID,
        });
      }

      return json({
        theme,
        store,
        ebbedBlock,
        install: install?.enabled,
        claimPage,
        appExtensionId: process.env.SHOPIFY_IHSP_THEME_ID,
      });
    } catch (err) {
      console.error(err);
      return json({
        theme,
        store,
        ebbedBlock,
        install: install?.enabled,
        claimPage,
        appExtensionId: process.env.SHOPIFY_IHSP_THEME_ID,
      });
    }
  } catch (err) {
    console.error('error in loader', err);
    return json({ error: 'Error in loader', success: false });
  }
}

// abstract class Template<C = any> {
//   abstract variables(context?: C): Promise<Record<string, any>>;
//   abstract id: string;

//   async render(context?: C): Promise<string> {
//     const variables = await this.variables(context);

//     // Fetch - Parse - Render

//     return '';
//   }
// }

// class ClaimRequestTemplate extends Template<Record<string, any>> {
//   id = 'claim-request';

//   async variables(orderId?: Record<string, any>): Promise<Record<string, any>> {
//     return {};
//   }
// }

// const claimReqTemplate = new ClaimRequestTemplate();

// claimReqTemplate.render({});
