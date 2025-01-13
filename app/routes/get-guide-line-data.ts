import type { LoaderFunctionArgs, TypedResponse } from '@remix-run/node';
import { makeAlphaNumeric } from '~/modules/utils/alpha-numeric-string';
import { shopify as shopifyRemix } from '../modules/shopify.server';
import { fixJsonString } from '~/utils/removeCommentFromJosn';
import { queryProxy } from '~/modules/query/query-proxy';
import { getConfig } from '~/modules/get-config.server';
import { prisma } from '~/modules/prisma.server';
import { json } from '@remix-run/react';
import {
  getThemeFileContent,
  getThemeFileInfo,
  getThemeInfo,
} from '~/modules/get-theme-file-content';

export interface IGuideLineResponse {
  embedBlock: boolean;
  claimPage: boolean;
  themeId: string;
  shopName: string;
  smtp: boolean;
  install: boolean;
  appExtensionId: string | undefined;
}

interface IErrorResponse {
  error: string;
  success: boolean;
}

export async function loader({
  request,
}: LoaderFunctionArgs): Promise<
  TypedResponse<IGuideLineResponse | IErrorResponse>
> {
  try {
    const ctx = await shopifyRemix.authenticate.admin(request);
    const response: IGuideLineResponse = {
      embedBlock: false,
      claimPage: false,
      themeId: '',
      shopName: '',
      smtp: false,
      install: false,
      appExtensionId: process.env.SHOPIFY_OSP_THEME_ID,
    };
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
                response.embedBlock = !blocks[block].disabled;
                // ebbedBlock = !blocks[block].disabled;
              }
            }
          }
        } catch (error) {
          console.error('Failed to fix JSON:', error);
        }
      }
      const theme = await getThemeInfo(ctx.session);
      if (theme) {
        response.themeId = theme.id.replace(
          'gid://shopify/OnlineStoreTheme/',
          ''
        );
        // ThemeId = theme.id.replace('gid://shopify/OnlineStoreTheme/', '');
      }
      const store = await queryProxy.store.findFirst({
        where: { id: ctx.session.storeId },
      });
      if (store) {
        response.shopName = store.domain.split('.')[0];
        // shopName = store.domain.split('.')[0];
      }

      const templateInfo = await getThemeFileInfo(
        'templates/page.claim-request.json',
        ctx.session
      );

      if (templateInfo) {
        response.claimPage = true;
        // claimPage = true;
      }
      const smtpSetting = await prisma.smtpSetting.findFirst({
        where: { id: ctx.session.storeId },
      });
      if (smtpSetting) {
        response.smtp = !!smtpSetting.provider;
        // smtp = !!smtpSetting.provider;
      }

      return json({ ...response, install: install?.enabled ?? false });
    } catch (err) {
      console.error(err);
      return json(response);
    }
  } catch (err) {
    console.error('error in loader', err);
    return json({ error: 'Error in loader', success: false });
  }
}
