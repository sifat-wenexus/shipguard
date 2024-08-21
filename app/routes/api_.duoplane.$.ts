import type { LoaderFunctionArgs, TypedResponse } from '@remix-run/node';
import htmlParser from 'node-html-parser';
import { sleep } from '~/modules/utils/sleep';
import { json } from '@remix-run/node';
import _ from 'lodash';

type DuoplaneResourceType = 'list' | 'single' | 'custom';

type DuoplaneResource<
  T extends DuoplaneResourceType = DuoplaneResourceType,
  S extends boolean = boolean
> = T extends 'custom'
  ? {
      expand?: (
        data: any,
        authorization: string,
        searchParams: URLSearchParams
      ) => Promise<any>;
      path?: (
        params: string[],
        searchParams: URLSearchParams
      ) => string | string[];
      match: (path: string) => boolean;
      self: S;
      type: T;
    } & (S extends false
      ? {
          parse:
            | ((data: string) => any)
            | ((
                data: string,
                params: string[],
                searchParams: URLSearchParams
              ) => any);
        }
      : {})
  : {
      parse:
        | ((data: string) => any)
        | ((
            data: string,
            params: string[],
            searchParams: URLSearchParams
          ) => any);
      expand?: (
        data: any,
        authorization: string,
        searchParams: URLSearchParams
      ) => Promise<any>;
      path?: (params: string[], searchParams: URLSearchParams) => string;
      match: (path: string) => boolean;
      type: T;
      maxPerPage?: number;
    };

const baseUrl = 'https://app.duoplane.com';
const getExeca = _.memoize(() => import('execa'));

async function fetchDuoplane(...requestParams: string[][]) {
  const execa = await getExeca();

  const requestParamsChunked = _.chunk(requestParams, 39);
  const responses: string[] = [];

  for (const chunk of requestParamsChunked) {
    const _responses = await Promise.all(
      chunk.map((params) => execa.execa('curl', [...params, '-v']))
    );

    for (const response of _responses) {
      responses.push(response.stdout);

      const headers = Object.fromEntries(
        response.stderr
          .split('\n')
          .filter((l) => l.startsWith('<') && l.indexOf(':') !== -1)
          .map((l) => l.trim().slice(2))
          .map((h) => {
            const index = h.indexOf(':');

            return [h.slice(0, index).toLowerCase(), h.slice(index + 1).trim()];
          })
      );

      if (headers['duoplane-retry-after-seconds']) {
        const seconds = Number(headers['duoplane-retry-after-seconds']);

        if (seconds > 0) {
          await sleep((seconds + 0.5) * 1000);
        }
      }
    }
  }

  return responses;
}

async function fetchDuoplaneList(
  resource: DuoplaneResource<'list'>,
  params: string[],
  searchParams: URLSearchParams,
  authorization: string,
  respond = true
) {
  const endpoint = new URL(baseUrl);

  const maxPerPageByDuoplane = 250;
  const maxPerPage = resource.maxPerPage ?? 1000000;

  const givenPerPage = parseInt(searchParams.get('per_page') ?? '50', 10);

  if (givenPerPage > maxPerPage) {
    return json(
      {
        message: `per_page must be less than ${maxPerPage}`,
      },
      {
        status: 400,
      }
    );
  }

  const shouldExpand = searchParams.has('expand') && !!resource.expand;
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const perPage = Math.min(givenPerPage, maxPerPageByDuoplane);

  const iterations = Math.ceil(givenPerPage / maxPerPageByDuoplane);
  const items: Record<string, any>[] = [];

  const requestParams: string[][] = [];

  for (let i = 0; i < iterations; i++) {
    searchParams.set('per_page', perPage.toString());
    searchParams.set('page', (page + i).toString());

    endpoint.search = searchParams.toString();
    endpoint.pathname = resource.path
      ? resource.path(params, searchParams)
      : params.join('/');

    requestParams.push([
      '-X',
      'GET',
      endpoint.toString(),
      '-H',
      `Authorization: ${authorization}`,
    ]);
  }

  const responses = await fetchDuoplane(...requestParams);

  for (const response of responses) {
    const parsed = resource.parse(response, params, searchParams);

    items.push(...parsed);

    if (parsed.length < maxPerPageByDuoplane) {
      break;
    }
  }

  if (shouldExpand) {
    const expanded = await resource.expand!(items, authorization, searchParams);

    if (respond) {
      return json(expanded);
    }

    return expanded;
  }

  if (respond) {
    return json(items);
  }

  return items;
}

