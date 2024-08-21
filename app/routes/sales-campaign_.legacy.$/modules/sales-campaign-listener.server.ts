import type { DBEvtPayload } from '~/modules/query/types/db-evt-payload';
import { onDBEvtBuffered } from '~/modules/emitter.server';
import { queryProxy } from '~/modules/query/query-proxy';
import type { Session } from '~/shopify-api/lib';
import _ from 'lodash';

async function updateSalesCampaign(id: number, session: Session) {
  const campaign = await queryProxy.salesCampaign.findFirst({
    where: {
      id,
    },
    include: {
      Includes: {
        include: {
          Collections: true,
          Products: true,
          Variants: true,
          Excludes: true,
        },
      },
      Excludes: {
        include: {
          Collections: true,
          Variants: true,
          Products: true,
        },
      },
      EndDateTimeZone: {
        include: {
          Country: true,
        },
      },
      StartDateTimeZone: {
        include: {
          Country: true,
        },
      },
      Variants: true,
    },
  });

  if (!campaign) {
    return;
  }

  console.log(campaign);
}

async function listener(
  payloads: _.Dictionary<
    DBEvtPayload<'salesCampaignVariant' | 'salesCampaignInclude'>[]
  >
) {
  for (const storeId in payloads) {
    const session = _.last(payloads[storeId])?.session;

    if (!session) {
      continue;
    }

    const ids = new Set(
      payloads[storeId].map(
        (payload) => (payload.newData ?? payload.oldData)!.campaignId
      )
    );

    for (const id of ids) {
      await updateSalesCampaign(id, session);
    }
  }
}

onDBEvtBuffered(
  'salesCampaignVariant',
  ['create', 'update', 'delete'],
  5000,
  listener
);

onDBEvtBuffered(
  'salesCampaignInclude',
  ['create', 'update', 'delete'],
  5000,
  listener
);

onDBEvtBuffered(
  'salesCampaignExclude',
  ['create', 'update', 'delete'],
  5000,
  async (payloads) => {
    for (const storeId in payloads) {
      const session = _.last(payloads[storeId])?.session;

      if (!session) {
        continue;
      }

      const includeIds = payloads[storeId]
        .filter((payload) => !(payload.newData ?? payload.oldData)!.campaignId)
        .map((payload) => (payload.newData ?? payload.oldData)!.includeId);

      const includes = await (
        await queryProxy.salesCampaignInclude.findMany({
          pageSize: includeIds.length,
          where: {
            id: {
              in: includeIds,
            },
          },
          select: {
            campaignId: true,
          },
        })
      ).firstPage();

      const ids = new Set(
        payloads[storeId]
          .filter((payload) => (payload.newData ?? payload.oldData)!.campaignId)
          .map((payload) => (payload.newData ?? payload.oldData)!.campaignId!)
          .concat(includes.map((include) => include.campaignId))
      );

      for (const id of ids) {
        await updateSalesCampaign(id, session);
      }
    }
  }
);

onDBEvtBuffered(
  'salesCampaign',
  ['create', 'update', 'beforeDelete'],
  5000,
  async (payloads) => {
    for (const storeId in payloads) {
      const session = _.last(payloads[storeId])?.session;

      if (!session) {
        continue;
      }

      const ids = new Set(
        payloads[storeId].map(
          (payload) => (payload.newData ?? payload.oldData)!.id
        )
      );

      for (const id of ids) {
        await updateSalesCampaign(id, session);
      }
    }
  }
);
