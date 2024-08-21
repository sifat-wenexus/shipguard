import type { TabProps } from '@shopify/polaris/build/ts/src/components/Tabs/types';
import { createContext, useContext } from 'react';
import { Link } from '@remix-run/react';
import type { FC } from 'react';

export const MainNavContext = createContext([
  {
    id: 'dashboard',
    url: '/app',
    content: 'Dashboard',
    accessibilityLabel: 'Dashboard',
    selected: true,
  },
  {
    id: 'all-apps',
    url: '/app?tab=all',
    content: 'All Apps',
    accessibilityLabel: 'All Apps',
  },
  {
    id: 'active-apps',
    url: '/app?tab=active',
    content: 'Installed Apps',
    accessibilityLabel: 'Active Apps',
  },
  {
    id: 'upcoming-apps',
    url: '/app?tab=upcoming',
    content: 'Upcoming',
    accessibilityLabel: 'Upcoming',
  },
] as TabProps[]);

export const MainNav: FC = () => {
  const tabs = useContext(MainNavContext);

  return (
    <ui-nav-menu>
      {tabs.map((tab) => (
        <Link
          rel={tab.id === 'dashboard' ? 'home' : undefined}
          to={tab.url ?? ''}
          className="active"
          key={tab.id}
        >
          {tab.content}
        </Link>
      ))}
    </ui-nav-menu>
  );
};
