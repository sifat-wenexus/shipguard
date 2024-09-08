import { Button, Card, Layout, Page, Text } from '@shopify/polaris';
import { ArrowLeftIcon } from '@shopify/polaris-icons';

const EmailTemplate = () => {
  return (
    <div>
      <div className="ml-4 sm:ml-0 mt-10 sm:mt-4">
        <Page>
          <Layout>
            <Layout.Section variant="fullWidth">
              <div className="mb-4 flex items-center gap-4">
                <Button icon={ArrowLeftIcon} url="/settings"></Button>
                <Text as="h1" variant="headingLg">
                  Email Template Setup
                </Text>
              </div>
            </Layout.Section>
          </Layout>
        </Page>
      </div>
    </div>
  );
};

export default EmailTemplate;