async function fetchDuoplaneSingle(
  resource: DuoplaneResource<'single'>,
  params: string[],
  searchParams: URLSearchParams,
  authorization: string,
  respond = true
) {
  const endpoint = new URL(baseUrl);

  endpoint.pathname = resource.path
    ? resource.path(params, searchParams)
    : params.join('/');

  const responses = await fetchDuoplane([
    '-X',
    'GET',
    endpoint.toString(),
    '-H',
    `Authorization: ${authorization}`,
  ]);

  const parsed = resource.parse(responses[0], params, searchParams);

  if (searchParams.has('expand') && resource.expand) {
    const expanded = await resource.expand(parsed, authorization, searchParams);

    if (respond) {
      return json(expanded);
    }

    return expanded;
  }

  if (respond) {
    return json(parsed);
  }

  return parsed;
}

async function fetchDuoplaneCustom(
  resource: DuoplaneResource<'custom'>,
  params: string[],
  searchParams: URLSearchParams,
  authorization: string,
  respond = true
) {
  const path = resource.path!(params, searchParams);
  const pathArray = Array.isArray(path) ? path : [path];

  if (resource.self) {
    const resourceToUse = resources.find((resource) =>
      resource.match(pathArray[0])
    );
    const chunks = _.chunk(pathArray, 39);
    const results: any[] = [];

    if (!resourceToUse) {
      throw new Error('Resource not found');
    }

    for (const chunk of chunks) {
      const responses = await Promise.all(
        chunk.map((path) => {
          if (resourceToUse.type === 'single') {
            return fetchDuoplaneSingle(
              resourceToUse,
              path.split('/'),
              searchParams,
              authorization,
              false
            );
          }

          if (resourceToUse.type === 'list') {
            return fetchDuoplaneList(
              resourceToUse,
              path.split('/'),
              searchParams,
              authorization,
              false
            );
          }

          if (resource.match(path)) {
            throw new Error('Circular reference detected');
          }

          return fetchDuoplaneCustom(
            resourceToUse,
            path.split('/'),
            searchParams,
            authorization,
            false
          );
        })
      );

      results.push(...responses);
    }

    if (Array.isArray(path)) {
      if (respond) {
        return json(results);
      }

      return results;
    }

    if (respond) {
      return json(results[0]);
    }

    return results[0];
  }

  const endpoint = new URL(baseUrl);
  const shouldExpand = searchParams.has('expand') && !!resource.expand;

  const requestParams: string[][] = [];

  for (const path of pathArray) {
    endpoint.search = searchParams.toString();
    endpoint.pathname = path;

    requestParams.push([
      '-X',
      'GET',
      endpoint.toString(),
      '-H',
      `Authorization: ${authorization}`,
    ]);
  }

  const responses = await fetchDuoplane(...requestParams);
  const results: any[] = [];

  for (const response of responses) {
    const parsed = (resource as DuoplaneResource<'custom', false>).parse(
      response,
      params,
      searchParams
    );

    results.push(...parsed);
  }

  if (shouldExpand) {
    return json(await resource.expand!(results, authorization, searchParams));
  }

  if (Array.isArray(path)) {
    if (respond) {
      return json(results);
    }

    return results;
  }

  if (respond) {
    return json(results[0]);
  }

  return results[0];
}

