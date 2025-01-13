import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import { shopify as shopifyRemix } from '../../modules/shopify.server';
import { useLoaderData, useNavigate } from '@remix-run/react';
import { EmailIcon, ChatIcon } from '@shopify/polaris-icons';
import { Box, Button, Icon, Page } from '@shopify/polaris';
import { PageShell } from '~/components/page-shell';
import { prisma } from '~/modules/prisma.server';

import style from './style/route.css';
import { useCallback } from 'react';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: style }];

export async function loader({ request }: LoaderFunctionArgs) {
  const ctx = await shopifyRemix.authenticate.admin(request);

  const { currencyCode } = await prisma.store.findFirstOrThrow({
    where: { id: ctx.session.storeId },
    select: { currencyCode: true },
  });

  return {
    currencyCode,
  };
}

export default function Faqs() {
  const navigate = useNavigate();
  const data = useLoaderData<typeof loader>();

  const openChat = useCallback(() => {
    const element = document.querySelector('.zsiq-float');
    if (element instanceof HTMLElement) {
      element.click(); // Safely calls the click method
    } else {
      console.error(
        'Element with class .zsiq-float not found or is not an HTMLElement.'
      );
    }
  }, []);

  return (
    <PageShell currencyCode={data.currencyCode}>
      <Page
        subtitle=""
        filterActions
        backAction={{ onAction: () => navigate(-1) }}
        // primaryAction={
        //   <Button
        //     url="/request-new-feature"
        //     variant="primary"
        //     // icon={PlusIcon}
        //     tone="success"
        //   >
        //     Request New Feature
        //   </Button>
        // }
        title="Need help?"
      >
        <>
          <br />
          <Box paddingBlockEnd="400">
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 gap-2 `}
            >
              {' '}
              {/*Grid columns={{ md: 2, lg: 2, xl: 2, sm: 2, xs: 1 }}*/}
              <div className={`h-full col-span-1 text-center`}>
                <div
                  className={`border rounded-lg bg-white shadow-sm p-4 h-full`}
                >
                  <div className="customIconSize">
                    <Icon source={ChatIcon} />
                  </div>

                  <Box paddingBlockStart="300" paddingBlockEnd="300">
                    Talk with our team now. We will respond in a few minutes.
                  </Box>

                  <Button onClick={openChat}>Chat with us</Button>
                </div>
              </div>
              <div className={`h-full col-span-1 text-center `}>
                <div
                  className={`border rounded-lg bg-white shadow-sm p-4 h-full`}
                >
                  <div className="customIconSize">
                    <Icon source={EmailIcon} />
                  </div>

                  <Box paddingBlockStart="300" paddingBlockEnd="300">
                    No time to chat? Email us, and we'll respond within a few
                    minutes.
                  </Box>

                  <Button url={'mailto:hello@wenexus.io'} target={'_blank'}>
                    Email us
                  </Button>
                </div>
              </div>
            </div>
          </Box>
        </>
      </Page>
    </PageShell>
  );
}
