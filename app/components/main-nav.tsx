import type { TabProps } from '@shopify/polaris/build/ts/src/components/Tabs/types';
import { Link, useLocation } from '@remix-run/react';
import type { FC } from 'react';

const tabs: TabProps[] = [
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
  {
    id: 'faqs',
    url: '/faqs',
    content: 'FAQs',
    accessibilityLabel: 'faqs',
  },
  // {
  //   id: 'support',
  //   url: '/support',
  //   content: 'Help & Support',
  //   accessibilityLabel: 'Help & Support',
  // },
  // {
  //   id: 'pricing',
  //   url: '/pricing',
  //   content: 'Pricing',
  //   accessibilityLabel: 'pricing',
  // },
];

export const MainNav: FC = () => {
  const location = useLocation();

  return (
    <ui-nav-menu>
      {tabs.map((tab) => (
        <Link
          className={tab.url === location.pathname ? 'active' : ''}
          rel={tab.id === 'dashboard' ? 'home' : undefined}
          to={tab.url ?? ''}
          key={tab.id}
        >
          {tab.content}
        </Link>
      ))}
    </ui-nav-menu>
  );
};