const resources: DuoplaneResource[] = [
  {
    match: (path) => path.startsWith('purchase_orders.json'),
    parse: JSON.parse,
    type: 'list',
  },
  {
    match: (path) => path.startsWith('purchase_orders/'),
    parse: JSON.parse,
    type: 'single',
  },
  {
    match: (path) => path.startsWith('products.json'),
    parse: JSON.parse,
    type: 'list',
  },
  {
    match: (path) =>
      path.startsWith('products/') &&
      path.endsWith('/weight-and-dimensions.json'),
    type: 'single',
    path: (params) => `products/${params[1]}/edit`,
    parse: (data, params) => {
      const document = htmlParser(data);

      const weightUnitOption = document
        .getElementById('product_weight_units')
        ?.querySelector('option[selected]');
      const weightInput = document.getElementById('product_weight');
      const dimensionUnitInput = document.getElementById(
        'product_dimensions_units'
      );
      const heightInput = document.getElementById('product_height_dimension');
      const widthInput = document.getElementById('product_width_dimension');
      const lengthInput = document.getElementById('product_length_dimension');
      const depthInput = document.getElementById('product_depth_dimension');
      const diameterInput = document.getElementById(
        'product_diameter_dimension'
      );

      const dimensionUnit = dimensionUnitInput?.getAttribute('value');

      return {
        product_id: Number(params[1]),
        weight_unit: weightUnitOption?.getAttribute('value') ?? null,
        dimension_unit: dimensionUnit ? dimensionUnit : null,
        weight: weightInput ? Number(weightInput?.getAttribute('value')) : null,
        height: heightInput ? Number(heightInput?.getAttribute('value')) : null,
        width: widthInput ? Number(widthInput?.getAttribute('value')) : null,
        length: lengthInput ? Number(lengthInput?.getAttribute('value')) : null,
        depth: depthInput ? Number(depthInput?.getAttribute('value')) : null,
        diameter: diameterInput
          ? Number(diameterInput?.getAttribute('value'))
          : null,
      };
    },
  },
  {
    match: (path) => path.startsWith('product-weights-and-dimensions.json'),
    self: true,
    type: 'custom',
    path: (params, searchParams) => {
      const ids = searchParams.get('ids');

      if (!ids) {
        return [];
      }

      return ids
        .split(',')
        .map((id) => `products/${id.trim()}/weight-and-dimensions.json`);
    },
  },
  {
    type: 'single',
    match: (path) => path.startsWith('vendors/'),
    path: (params) => `vendors/${params[1].replace('.json', '')}`,
    parse: (data, params) => {
      const document = htmlParser(data);

      const container = document.querySelector(
        '#app_main > div > div > div > div:nth-child(1) > div > div:nth-child(1) > div.span9 > div.row-fluid > div:nth-child(1)'
      );

      const stateAndZip = container
        ?.querySelector('div:nth-child(5)')
        ?.innerText.trim()
        .split(',')
        .map((s) => s.trim());

      return {
        id: Number(params[1].replace('.json', '')),
        name: document
          .querySelector('#app_header_title')
          ?.innerText.trim()
          .replace('Vendor: ', ''),
        addressLine1: container
          ?.querySelector('div:nth-child(3)')
          ?.innerText.trim(),
        zipCode: stateAndZip ? stateAndZip[1].split(' ')[1] : null,
        city: stateAndZip ? stateAndZip[0] : null,
        state: stateAndZip ? stateAndZip[1].split(' ')[0] : null,
        country: container?.querySelector('div:nth-child(6)')?.innerText.trim(),
      };
    },
  },
  {
    match: (path) => path.startsWith('vendors-by-ids.json'),
    self: true,
    type: 'custom',
    path: (params, searchParams) => {
      const ids = searchParams.get('ids');

      if (!ids) {
        return [];
      }

      return ids.split(',').map((id) => `vendors/${id.trim()}.json`);
    },
  },
  {
    match: (path) => path.startsWith('products/'),
    parse: JSON.parse,
    type: 'single',
  },
  {
    match: (path) => path.startsWith('orders.json'),
    parse: JSON.parse,
    type: 'list',
  },
  {
    match: (path) => path.startsWith('orders/'),
    parse: JSON.parse,
    type: 'single',
  },
  {
    match: (path) => path.startsWith('shipments.json'),
    parse: JSON.parse,
    type: 'list',
  },
  {
    match: (path) => path.startsWith('shipments/'),
    parse: JSON.parse,
    type: 'single',
  },
  {
    type: 'list',
    path: () => 'invoices',
    match: (path) => path.startsWith('invoices.json'),
    parse: (data) => {
      const document = htmlParser(data);

      const rows = document.querySelectorAll(
        '.content_doc table.dataTable tbody tr'
      );

      return rows.map((row) => {
        const cells = row.querySelectorAll('td');
        const invoiceAnchor = cells[0].querySelector('a')!;

        return {
          id: Number(
            invoiceAnchor.getAttribute('href')?.replace('/invoices/', '')
          ),
          number: invoiceAnchor.innerText.trim(),
          date: cells[1].innerText.trim(),
          vendor_id: Number(
            cells[2]
              .querySelector('a')
              ?.getAttribute('href')
              ?.replace('/vendors/', '')
          ),
          shipment_count: Number(cells[3].innerText.trim()),
          amount: cells[4].innerText.trim(),
        };
      });
    },
    expand: async (
      invoices: Record<string, any>[],
      authorization: string,
      searchParams
    ) => {
      const invoiceRequestParams: string[][] = invoices.map((invoice) => [
        '-X',
        'GET',
        `${baseUrl}/invoices/${invoice.id}`,
        '-H',
        `Authorization: ${authorization}`,
      ]);

      if (invoiceRequestParams.length === 0) {
        return invoices;
      }

      const invoiceResponses = await fetchDuoplane(...invoiceRequestParams);

      for (let i = 0; i < invoices.length; i++) {
        const invoice = (resources[13] as DuoplaneResource<'single'>).parse(
          invoiceResponses[i],
          ['invoices', `${invoices[i].id}.json`],
          searchParams
        );

        invoices[i].shipments = invoice.shipments;
      }

      const purchaseOrderRequestParams: string[][] = invoices
        .map((invoice: Record<string, any>) =>
          invoice.shipments.map((shipment: Record<string, any>) => [
            '-X',
            'GET',
            `${baseUrl}/purchase_orders/${shipment.purchase_order_id}.json`,
            '-H',
            `Authorization: ${authorization}`,
          ])
        )
        .flat();

      if (purchaseOrderRequestParams.length === 0) {
        return invoices;
      }

      const purchaseOrderResponses = await fetchDuoplane(
        ...purchaseOrderRequestParams
      );

      const purchaseOrders: Record<string, any> = {};

      for (const purchaseOrderResponse of purchaseOrderResponses) {
        const purchaseOrder = JSON.parse(purchaseOrderResponse);
        purchaseOrders[purchaseOrder.id] = purchaseOrder;
      }

      for (const invoice of invoices) {
        for (const shipment of invoice.shipments) {
          if (!shipment.purchase_order_id) {
            continue;
          }

          shipment.purchase_order = purchaseOrders[shipment.purchase_order_id];
        }
      }

      return invoices;
    },
  },
  {
    type: 'single',
    match: (path) => path.startsWith('invoices/'),
    path: (params) => `invoices/${params[1].replace('.json', '')}`,
    parse: (data, params) => {
      const document = htmlParser(data);

      const container = document.querySelector('#app_main > div > div > div')!;

      const invoiceCells = container.querySelectorAll(
        '.row-fluid:nth-child(1) > div:nth-child(2) dd'
      );

      const shipmentRows = container.querySelectorAll(
        '.row-fluid:nth-child(2) > div:nth-child(2) > table tbody tr'
      );

      return {
        id: Number(params[1].replace('.json', '')),
        number: invoiceCells[0].innerText.trim(),
        vendor_id: Number(
          invoiceCells[1]
            .getElementsByTagName('a')[0]
            .getAttribute('href')
            ?.replace('/vendors/', '')
        ),
        shipment_count: Number(invoiceCells[2].innerText.trim()),
        amount: invoiceCells[3].innerText.trim(),
        shipments: shipmentRows.map((row) => {
          const cells = row.querySelectorAll('td');
          const anchor = cells[0].querySelector('a')!;

          return {
            id: Number(anchor.getAttribute('href')?.replace('/shipments/', '')),
            purchase_order_id: Number(
              cells[1]
                .querySelector('a')
                ?.getAttribute('href')
                ?.replace('/purchase_orders/', '')
            ),
            date: anchor.innerText.trim(),
            invoice_total: cells[2].innerText.trim(),
          };
        }),
      };
    },
  },
];

export async function loader({ request, params }: LoaderFunctionArgs) {
  const authorization = request.headers.get('authorization');

  if (!authorization) {
    return json(
      {
        message: 'Unauthorized',
      },
      {
        status: 401,
      }
    );
  }

  const param = params['*']!;

  let response: TypedResponse<any> = json(
    {
      message: 'Not found',
    },
    {
      status: 404,
    }
  );

  try {
    const resource = resources.find((resource) => resource.match(param));
    const url = new URL(request.url);

    if (resource?.type === 'list') {
      response = await fetchDuoplaneList(
        resource as DuoplaneResource<'list'>,
        param.split('/'),
        url.searchParams,
        authorization
      );
    } else if (resource?.type === 'single') {
      response = await fetchDuoplaneSingle(
        resource as DuoplaneResource<'single'>,
        param.split('/'),
        url.searchParams,
        authorization
      );
    } else if (resource?.type === 'custom') {
      response = await fetchDuoplaneCustom(
        resource as DuoplaneResource<'custom'>,
        param.split('/'),
        url.searchParams,
        authorization
      );
    }
  } catch (e) {
    console.error(e);
    response = json(
      {
        message: 'Internal server error',
      },
      {
        status: 500,
      }
    );
  }

  return response;
}
