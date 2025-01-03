import {mutationSchema, MutationSchema} from "~/modules/query/schema/mutation-schema";
import {ActionFunctionArgs, json} from "@remix-run/node";
import {queryServer} from "~/modules/query/query.server";
import {shopify} from "~/modules/shopify.server";
import {handleError} from "~/routes/api_.query";

export async function action({ request }: ActionFunctionArgs) {
  const ctx = await shopify.authenticate.admin(request);

  let mutation: MutationSchema;

  try {
    mutation = await mutationSchema.validateAsync(await request.json());

    return json(
      await queryServer.mutate(
        mutation,
        ctx.session,
        mutation.emitEvents,
        mutation.trxId
      )
    );
  } catch (e) {
    return handleError(e);
  }
}
