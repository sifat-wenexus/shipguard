
import { BlockStack, Box, Button, InlineStack, Thumbnail,Text } from '@shopify/polaris';


// import { Tag, Thumbnail, Tooltip } from '@shopify/polaris';

const Test = () => {
  return (
    <div>
        <Box padding="400"  shadow="300" background={'bg-fill'} borderRadius={'400'} >
          <InlineStack align={'space-between'} as={'div'}>
            <InlineStack align={'start'} as={'div'} wrap={true} gap={'200'}>
              <Thumbnail
                source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
                size="small"
                alt="Black choker necklace"
              />

              <BlockStack gap={'100'}>
                <h2 className={'text-lg font-bold'}>
                  Online store dashboard
                </h2>
                <p>deisabled kdjfjd dfjsdfdvb dfdjf</p>
              </BlockStack>

            </InlineStack>
            <Button size={'slim'}>Disconnect</Button>

          </InlineStack>
        </Box>

    </div>
  );
};

export default Test;
