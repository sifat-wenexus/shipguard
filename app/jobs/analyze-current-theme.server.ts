import { findOfflineSessionByStoreId } from '~/modules/find-offline-session.server';
import { Job } from '~/modules/job/job';

import {
  getThemeFileContent,
  getThemeInfo,
} from '~/modules/get-theme-file-content';
import { queryProxy } from '~/modules/query/query-proxy';
import { prisma } from '~/modules/prisma.server';

export class AnalyzeCurrentTheme extends Job {
  steps = ['execute'];

  async execute() {
    // const session = await findOfflineSessionByStoreId(this.job.storeId!);
    //
    // if (!session) {
    //   return this.cancelExecution('No session found');
    // }
    //
    // const themeInfo = await getThemeInfo(session);
    // const settingsContent = await getThemeFileContent(
    //   'config/settings_schema.json',
    //   session
    // );
    //
    // if (themeInfo.themeStoreId) {
    //   const theme = await prisma.theme.findFirst({
    //     where: {
    //       themeStoreId: Number(themeInfo.themeStoreId),
    //     },
    //   });
    //
    //   if (!theme) {
    //     return this.cancelExecution(`Unsupported theme: ${themeInfo.themeStoreId}`);
    //   }
    //
    //
    // }
    //
    //
    // if (!settingsContent) {
    //   return this.cancelExecution('Could not get layout/settings_schema.json');
    // }
    //
    // if (themeInfo.themeStoreId) {
    //   const theme = await prisma.theme.findFirst({
    //     where: {
    //       themeStoreId: Number(themeInfo.themeStoreId),
    //     },
    //   });
    //
    //   if (!theme) {
    //     return this.cancelExecution(`Theme not found: ${themeInfo.themeStoreId}`);
    //   }
    //
    //   return queryProxy.store.update({
    //     data: {
    //       themeId: theme.id,
    //       themeVersion: themeInfo.themeVersion,
    //     },
    //   });
    // }
    //
    // const fileContent = await getThemeFileContent(
    //   'config/settings_schema.json',
    //   session
    // );
    //
    // if (!fileContent) {
    //   return this.cancelExecution('Could not get layout/settings_schema.json');
    // }
    //
    // const settingsSchema: any[] = JSON.parse(fileContent);
    //
    // const themeInfoBlock = settingsSchema.find(i => i.name === 'theme_info');
    //
    // if (!themeInfoBlock) {
    //   return this.cancelExecution('Could not find theme_info block');
    // }
    //
    // const theme = await prisma.theme.findFirst({
    //   where: {
    //     name: themeInfoBlock.theme_name,
    //   },
    // });
    //
    // if (!theme) {
    //   return this.cancelExecution(`Theme not found: ${themeInfoBlock.theme_name}`);
    // }
    //
    // return queryProxy.store.update({
    //   data: {
    //     themeId: theme.id,
    //   },
    // });
  }
}
