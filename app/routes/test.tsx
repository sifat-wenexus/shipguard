import { json, LoaderFunction } from '@remix-run/node';
import { findOfflineSession } from '~/modules/find-offline-session.server';
import { prisma } from '~/modules/prisma.server';
export const loader: LoaderFunction = async ({ request }) => {
  const params = new URL(request.url);
  const queryParams = Object.fromEntries(params.searchParams.entries());
  const session = await findOfflineSession(queryParams.shopUrl);
  if (!session) {
    throw new Error(`Session not found!`);
  }
  const data = await prisma.packageProtection.findFirst({
    where: { storeId: session.storeId },
  });
  const totalAmount = queryParams.total;
  let variantId: string = '';
  let variantPrice: any = 0.0;
  if (data?.insurancePriceType === 'FIXED_PRICE') {
    const variant = await prisma.product.findFirst({
      where: { id: data.fixedProductId! },
      include: { Variants: { select: { id: true, price: true } } },
    });
    variantId = variant?.Variants[0].id!;
    variantPrice = variant?.Variants[0].price!;
  }
  if (data?.insurancePriceType === 'PERCENTAGE') {
    const productAndVariants = await prisma.product.findFirst({
      where: { id: data.percentageProductId! },
      include: { Variants: { select: { id: true, price: true } } },
    });
    const variants = productAndVariants?.Variants;
    const percentValue = (Number(totalAmount) * data.percentage) / 100;

    if (variants) {
      if (percentValue < Number(variants[0].price)) {
        variantId = variants[0].id!;
        variantPrice = variants[0].price!;
      } else if (percentValue > Number(variants[variants.length - 1])) {
        variantId = variants[variants.length - 1].id!;
        variantPrice = variants[variants.length - 1].price!;
      } else {
        const variant = variants?.find((v) => Number(v.price) >= percentValue);
        variantId = variant?.id!;
        variantPrice = variant?.price!;
      }
    }
  }

  return json(
    { message: 'Response', data, variantId, variantPrice },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
};

// import { Tag, Thumbnail, Tooltip } from '@shopify/polaris';

// const Test = () => {
//   return (
//     <div style={{ width: '200px' }}>
//       <Tooltip content="dfae">
//         <Tag onRemove={() => {}}>
//           <div style={{ display: 'flex', gap: '10px', padding: '5px' }}>
//             {' '}
//             <Thumbnail
//               size="small"
//               alt={'file.name'}
//               source={'https://nodemailer.com/nm_logo_200x136.png'}
//             />
//             <div>
//               <p style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
//                 hello world dfgfg sdfgr sdfgrg sfgrtg
//               </p>
//               <span>129-kb</span>
//             </div>
//           </div>
//         </Tag>
//       </Tooltip>
//     </div>
//   );
// };

// export default Test;
