import { LegacyCard, LegacyTabs } from '@shopify/polaris';
import { useState, useCallback } from 'react';

export function Nav() {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );

  const tabs = [
    {
      id: 'discover',
      content: 'Discover',
      accessibilityLabel: 'All customers',
      panelID: 'all-customers-content-1',
    },
    {
      id: 'my-apps',
      content: 'My Apps',
      panelID: 'accepts-marketing-content-1',
    },
    {
      id: 'all-apps',
      content: 'All Apps',
      panelID: 'repeat-customers-content-1',
    },
  ];

  return (
    <LegacyCard>
      <LegacyTabs
        tabs={tabs}
        selected={selected}
        onSelect={handleTabChange}
      ></LegacyTabs>
    </LegacyCard>
  );
}
