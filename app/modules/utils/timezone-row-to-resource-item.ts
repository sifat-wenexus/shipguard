import type { Timezone } from '#prisma-client';

export function timezoneRowToResourceItem(row: Timezone) {
  const gmtOffset =
    row.gmtOffset === 'UTC' ? 'UTC' : row.gmtOffset.replace('UTC', 'GMT');

  return {
    id: row.id,
    title: `${row.id.replace(/_/gim, ' ')} (${gmtOffset})`,
  };
}
