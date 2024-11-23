
import { BlockStack, Box, Button, InlineStack, Thumbnail,Text } from '@shopify/polaris';


// import { Tag, Thumbnail, Tooltip } from '@shopify/polaris';

// const Test = () => {
//   return (
//     <div>
//         <Box padding="400"  shadow="300" background={'bg-fill'} borderRadius={'400'} >
//           <InlineStack align={'space-between'} as={'div'}>
//             <InlineStack align={'start'} as={'div'} wrap={true} gap={'200'}>
//               <Thumbnail
//                 source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
//                 size="small"
//                 alt="Black choker necklace"
//               />
//
//               <BlockStack gap={'100'}>
//                 <h2 className={'text-lg font-bold'}>
//                   Online store dashboard
//                 </h2>
//                 <p>deisabled kdjfjd dfjsdfdvb dfdjf</p>
//               </BlockStack>
//
//             </InlineStack>
//             <Button size={'slim'}>Disconnect</Button>
//
//           </InlineStack>
//         </Box>
//
//     </div>
//   );
// };
//
// export default Test;


import {Link, AccountConnection} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function AccountConnectionExample() {
  const [connected, setConnected] = useState(false);
  const accountName = connected ? 'Jane Appleseed' : '';

  const handleAction = useCallback(() => {
    setConnected((connected) => !connected);
  }, []);

  const buttonText = connected ? 'Disconnect' : 'Connect';
  const details = connected ? 'Account connected' : 'No account connected';
  const terms = connected ? null : (
    <p>
      By clicking <strong>Connect</strong>, you agree to accept Sample App’s{' '}
      <Link url="Example App">terms and conditions</Link>. You’ll pay a
      commission rate of 15% on sales made through Sample App.
    </p>
  );

  return (
    <AccountConnection
      accountName={accountName}
      connected={connected}
      title="Example App"
      action={{
        content: buttonText,
        onAction: handleAction,
      }}
      details={details}
      termsOfService={terms}
      avatarUrl={'https://fusionauth.io/img/articles/modern-guide-oauth/email-requested-at-login.png'}
    />
  );
}
export  default AccountConnectionExample
