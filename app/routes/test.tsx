import { json, LoaderFunction } from '@remix-run/node';
import { findOfflineSession } from '~/modules/find-offline-session.server';
import { prisma } from '~/modules/prisma.server';
export const loader: LoaderFunction = async ({ request }) => {
  const params = new URL(request.url);
  const queryParams = Object.fromEntries(params.searchParams.entries());
  const session = await findOfflineSession(queryParams.shopUrl);
  const data = await prisma.packageProtection.findFirst({
    where: { storeId: session.storeId },
  });
  const totalAmount = queryParams.total;
  return json(
    { message: 'Response', data, totalAmount, queryParams, session },
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
