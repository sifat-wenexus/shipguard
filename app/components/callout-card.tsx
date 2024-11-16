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
  badge?: React.ReactElement | null;
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
      <InlineStack wrap={false} gap="400">
        <Image
          alt={description}
          source={image}
          width={80}
          className="opacity-60"
        />

        <div className="w-full">
          <BlockStack>
            <Box paddingBlockEnd="300">
              <InlineStack align="space-between">
                <Text as="h3" variant="headingMd">
                  {title}
                </Text>

                <span>{badge ? badge : null}</span>
              </InlineStack>
            </Box>
            <Text as="p">{description}</Text>

            {button ? <Box paddingBlockStart="400">{button}</Box> : null}
          </BlockStack>
        </div>
      </InlineStack>
    </Card>
  );
};
