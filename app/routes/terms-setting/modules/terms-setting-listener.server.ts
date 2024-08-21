import { getShopifyGQLClient } from '~/modules/shopify.server';
import { onDBEvtBuffered } from '~/modules/emitter.server';
import { queryProxy } from '~/modules/query/query-proxy';
import _ from 'lodash';

onDBEvtBuffered(
  'checkoutTermsSettings',
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
          namespace: 'terms_settings',
          type: 'boolean',
          value: data.enabled.toString(),
        });
      }

      if (data.text !== undefined) {
        metafields.push({
          key: 'text',
          namespace: 'terms_settings',
          type: 'single_line_text_field',
          value: data.text,
        });
      }

      if (data.warningText !== undefined) {
        metafields.push({
          key: 'warning_text',
          namespace: 'terms_settings',
          type: 'single_line_text_field',
          value: data.warningText,
        });
      }
      if (data.position !== undefined) {
        metafields.push({
          key: 'position',
          type: 'single_line_text_field',
          namespace: 'terms_settings',
          value: data.position,
        });
      }
      if (data.showOnCartPage !== undefined) {
        metafields.push({
          key: 'show_on_cart_page',
          type: 'boolean',
          namespace: 'terms_settings',
          value: data.showOnCartPage.toString(),
        });
      }
      if (data.showOnMiniCart !== undefined) {
        metafields.push({
          key: 'show_on_mini_cart',
          type: 'boolean',
          namespace: 'terms_settings',
          value: data.showOnMiniCart.toString(),
        });
      }
      if (data.checked !== undefined) {
        metafields.push({
          key: 'checked',
          type: 'boolean',
          namespace: 'terms_settings',
          value: data.checked.toString(),
        });
      }
      if (data.textFontSize !== undefined) {
        metafields.push({
          key: 'font_size',
          type: 'single_line_text_field',
          namespace: 'terms_settings',
          value: data.textFontSize,
        });
      }
      if (data.textColor !== undefined) {
        metafields.push({
          key: 'text_color',
          type: 'color',
          namespace: 'terms_settings',
          value: data.textColor,
        });
      }
      if (data.warningTextFontSize !== undefined) {
        metafields.push({
          key: 'warning_font_size',
          type: 'single_line_text_field',
          namespace: 'terms_settings',
          value: data.warningTextFontSize,
        });
      }
      if (data.warningTextColor !== undefined) {
        metafields.push({
          key: 'warning_text_color',
          type: 'color',
          namespace: 'terms_settings',
          value: data.warningTextColor,
        });
      }
      if (data.textAlign !== undefined) {
        metafields.push({
          key: 'text_align',
          value: data.textAlign,
          namespace: 'terms_settings',
          type: 'single_line_text_field',
        });
      }
      if (data.textLinkUnderline !== undefined) {
        metafields.push({
          key: 'text_link_underline',
          type: 'boolean',
          namespace: 'terms_settings',
          value: data.textLinkUnderline.toString(),
        });
      }
      if (data.textLinkColor) {
        metafields.push({
          key: 'text_link_color',
          type: 'color',
          namespace: 'terms_settings',
          value: data.textLinkColor,
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
