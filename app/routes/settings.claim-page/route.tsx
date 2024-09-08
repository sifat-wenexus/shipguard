import { Box, Button, Icon, Layout, Page, Text } from '@shopify/polaris';
import { ShadowBevelBox } from '~/components/shadow-bevel-box';
import { useLivePageData } from '~/hooks/use-live-page-data';
import TextWithBgColor from './components/TextWithBgColor';
import { HelpModal } from '~/components/help-modal';
import {
  ArrowLeftIcon,
  DomainRedirectIcon,
  LayoutSectionIcon,
  PageIcon,
} from '@shopify/polaris-icons';

const ClaimPageSetup = () => {
  const { storeInfo } = useLivePageData();
  console.log(storeInfo ? '=' : '-');
  return (
    <div className="m-2 sm:m-0">
      <Page>
        <Layout>
          <Layout.Section variant="fullWidth">
            <div className="mb-4 flex items-center gap-4">
              <Button icon={ArrowLeftIcon} url="/settings"></Button>
              <Text as="h1" variant="headingLg">
                Customer Claim Page Setup
              </Text>
            </div>
            <ShadowBevelBox
              icon={<Icon source={LayoutSectionIcon} />}
              title="Setup Claim Page Template"
              className="my-4"
            >
              {' '}
              <div className="w-full mb-6 border rounded-md sm:hidden">
                <ShadowBevelBox title="Watch the Tutorial" divider={false}>
                  <Box paddingBlockStart="300">
                    <HelpModal
                      video="https://www.youtube.com/embed/rgZU5pDf6mw?si=EeaXQcg8gvEz36RV"
                      thumbnail="https://i.ytimg.com/vi/rgZU5pDf6mw/maxresdefault.jpg"
                      duration={60 * 9 + 29}
                    />
                  </Box>
                </ShadowBevelBox>
              </div>
              <div className="flex justify-between items-center">
                <div className="space-y-6">
                  <Text as="p">
                    <b>Step 1: </b>
                    Go to your store <TextWithBgColor text={'Admin'} /> {'>'}{' '}
                    <TextWithBgColor text={'Online Store'} /> {'>'}{' '}
                    <TextWithBgColor text="Themes" />.
                  </Text>
                  <Text as="p">
                    <b>Step 2: </b>
                    Select the theme you want to Add and click on the{' '}
                    <TextWithBgColor text="Customize" /> button. or click below
                    button.
                    <br className="my-2" />
                    <br />
                    <Button
                      variant="primary"
                      tone="success"
                      url={
                        storeInfo?.store
                          ? `https://admin.shopify.com/store/${storeInfo?.store?.name}/themes/${storeInfo?.theme?.id}/editor`
                          : ''
                      }
                      target="_blank"
                    >
                      Customize
                    </Button>
                  </Text>
                  <Text as="p">
                    <b>Step 3: </b>
                    Select <TextWithBgColor text="Pages" /> {'>'}{' '}
                    <TextWithBgColor
                      text="Create
                    Template"
                    />{' '}
                    Give Name <TextWithBgColor text="Claim Request" /> Based on{' '}
                    <TextWithBgColor text="Default Page" />.
                  </Text>
                  <Text as="p">
                    <b>Step 4: </b>
                    Navigate to <TextWithBgColor text="Section" /> {'>'}{' '}
                    <TextWithBgColor text="Add Section" /> {'>'}{' '}
                    <TextWithBgColor text="Apps" /> then{' '}
                    <TextWithBgColor text="Claim Page" />.
                  </Text>
                  <Text as="p">
                    <b>Step 5: </b>
                    Click on the <TextWithBgColor text="Save" /> Button located
                    in the top-right corner of the page to save your changes.
                  </Text>
                </div>
                <div className="w-72 border rounded-md hidden sm:block">
                  <ShadowBevelBox title="Watch the Tutorial" divider={false}>
                    <Box paddingBlockStart="300">
                      <HelpModal
                        video="https://www.youtube.com/embed/rgZU5pDf6mw?si=EeaXQcg8gvEz36RV"
                        thumbnail="https://i.ytimg.com/vi/rgZU5pDf6mw/maxresdefault.jpg"
                        duration={60 * 9 + 29}
                      />
                    </Box>
                  </ShadowBevelBox>
                </div>
              </div>
            </ShadowBevelBox>
            <ShadowBevelBox
              icon={<Icon source={PageIcon} />}
              title="Add Claim Page"
            >
              <div className="w-full mb-6 border rounded-md sm:hidden">
                <ShadowBevelBox title="Watch the Tutorial" divider={false}>
                  <Box paddingBlockStart="300">
                    <HelpModal
                      video="https://www.youtube.com/embed/rgZU5pDf6mw?si=EeaXQcg8gvEz36RV"
                      thumbnail="https://i.ytimg.com/vi/rgZU5pDf6mw/maxresdefault.jpg"
                      duration={60 * 9 + 29}
                    />
                  </Box>
                </ShadowBevelBox>
              </div>
              <div className="flex justify-between items-center">
                <div className="space-y-6">
                  <Text as="p">
                    <b>Step 1: </b>
                    Go to your store <TextWithBgColor text={'Admin'} /> {'>'}{' '}
                    <TextWithBgColor text={'Online Store'} /> {'>'}{' '}
                    <TextWithBgColor text="Pages" /> and click on{' '}
                    <TextWithBgColor text="Add Page" />.
                  </Text>
                  <Text as="p">
                    <b>Step 2: </b>
                    Give Title <TextWithBgColor text="Claim Request" /> for
                    customer claim page.
                  </Text>
                  <Text as="p">
                    <b>Step 3: </b>
                    Choose <TextWithBgColor text="Theme Template" /> from select
                    option <TextWithBgColor text="Claim Request" /> .
                  </Text>
                  <Text as="p">
                    <b>Step 4: </b>
                    Click on <TextWithBgColor text="Save" /> Button.
                  </Text>
                </div>
                <div className="w-72 border rounded-md hidden sm:block">
                  <ShadowBevelBox title="Watch the Tutorial" divider={false}>
                    <Box paddingBlockStart="300">
                      <HelpModal
                        video="https://www.youtube.com/embed/rgZU5pDf6mw?si=EeaXQcg8gvEz36RV"
                        thumbnail="https://i.ytimg.com/vi/rgZU5pDf6mw/maxresdefault.jpg"
                        duration={60 * 9 + 29}
                      />
                    </Box>
                  </ShadowBevelBox>
                </div>
              </div>
            </ShadowBevelBox>

            <ShadowBevelBox
              icon={<Icon source={DomainRedirectIcon} />}
              title="Add claim page redirection URL steps"
              className="my-4"
            >
              <div className="w-full mb-6 border rounded-md sm:hidden">
                <ShadowBevelBox title="Watch the Tutorial" divider={false}>
                  <Box paddingBlockStart="300">
                    <HelpModal
                      video="https://www.youtube.com/embed/rgZU5pDf6mw?si=EeaXQcg8gvEz36RV"
                      thumbnail="https://i.ytimg.com/vi/rgZU5pDf6mw/maxresdefault.jpg"
                      duration={60 * 9 + 29}
                    />
                  </Box>
                </ShadowBevelBox>
              </div>
              <div className="flex justify-between items-center">
                <div className="space-y-6">
                  <Text as="p">
                    <b>Step 1: </b>
                    Go to your store <TextWithBgColor text={'Admin'} /> {'>'}{' '}
                    <TextWithBgColor text={'Online Store'} /> {'>'}{' '}
                    <TextWithBgColor text="Navigation" />.
                  </Text>
                  <Text as="p">
                    <b>Step 2: </b>
                    Click on <TextWithBgColor text="Main Menu/Footer Menu" />{' '}
                    {'>'} <TextWithBgColor text="Add menu item" />.
                  </Text>
                  <Text as="p">
                    <b>Step 3: </b>
                    Give name Ex: <TextWithBgColor text="Claim Request" />.
                  </Text>
                  <Text as="p">
                    <b>Step 4: </b>
                    Click on search or paste a link{' '}
                    <TextWithBgColor text="button" /> {'>'}{' '}
                    <TextWithBgColor text="Pages" /> {'>'}{' '}
                    <TextWithBgColor text="Claim Request" />.
                  </Text>
                  <Text as="p">
                    <b>Step 5: </b>
                    Click on <TextWithBgColor text="Add button" /> {'>'}{' '}
                    <TextWithBgColor text="save" /> the changes.
                  </Text>
                </div>
                <div className="w-72 border rounded-md hidden sm:block">
                  <ShadowBevelBox title="Watch the Tutorial" divider={false}>
                    <Box paddingBlockStart="300">
                      <HelpModal
                        video="https://www.youtube.com/embed/rgZU5pDf6mw?si=EeaXQcg8gvEz36RV"
                        thumbnail="https://i.ytimg.com/vi/rgZU5pDf6mw/maxresdefault.jpg"
                        duration={60 * 9 + 29}
                      />
                    </Box>
                  </ShadowBevelBox>
                </div>
              </div>
            </ShadowBevelBox>
          </Layout.Section>
        </Layout>
      </Page>
    </div>
  );
};

export default ClaimPageSetup;
