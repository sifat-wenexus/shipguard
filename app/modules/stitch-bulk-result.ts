import _ from 'lodash';

export function stitchBulkResult<T = Record<string, any>>(data: Record<string, any>[]): T[] {
  if (!data.length) {
    return [];
  }

  const result: T[] = [];

  const itemsById = _.keyBy(data, 'id');

  for (const item of data) {
    if (!item.__parentId) {
      result.push(item as T);
      continue;
    }

    const parent = itemsById[item.__parentId];
    const group = _.camelCase(item.id.split('/')[3] + 's');

    if (!parent[group]) {
      parent[group] = [];
    }

    parent[group].push(item);
  }

  return result;
}
