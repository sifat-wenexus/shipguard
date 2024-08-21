import { ShadowBevelBox } from '~/components/shadow-bevel-box';
import { Box, Icon, Layout, Text } from '@shopify/polaris';
import TextWithBgColor from './text-with-bg-color';
import {
  DomainRedirectIcon,
  LayoutSectionIcon,
  PageIcon,
} from '@shopify/polaris-icons';
import { useBetterFetcher } from '~/hooks/use-better-fetcher';
import { HelpModal } from '~/components/help-modal';

const CodeSetup = () => {
  const fetcher = useBetterFetcher();
  const handleGetData = async () => {
    // const fetchdata = await fetch(
    //   '/get-order-fulfilment-data?email=sifatfahimul@gamil.com&orderId=1073'
    // )
    //   .then((response) => response.json())
    //   .catch((error) => console.log(error));
    // const data = await fetcher.submit(
    //   { loading: true, toast: false },
    //   {
    //     action: 'filterOption',
    //     state: JSON.stringify({
    //       name: 'name',
    //     }),
    //   },
    //   {
    //     action:
    //       '/get-order-fulfilment-data?email=sifatfahimul@gamil.com&orderId=1073',
    //     // method: 'POST',
    //   }
    // );
    // console.log({ data, fetchdata });
  };
  return (
    <>
      {/* <button onClick={handleGetData}>get data</button> */}
      {/* <Layout.Section variant="fullWidth"> */}
      {/* <ShadowBevelBox
          icon={<Icon source={PageIcon} />}
          title="Add claim page steps"
        >
          <div className="space-y-6">
            <Text as="p">
              <b>Step 1: </b>
              Go to your store <TextWithBgColor text={'Admin'} /> {'>'}{' '}
              <TextWithBgColor text={'Online Store'} /> {'>'}{' '}
              <TextWithBgColor text="Pages" /> and click on Add Page.
            </Text>
            <Text as="p">
              <b>Step 2: </b>
              Give Title <TextWithBgColor text={`"Claim Page"`} /> for customer
              claim page and then click on save button.
            </Text>
          </div>
        </ShadowBevelBox> */}
      <ShadowBevelBox
        icon={<Icon source={DomainRedirectIcon} />}
        title="Add claim page redirection URL steps"
      >
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
              Click on <TextWithBgColor text="Main Menu/Footer Menu" /> {'>'}{' '}
              <TextWithBgColor text="Add menu item" />.
            </Text>
            <Text as="p">
              <b>Step 3: </b>
              Give name Ex: <TextWithBgColor text="Claim Request" />.
            </Text>
            <Text as="p">
              <b>Step 4: </b>
              Click on search or paste a link <TextWithBgColor text="button" />{' '}
              {'>'} <TextWithBgColor text="Pages" /> {'>'}{' '}
              <TextWithBgColor text="Claim Request" />.
            </Text>
            <Text as="p">
              <b>Step 5: </b>
              Click on <TextWithBgColor text="Add button" /> {'>'}{' '}
              <TextWithBgColor text="save" /> the changes.
            </Text>
          </div>
          <div className="w-72 border rounded-md">
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
        icon={<Icon source={LayoutSectionIcon} />}
        title="Add Claim Page Section"
        className="my-4"
      >
        {' '}
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
              <TextWithBgColor text="Customize" /> button.
            </Text>
            <Text as="p">
              <b>Step 3: </b>
              Select <TextWithBgColor text="pages" /> {'>'}{' '}
              <TextWithBgColor text="claim-request" />.
            </Text>
            <Text as="p">
              <b>Step 4: </b>
              Navigate to <TextWithBgColor text="Section" /> {'>'}{' '}
              <TextWithBgColor text="Add Section" /> {'>'}{' '}
              <TextWithBgColor text="Apps" /> then Claim Page by Overall.
            </Text>
            <Text as="p">
              <b>Step 5: </b>
              Click on the save button located in the top-right corner of the
              page to save your changes.
            </Text>
          </div>
          <div className="w-72 border rounded-md">
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
      {/* </Layout.Section> */}
    </>
  );
};

export default CodeSetup;
