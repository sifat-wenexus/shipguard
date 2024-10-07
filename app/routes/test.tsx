import { ActionFunctionArgs, json, LoaderFunction } from '@remix-run/node';
export const loader: LoaderFunction = async ({ request }) => {
  return json({ message: 'Response' });
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
