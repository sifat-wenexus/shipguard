import type { FC } from 'react';

import {
  InlineStack,
  BlockStack,
  Image,
  Card,
  Text,
  Box,
} from '@shopify/polaris';

interface CalloutCardProps {
  title: string;
  description: string;
  image: string;
  badge?: React.ReactElement;
  button?: React.ReactElement;
}

export const CalloutCard: FC<CalloutCardProps> = ({
  title,
  description,
  image,
  badge,
  button,
}) => {
  return (
    <Card padding="400">
      <InlineStack wrap={false} gap="1000">
        <Image alt={description} source={image} width={80} />

        <BlockStack>
          <Box paddingBlockEnd="300">
            <InlineStack align="space-between">
              <Text as="h3" variant="headingSm">
                {title}
              </Text>

              {badge ? badge : null}
            </InlineStack>
          </Box>
          <Text as="p">{description}</Text>

          {button ? <Box paddingBlockStart="400">{button}</Box> : null}
        </BlockStack>
      </InlineStack>
    </Card>
  );
};
