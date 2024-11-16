import { gcloudStorage } from '~/modules/gcloud-storage.server';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { shopify } from '~/modules/shopify.server';
import { prisma } from '~/modules/prisma.server';
import { json } from '@remix-run/node';
import { queryProxy } from '~/modules/query/query-proxy';

export async function action({ request, params }: LoaderFunctionArgs) {
  const ctx = await shopify.authenticate.admin(request);

  const fileInDB = await queryProxy.file.findUnique(
    {
      where: {
        id: params.id!,
      },
    },
    ctx.session
  );

  if (!fileInDB) {
    return json(
      {
        success: false,
        message: 'File not found',
      },
      {
        status: 404,
      }
    );
  }

  try {
    await queryProxy.$transaction(async (trx) => {
      await trx.file.delete(
        {
          where: {
            id: params.id!,
          },
        },
        {
          session: ctx.session,
        }
      );

      await gcloudStorage
        .bucket(process.env.GC_STORAGE_BUCKET_NAME!)
        .file(params.id!)
        .delete({
          ignoreNotFound: true,
        });
    });

    return json({
      success: true,
      message: 'File deleted successfully',
    });
  } catch (e) {
    console.error(e);
    return json(
      {
        success: false,
        message:
          'An error occurred while deleting the file, please try again later or contact support',
      },
      {
        status: 500,
      }
    );
  }
}

export async function loader({ params }: LoaderFunctionArgs) {
  const fileInDB = await prisma.file.findUnique({
    where: {
      id: params.id!,
    },
  });

  if (!fileInDB) {
    return new Response(null, {
      status: 404,
    });
  }

  const [file] = await gcloudStorage
    .bucket(process.env.GC_STORAGE_BUCKET_NAME!)
    .file(params.id!)
    .download();

  return new Response(file, {
    headers: {
      'Content-Type': fileInDB.mimeType,
      'Content-Length': fileInDB.size.toString(),
    },
  });
}
