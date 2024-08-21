import type { Jsonify } from '@remix-run/server-runtime/dist/jsonify';
import { DateWithTimezone } from '~/modules/utils/date-utils';
import type { SalesCampaign } from '#prisma-client';
import type { BadgeProps } from '@shopify/polaris';
import * as Icons from '@shopify/polaris-icons';

type CampaignStatus =
  | 'Draft'
  | 'Processing'
  | 'Scheduled'
  | 'Running'
  | 'Paused'
  | 'Ended';

export function getCampaignStatus(
  campaign: Jsonify<SalesCampaign>
): CampaignStatus {
  const startDate = new Date(campaign.startDate);
  const endDate = campaign.endDate ? new Date(campaign.endDate) : null;

  let status: string = campaign.status;

  if (status !== 'DRAFT' && status !== 'PROCESSING') {
    const startDateWithTimeZone = new DateWithTimezone(
      campaign.startDateTimezoneId,
      startDate
    );

    const isScheduled = startDateWithTimeZone.getTime() >= Date.now();

    if (isScheduled) {
      status = 'Scheduled';
    } else if (!endDate) {
      status = status === 'DISABLED' ? 'Paused' : 'Running';
    } else {
      const endDateWithTimeZone = new DateWithTimezone(
        campaign.endDateTimezoneId,
        endDate
      );

      if (endDateWithTimeZone.getTime() > Date.now()) {
        status = status === 'DISABLED' ? 'Paused' : 'Running';
      } else {
        status = 'Ended';
      }
    }
  }

  return (status.charAt(0).toUpperCase() +
    status.slice(1).toLowerCase()) as CampaignStatus;
}

export function getCampaignStatusBadgeProps(status: CampaignStatus): BadgeProps {
  const tone: BadgeProps['tone'] =
    status === 'Running'
      ? 'info'
      : status === 'Ended'
      ? 'read-only'
      : status === 'Scheduled'
      ? 'enabled'
      : status === 'Paused'
      ? 'attention'
      : status === 'Processing'
      ? 'info-strong'
      : undefined;

  const icon: BadgeProps['icon'] =
    status === 'Running'
      ? Icons.StatusActiveIcon
      : status === 'Ended'
      ? Icons.CheckCircleIcon
      : status === 'Scheduled'
      ? Icons.ClockIcon
      : status === 'Paused'
      ? Icons.PauseCircleIcon
      : status === 'Processing'
      ? Icons.AutomationIcon
      : Icons.NoteIcon;

  return { tone, icon, children: status };
}
