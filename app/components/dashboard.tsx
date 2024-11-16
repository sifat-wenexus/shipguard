import { Box, Card, EmptyState } from '@shopify/polaris';

export function Dashboard() {
  return (
    <Box paddingBlockStart="400">
      <Card>
        <EmptyState
          heading="Nothing here yet"
          image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
        >
          <p>This page is under construction.</p>
        </EmptyState>
      </Card>
    </Box>
  );
}
