import { Card, Layout, Page, Text } from '@shopify/polaris';

const Notification = () => {
  return (
    <div className="ml-4 sm:ml-0 mt-10 sm:mt-4">
      <Page>
        <Layout>
          <div className="w-full ml-4 mb-2">
            <Text as="h1" variant="headingLg" alignment="start">
              Notifications
            </Text>
          </div>
          <Card>
            <div className="w-full">l</div>
          </Card>
        </Layout>
      </Page>
    </div>
  );
};

export default Notification;
