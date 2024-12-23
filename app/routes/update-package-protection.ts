import { json } from '@remix-run/node';
import { queryProxy } from '~/modules/query/query-proxy';
import { findOfflineSession } from '~/modules/find-offline-session.server';

type IParams = {
  email: string;
  password: string;
};

type IBody = {
  storeId: string;
  cssSelector: string;
  defaultSetting: boolean;
  position: string;
};
const EMAIL = 'hello@wenexus.io';
const PASS = 'test123';

const validator = (params: IParams, body: IBody) => {
  const { email, password } = params;
  const { storeId, cssSelector, defaultSetting, position } = body;

  if (!email || !password) {
    throw json(
      { error: 'Email and password are required in the URL params' },
      { status: 400 }
    );
  }
  if (email !== EMAIL || password !== PASS) {
    throw json({ error: 'Invalid credentials' }, { status: 401 });
  }

  if (!storeId) {
    throw json({ error: 'Store ID is required in the body' }, { status: 400 });
  }
  if (position === 'BEFORE' || position === 'AFTER') {
    console.log(position);
  } else {
    throw json({ error: 'Position must be BEFORE or AFTER' });
  }
  if (!defaultSetting) {
    if (!cssSelector) {
      throw json(
        { error: 'cssSelector is required in the body' },
        { status: 400 }
      );
    }
  }
  if (!defaultSetting.toString()) {
    throw json(
      { error: 'defaultSetting is required in the body' },
      { status: 400 }
    );
  }
};

export let action = async ({ request }) => {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, { status: 405 });
  }

  let url = new URL(request.url);
  let searchParams = url.searchParams;
  const params = Object.fromEntries(searchParams.entries()) as IParams;

  try {
    const body = await request.json(); // Parse the incoming JSON body
    validator(params, body);

    const { storeId, cssSelector, defaultSetting, position } = body;

    const shop = await queryProxy.store.findFirst({ where: { id: storeId } });
    if (!shop) return json({ error: 'Store not found' }, { status: 404 });

    const session = await findOfflineSession(shop.domain);

    const res = await queryProxy.packageProtection.update(
      {
        where: { storeId },
        data: {
          cssSelector,
          defaultSetting,
          position,
        },
      },
      { session }
    );

    console.log(params);

    // Construct the user object
    const response = {
      email:EMAIL,
      password:PASS, // Note: Never store plain text passwords in a real application
      updatedData: res,
    };

    // Perform your logic with the user object (e.g., save to database, authentication, etc.)

    return json({
      message: 'Package protection update successfully',
      response,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return error instanceof Response ? error : json({ error: "Invalid request" }, { status: 400 });
  }
};
