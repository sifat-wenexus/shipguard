import { onDBEvt, onDBEvtBuffered } from '~/modules/emitter.server';
import { getShopifyGQLClient } from '~/modules/shopify.server';
import { queryProxy } from '~/modules/query/query-proxy';
import type { BadgeSettings } from '#prisma-client';
import type { Session } from '~/shopify-api/lib';
import _ from 'lodash';

async function updateSettings(session: Session, data: BadgeSettings) {
  const gql = getShopifyGQLClient(session);
  let metafields: Record<string, any> = [];

  const settings = await queryProxy.badgeSettings.findFirst(
    {
      where: {
        id: session.storeId,
      },
      include: {
        BadgeImages: {
          select: {
            id: true,
          },
        },
      },
    },
    session
  );

  if (!settings) {
    return;
  }

  const badges = settings.BadgeImages.map((badgeImage) => badgeImage.id);

  if (data.enabled !== undefined) {
    metafields.push({
      key: 'enabled',
      namespace: 'trust_badge',
      type: 'boolean',
      value: data.enabled.toString(),
    });
  }

  if (badges !== undefined) {
    metafields.push({
      key: 'badges',
      namespace: 'trust_badge',
      type: 'single_line_text_field',
      value: badges.toString(),
    });
  }

  const store = await queryProxy.store.findFirst(
    {
      select: {
        appInstallationId: true,
      },
    },
    session
  );

  if (!store) {
    return;
  }

  metafields = metafields.map((metafield) => ({
    ...metafield,
    ownerId: store.appInstallationId,
  }));

  await gql.query<any>({
    data: {
      query: `#graphql
      mutation ($metafields: [MetafieldsSetInput!]!) {
        metafieldsSet(metafields: $metafields) {
          metafields {
            id
          }
        }
      }
      `,
      variables: {
        metafields,
      },
    },
  });
}

onDBEvt(
  'badgeSettings',
  ['create', 'update'],
  async ({ session, newData: data }) => {
    if (!session || !data) {
      return;
    }

    updateSettings(session, data);
  }
);

onDBEvtBuffered(
  'badgeImage',
  ['create', 'update', 'delete'],
  2000,
  async (payloads) => {
    for (const storeId in payloads) {
      const session = _.last(payloads[storeId])?.session;

      if (!session) {
        continue;
      }

      const badgeSettings = await queryProxy.badgeSettings.findFirst(undefined, session);

      if (!badgeSettings) {
        continue;
      }

      updateSettings(session, badgeSettings);
    }
  }
);
