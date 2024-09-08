import TextWithBgColor from '../settings.claim-page/components/TextWithBgColor';
import { ArrowLeftIcon, LayoutSectionIcon } from '@shopify/polaris-icons';
import { Box, Button, Icon, Layout, Page, Text } from '@shopify/polaris';
import { ShadowBevelBox } from '~/components/shadow-bevel-box';
import { HelpModal } from '~/components/help-modal';

const CheckoutExtension = () => {
  return (
    <div className="m-2 sm:m-0">
      <Page>
        <Layout>
          <Layout.Section variant="fullWidth">
            <div className="mb-4 flex items-center gap-4">
              <Button icon={ArrowLeftIcon} url="/settings"></Button>
              <Text as="h1" variant="headingLg">
                Checkout Extension Setup
              </Text>
            </div>

            <ShadowBevelBox
              icon={<Icon source={LayoutSectionIcon} />}
              title="Set Up Checkout Extension Widget"
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
                    Follow these steps to enable the Checkout App Block and
                    start upselling package protection on your store’s checkout
                    page:
                  </Text>
                  <Text as="p">
                    <b>Step 1: </b>
                    Navigate to your store's <TextWithBgColor
                      text={'Admin'}
                    />{' '}
                    {'>'} <TextWithBgColor text={'Online Store'} /> {'>'}{' '}
                    <TextWithBgColor text="Themes" />.
                  </Text>
                  <Text as="p">
                    <b>Step 2: </b>
                    Select the theme where you want to enable the Checkout
                    Extension—Inhouse Shipping Protection. Then, click the
                    <TextWithBgColor text="Customize" /> button.
                  </Text>
                  <Text as="p">
                    <b>Step 3: </b>
                    In the theme editor, choose{' '}
                    <TextWithBgColor text="Checkout" /> {'>'} from the
                    <TextWithBgColor text="page" /> selector dropdown.
                  </Text>
                  <Text as="p">
                    <b>Step 4: </b>
                    Scroll to the bottom left corner and find the{' '}
                    <TextWithBgColor text="Add app block" /> button. Click on
                    it.
                  </Text>
                  <Text as="p">
                    <b>Step 5: </b>
                    Search for <TextWithBgColor text="Shipping Protection" /> in
                    the app blocks list and select it.
                  </Text>
                  <Text as="p">
                    <b>Step 6: </b>
                    Finally, click the <TextWithBgColor text="save" /> button in
                    the top-right corner to apply your changes.
                  </Text>
                </div>
                <div className="w-[45%] border rounded-md hidden sm:block sm:ml-2">
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

export default CheckoutExtension;
