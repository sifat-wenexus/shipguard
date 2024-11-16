import { webhookManager } from '~/modules/webhook-manager.server';
import type { ActionFunctionArgs } from '@remix-run/node';

export const action = async ({ request }: ActionFunctionArgs) =>
  webhookManager.handleRequest(request);
