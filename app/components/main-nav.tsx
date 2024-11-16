import type { TabProps } from '@shopify/polaris/build/ts/src/components/Tabs/types';
import { createContext, useContext } from 'react';
import { Link, useLocation, useSearchParams } from '@remix-run/react';
import type { FC } from 'react';

export const MainNavContext = createContext([
  {
    id: 'dashboard',
    url: '/dashboard',
    content: 'Dashboard',
    accessibilityLabel: 'Dashboard',
    selected: true,
  },
  {
    id: 'order',
    url: '/order',
    content: 'Order',
    accessibilityLabel: 'order',
  },
  {
    id: 'claim-request',
    url: '/claim-request',
    content: 'Claim Request',
    accessibilityLabel: 'claim-request',
  },
  {
    id: 'settings',
    url: '/settings',
    content: 'Settings',
    accessibilityLabel: 'settings',
  },
  // {
  //   id: 'pricing',
  //   url: '/pricing',
  //   content: 'Pricing',
  //   accessibilityLabel: 'pricing',
  // },
] as TabProps[]);

export const MainNav: FC = () => {
  const tabs = useContext(MainNavContext);
  const urlPath = useLocation().pathname;

  return (
    <ui-nav-menu>
      {tabs.map((tab) => (
        <Link
          rel={tab.id === 'dashboard' ? 'home' : undefined}
          to={tab.url ?? ''}
          className={tab.url === urlPath ? 'active' : ''}
          key={tab.id}
        >
          {tab.content}
        </Link>
      ))}
    </ui-nav-menu>
  );
};
