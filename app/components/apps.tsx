import type { OverallApp } from '~/components/apps-context';
import type { InlineGridProps } from '@shopify/polaris';
import { CalloutCard } from '~/components/callout-card';
import * as Icons from '@shopify/polaris-icons';
import { useMemo } from 'react';
import type { FC } from 'react';

import {
  InlineGrid,
  EmptyState,
  Button,
  Badge,
  Card,
  Text,
  Box,
} from '@shopify/polaris';

interface AppsProps {
  tab: number;
  apps: OverallApp[];
}

export const Apps: FC<AppsProps> = ({ apps, tab }) => {
  const columns = useMemo<InlineGridProps['columns']>(
    () => ({
      xl: 2,
      lg: 2,
      md: 2,
      sm: 1,
      xs: 1,
    }),
    []
  );

  return (
    <Box paddingBlockStart="400">
      {apps.length === 0 ? (
        <Card padding="400">
          <EmptyState
            image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png?width=150&height=150"
            heading="Nothing here"
          >
            <Text as="p">
              {tab === 1
                ? `No apps available`
                : tab === 2
                ? `You haven't installed any apps yet`
                : `No upcoming apps`}
            </Text>
          </EmptyState>
        </Card>
      ) : (
        <InlineGrid columns={columns} gap="400">
          {apps.map((app) => (
            <CalloutCard
              button={
                app.installed ? (
                  app.automatic ? (
                    <Button
                      icon={Icons.SettingsIcon}
                      url={`/${app.id}`}
                      variant="primary"
                    >
                      Configure
                    </Button>
                  ) : (
                    <Button
                      icon={Icons.MagicIcon}
                      url={`/${app.id}`}
                      variant="primary"
                    >
                      Customize
                    </Button>
                  )
                ) : app.available ? (
                  <Button
                    icon={Icons.WrenchIcon}
                    url={`/${app.id}`}
                    variant="primary"
                    tone="success"
                  >
                    Install
                  </Button>
                ) : undefined
              }
              description={app.description}
              image={app.illustration}
              title={app.name}
              key={app.id}
              badge={
                app.installed && tab !== 2 ? (
                  <Badge tone="success" icon={Icons.CheckIcon}>
                    Installed
                  </Badge>
                ) : !app.available ? (
                  <Badge tone="info" icon={Icons.InfoIcon}>
                    Upcoming
                  </Badge>
                ) : undefined
              }
            />
          ))}
        </InlineGrid>
      )}
    </Box>
  );
};
