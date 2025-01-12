import { makeAlphaNumeric } from '~/modules/utils/alpha-numeric-string';
import { shopify as shopifyRemix } from '../modules/shopify.server';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { getConfig } from '~/modules/get-config.server';
import { prisma } from '~/modules/prisma.server';
import { json } from '@remix-run/react';
import {
  getThemeFileContent,
  getThemeFileInfo,
  getThemeInfo,
} from '~/modules/get-theme-file-content';
import { fixJsonString } from '~/utils/removeCommentFromJosn';
import { queryProxy } from '~/modules/query/query-proxy';

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const ctx = await shopifyRemix.authenticate.admin(request);

    let ebbedBlock = false;
    let claimPage = false;
    let ThemeId = '';
    let shopName = '';
    let smtp: string | boolean = false;
    try {
      const install = await prisma.packageProtection.findFirst({
        where: { storeId: ctx.session.storeId },
        select: { enabled: true },
      });

      const appName = makeAlphaNumeric(getConfig().name);
      console.log(`App Name: ${appName}`);
      const content = await getThemeFileContent(
        'config/settings_data.json',
        ctx.session
      );

      if (content) {
        try {
          const validJson = fixJsonString(JSON.stringify(content));
          const blocks = JSON.parse(validJson)?.current?.blocks;
          for (const block in blocks) {
            if (typeof blocks[block] === 'object') {
              if (
                blocks[block].type.includes(
                  `${process.env.SHOPIFY_OSP_THEME_ID}`
                )
              ) {
                ebbedBlock = !blocks[block].disabled;
              }
            }
          }
        } catch (error) {
          console.error('Failed to fix JSON:', error);
        }
      }
      const theme = await getThemeInfo(ctx.session);
      if (theme) {
        ThemeId = theme.id.replace('gid://shopify/OnlineStoreTheme/', '');
      }
      const store = await queryProxy.store.findFirst({where:{id: ctx.session.storeId}});
      if (store) {
        shopName = store.domain.split('.')[0];
      }

      const templateInfo = await getThemeFileInfo(
        'templates/page.claim-request.json',
        ctx.session
      );

      if (templateInfo) {
        claimPage = true;
      }
      const smtpSetting = await prisma.smtpSetting.findFirst({
        where: { id: ctx.session.storeId },
      });
      if (smtpSetting) {
        smtp = smtpSetting.provider ?? false;
      }

      return json({
        smtp,
        ThemeId,
        shopName,
        ebbedBlock,
        install: install?.enabled,
        claimPage,
        storeId: ctx.session.storeId,
        appExtensionId: process.env.SHOPIFY_OSP_THEME_ID,
      });
    } catch (err) {
      console.error(err);
      return json({
        smtp,
        ThemeId,
        shopName,
        ebbedBlock,
        install: false,
        claimPage,
        storeId: ctx.session.storeId,
        appExtensionId: process.env.SHOPIFY_OSP_THEME_ID,
      });
    }
  } catch (err) {
    console.error('error in loader', err);
    return json({ error: 'Error in loader', success: false });
  }
}
