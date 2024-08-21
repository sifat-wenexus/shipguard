import type { TransactionSchema } from '~/modules/query/schema/transaction';
import { transactionSchema } from '~/modules/query/schema/transaction';
import { queryServer } from '~/modules/query/query.server';
import type { ActionFunctionArgs } from '@remix-run/node';
import { shopify } from '~/modules/shopify.server';
import { json } from '@remix-run/node';

export async function action({ request }: ActionFunctionArgs) {
  const ctx = await shopify.authenticate.admin(request);

  if (request.method !== 'POST') {
    return json(
      {
        success: false,
        message: `Method "${request.method}" not allowed. Only POST is allowed.`,
      },
      { status: 405 }
    );
  }

  let payload: TransactionSchema;

  try {
    payload = await transactionSchema.validateAsync(await request.json());

    if (payload.action === 'start') {
      const trxId = await queryServer.transaction(
        ctx.session,
        payload.maxWait,
        payload.timeout,
        payload.isolationLevel
      );

      return json({
        success: true,
        message: 'Transaction started',
        data: { transactionId: trxId },
      });
    }

    const transaction = queryServer.transactions[payload.id!];

    if (payload.action === 'commit') {
      transaction.commit(null);

      return json({
        success: true,
        message: 'Transaction committed',
      });
    }

    if (payload.action === 'rollback') {
      transaction.rollback(new Error('Transaction rolled back by user'));

      return json({
        success: true,
        message: 'Transaction rolled back',
      });
    }
  } catch (e) {
    return json(
      { success: false, message: (e as any).message },
      { status: 400 }
    );
  }
}
