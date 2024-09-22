import { useLocation } from '@remix-run/react';
import { Icon, Layout, Link, Page, Tabs } from '@shopify/polaris';
import {
  ChartHistogramSecondLastIcon,
  ClipboardCheckIcon,
  NotificationIcon,
  OrderIcon,
  PriceListIcon,
  SettingsIcon,
} from '@shopify/polaris-icons';
import { useState, useCallback, useEffect } from 'react';

export function Nav() {
  const [selected, setSelected] = useState(0);
  const urlPath = useLocation().pathname;

  const tabs = [
    {
      id: 'dashboard',
      content: (
        <Link url="/dashboard" removeUnderline id="wenexus-nav-link">
          <div className="flex items-center gap-1">
            <Icon source={ChartHistogramSecondLastIcon}></Icon> Dashboard
          </div>
        </Link>
      ),
    },
    {
      id: 'order',
      content: (
        <Link url="/order" removeUnderline id="wenexus-nav-link">
          {' '}
          <div className="flex items-center gap-1">
            <Icon source={OrderIcon}></Icon> Order
          </div>
        </Link>
      ),
    },
    {
      id: 'claim-request',
      content: (
        <Link url="/claim-request" removeUnderline id="wenexus-nav-link">
          <div className="flex items-center gap-1">
            <Icon source={ClipboardCheckIcon}></Icon> Claim Request
          </div>
        </Link>
      ),
    },
    {
      id: 'settings',
      content: (
        <Link url="/settings" removeUnderline id="wenexus-nav-link">
          <div className="flex items-center gap-1">
            <Icon source={SettingsIcon}></Icon> Settings
          </div>
        </Link>
      ),
    },
    // {
    //   id: 'notification',
    //   content: (
    //     <Link url="/notification" removeUnderline id="wenexus-nav-link">
    //       <div className="flex items-center gap-1">
    //         <Icon source={NotificationIcon}></Icon> Notification
    //       </div>
    //     </Link>
    //   ),
    // },
    {
      id: 'pricing',
      content: (
        <Link url="/pricing" removeUnderline id="wenexus-nav-link">
          <div className="flex items-center gap-1">
            <Icon source={PriceListIcon}></Icon> Pricing
          </div>
        </Link>
      ),
    },
  ];

  useEffect(() => {
    const indexOfTab = tabs.findIndex((tab) => `/${tab.id}` === urlPath);
    if (
      urlPath === '/settings/claim-page' ||
      urlPath === '/settings/widget-setup' ||
      urlPath === '/settings/smtp-setup' ||
      urlPath === '/settings/email-template'
    ) {
      setSelected(3);
      return;
    }
    setSelected(indexOfTab === -1 ? 0 : indexOfTab);
  }, [urlPath]);
  const switchTab = useCallback((e) => {
    console.log(tabs[e].id);
  }, []);

  return (
    <div
      style={{
        position: 'sticky',
        zIndex: 99,
        top: '0px',
        backgroundColor: '#F1F1F1',
      }}
      className="hidden sm:block"
    >
      <Page>
        <Layout>
          <Layout.Section variant="fullWidth">
            <div className="bg-white rounded shadow p-3 my-2 sticky top-32 wenexus-tab">
              <Tabs
                tabs={tabs as any}
                selected={selected}
                onSelect={switchTab}
              ></Tabs>
            </div>
          </Layout.Section>
        </Layout>
      </Page>
    </div>
  );
}
