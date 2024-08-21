import { getShopifyGQLClient } from '~/modules/shopify.server';
import { onDBEvtBuffered } from '~/modules/emitter.server';
import { queryProxy } from '~/modules/query/query-proxy';
import _ from 'lodash';

onDBEvtBuffered(
  'scrollToTopSettings',
  ['create', 'update'],
  2000,
  async (payloads) => {
    for (const storeId in payloads) {
      const payload = _.last(payloads[storeId]);
      const data = payload?.newData ?? payload?.oldData;
      const session = payload?.session;

      if (!data || !session) {
        continue;
      }
      const gql = getShopifyGQLClient(session);

      let metafields: Record<string, any> = [];

      if (data.enabled !== undefined) {
        metafields.push({
          key: 'enabled',
          namespace: 'scroll_to_top',
          type: 'boolean',
          value: data.enabled.toString(),
        });
      }

      if (data.icon !== undefined) {
        metafields.push({
          key: 'icon',
          namespace: 'scroll_to_top',
          type: 'single_line_text_field',
          value: data.icon,
        });
      }
      if (data.showOnMobile !== undefined) {
        metafields.push({
          key: 'show_on_mobile',
          namespace: 'scroll_to_top',
          type: 'boolean',
          value: data.showOnMobile.toString(),
        });
      }
      if (data.showOnDesktop !== undefined) {
        metafields.push({
          key: 'show_on_desktop',
          namespace: 'scroll_to_top',
          type: 'boolean',
          value: data.showOnDesktop.toString(),
        });
      }
      if (data.backgroundColor !== undefined) {
        metafields.push({
          key: 'background_color',
          namespace: 'scroll_to_top',
          type: 'single_line_text_field',
          value: data.backgroundColor,
        });
      }
      if (data.iconColor !== undefined) {
        metafields.push({
          key: 'icon_color',
          namespace: 'scroll_to_top',
          type: 'single_line_text_field',
          value: data.iconColor,
        });
      }
      if (data.iconSize !== undefined) {
        metafields.push({
          key: 'icon_size',
          namespace: 'scroll_to_top',
          type: 'single_line_text_field',
          value: data.iconSize.toString(),
        });
      }
      if (data.shape !== undefined) {
        metafields.push({
          key: 'shape',
          namespace: 'scroll_to_top',
          type: 'single_line_text_field',
          value: data.shape,
        });
      }
      if (data.bottom !== undefined) {
        metafields.push({
          key: 'bottom',
          namespace: 'scroll_to_top',
          type: 'single_line_text_field',
          value: data.bottom.toString(),
        });
      }
      if (data.right !== undefined) {
        metafields.push({
          key: 'right',
          namespace: 'scroll_to_top',
          type: 'single_line_text_field',
          value: data.right.toString(),
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
        throw new Error('Store not found');
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
  }
);
