import { ActionFunctionArgs, json, LoaderFunction } from '@remix-run/node';
import { getConfig } from '~/modules/get-config.server';
import { prisma } from '~/modules/prisma.server';
import { sendMail } from '~/modules/send-mail.server';
export const loader: LoaderFunction = async ({ request }) => {
  const data = await prisma.packageProtectionOrder.findMany({
    where: {
      storeId: 'gid://shopify/Shop/55079829551',
      hasClaimRequest: { equals: true },
    },
    select: {
      id: true,
      orderId: true,
      orderName: true,
      orderAmount: true,
      protectionFee: true,
      claimStatus: true,
    },
  });

  const claimPage = `${getConfig().appUrl}/claim-request`;
  await sendMail({
    template: 'CLAIM_REQUEST_EMAIL_FOR_ADMIN',
    storeId: 'gid://shopify/Shop/55079829551',
    to: 'dfsdfg@gmail.com',
    internal: true,
    variables: {
      go_to_claim: claimPage,
      claim_date: `{data?.claimDate}`,
      claim_reason: `data.PackageProtectionClaimOrder[0].comments!`,
      order_id: `data?.orderName`,
      customer_name: `{data?.customerFirstName ?? ''}  {
            data?.customerLastName
          }`,
      shop_name: `data?.Store.name`,
      order_url: `https://admin.shopify.com/store/{
            data.Store.domain.split('.')[0]
          }/orders/{orderId}`,
    },
  });
  return json({ message: 'Response', data });
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
