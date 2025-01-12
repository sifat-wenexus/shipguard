import TextWithBgColor from '../settings.claim-page/components/TextWithBgColor';
import { ArrowLeftIcon, LayoutSectionIcon } from '@shopify/polaris-icons';
import { Box, Button, Icon, Layout, Page, Text } from '@shopify/polaris';
import { ShadowBevelBox } from '~/components/shadow-bevel-box';
import { HelpModal } from '~/components/help-modal';
import { useNavigate } from '@remix-run/react';

const CheckoutExtension = () => {
  const navigate = useNavigate();
  return (
    <div className="m-2 sm:m-0">
      <Page>
        <Layout>
          <Layout.Section variant="fullWidth">
            <div className="mb-4 flex items-center gap-4">
              <Button icon={ArrowLeftIcon} onClick={()=>navigate(-1)}></Button>
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
                      video="https://www.youtube.com/embed/hMx9vvqnR6Q?si=ZkL-HdLeJUqazpmD"
                      thumbnail="https://cdn.shopify.com/s/files/1/0900/3221/0212/files/Set_Up_Checkout_Extension_Widget.jpg?v=1734177652"
                      duration={60 + 6}
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
                    Extension—ShipGuard: Shipping Protection. Then, click the
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
                        video="https://www.youtube.com/embed/hMx9vvqnR6Q?si=ZkL-HdLeJUqazpmD"
                        thumbnail="https://cdn.shopify.com/s/files/1/0900/3221/0212/files/Set_Up_Checkout_Extension_Widget.jpg?v=1734177652"
                        duration={60  + 6}
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
