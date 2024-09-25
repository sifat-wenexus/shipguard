import type { LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/react';
import { shopify as shopifyRemix } from '../modules/shopify.server';
import { prisma } from '../modules/prisma.server';
import { getConfig } from '~/modules/get-config.server';
import { makeAlphaNumeric } from '~/modules/utils/alpha-numeric-string';

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const ctx = await shopifyRemix.authenticate.admin(request);

    const restAdminApi = await ctx.admin.rest.resources;
    let ebbedBlock = false;
    let claimPage = false;
    let appExtensionId: string = '';
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

    try {
      const asset = await restAdminApi.Asset.all({
        session: ctx.session,
        theme_id: theme?.id,
        asset: { key: 'config/settings_data.json' },
      });
      if (!asset.data[0].value) {
        return json({
          theme,
          store,
          ebbedBlock,
          install: install?.enabled,
          claimPage,
          appExtensionId,
        });
      }

      const blocks = await JSON.parse(asset.data[0].value).current.blocks;
      for (const block in blocks) {
        if (typeof blocks[block] === 'object') {
          if (
            blocks[block].type.includes(`${appName}/blocks/package-protection`)
          ) {
            ebbedBlock = !blocks[block].disabled;
            const splitUrl = blocks[block].type.split('/');
            appExtensionId = splitUrl[splitUrl.length - 1];
          }
        }
      }
      const template = await restAdminApi.Asset.all({
        session: ctx.session,
        theme_id: theme?.id,
        // asset: { key: 'templates/page.claim-request.json' },
      });
      if (
        template.data.find((t) => t.key === 'templates/page.claim-request.json')
      ) {
        claimPage = true;
        return json({
          theme,
          store,
          ebbedBlock,
          install: install?.enabled,
          claimPage,
          appExtensionId,
        });
      }

      return json({
        theme,
        store,
        ebbedBlock,
        install: install?.enabled,
        claimPage,
        appExtensionId,
      });
    } catch (err) {
      console.error(err);
      return json({
        theme,
        store,
        ebbedBlock,
        install: install?.enabled,
        claimPage,
        appExtensionId,
      });
    }
  } catch (err) {
    console.error('error in loader', err);
    return json({ error: 'Error in loader', success: false });
  }
}
