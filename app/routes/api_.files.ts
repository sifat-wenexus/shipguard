import { gcloudStorage } from '~/modules/gcloud-storage.server';
import type { ActionFunctionArgs } from '@remix-run/node';
import { shopify } from '~/modules/shopify.server';
import { prisma } from '~/modules/prisma.server';
import { json } from '@remix-run/node';
import { File } from '#prisma-client';

const validImageTypes = [
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'image/webp',
];

export async function action({ request }: ActionFunctionArgs) {
  const ctx = await shopify.authenticate.admin(request);
  let response: File | null = null;
  const body = await request.formData();

  const file = body.get('file') as Blob;
  // debugger;
  if (!validImageTypes.includes(file.type)) {
    return json({
      success: false,
      message: `Invalid file type: ${
        file.type
      }, must be one of: ${validImageTypes.join(', ')}`,
    });
  }

  if (file.size > 800000 /* 800kb */) {
    return json({
      success: false,
      message: `File too large: ${file.size} bytes, must be less than 800kb`,
    });
  }

  try {
    const res = await prisma.$transaction(
      async (prisma) => {
        const fileInDB = await prisma.file.create({
          data: {
            storeId: ctx.session.storeId,
            name: (file as any).name,
            size: file.size,
            mimeType: file.type,
          },
        });

        const bucket = gcloudStorage.bucket(
          process.env.GC_STORAGE_BUCKET_NAME!
        );

        const fileResponse = await bucket
          .file(fileInDB.id)
          .save(Buffer.from(await file.arrayBuffer()), {
            contentType: fileInDB.mimeType,
          });
        response = fileInDB;
      },
      {
        timeout: 10000,
      }
    );
  } catch (e) {
    console.error(e);
    return json({
      success: false,
      message:
        'Something went wrong, please try again later or contact support.',
    });
  }

  return json({
    success: true,
    message: 'File uploaded successfully.',
    response,
  });
}
