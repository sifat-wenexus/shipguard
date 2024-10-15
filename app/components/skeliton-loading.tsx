import {
  SkeletonPage,
  Layout,
  LegacyCard,
  SkeletonBodyText,
  TextContainer,
  SkeletonDisplayText,
  SkeletonThumbnail,
} from '@shopify/polaris';
import React from 'react';

function SkeletonLoading() {
  return (
    <Layout>
      <Layout.Section variant="oneHalf">
        <div className="bg-white border rounded-md p-4 ">
          <SkeletonDisplayText size="small" />
          <br />
          <SkeletonBodyText />
          <br />
          <SkeletonBodyText />
          <br />

          <SkeletonBodyText />
          <br />
          <SkeletonBodyText />
          <br />
          <SkeletonThumbnail size="medium" />
          <br />
          <SkeletonDisplayText size="large" />
        </div>{' '}
      </Layout.Section>
      <Layout.Section variant="oneThird">
        <div className="bg-white border rounded-md p-5 ">
          <SkeletonBodyText />
          <br />
          <SkeletonBodyText lines={5} />
        </div>{' '}
      </Layout.Section>
      {/* <SkeletonPage fullWidth>
        <Layout>
          <Layout.Section>
            <LegacyCard sectioned>
              <SkeletonBodyText />
            </LegacyCard>
            <LegacyCard sectioned>
              <TextContainer>
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText />
              </TextContainer>
            </LegacyCard>
            <LegacyCard sectioned>
              <TextContainer>
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText />
              </TextContainer>
            </LegacyCard>
          </Layout.Section>
          <Layout.Section variant="oneThird">
            <LegacyCard>
              <LegacyCard.Section>
                <TextContainer>
                  <SkeletonDisplayText size="small" />
                  <SkeletonBodyText lines={2} />
                </TextContainer>
              </LegacyCard.Section>
              <LegacyCard.Section>
                <SkeletonBodyText lines={1} />
              </LegacyCard.Section>
            </LegacyCard>
            <LegacyCard subdued>
              <LegacyCard.Section>
                <TextContainer>
                  <SkeletonDisplayText size="small" />
                  <SkeletonBodyText lines={2} />
                </TextContainer>
              </LegacyCard.Section>
              <LegacyCard.Section>
                <SkeletonBodyText lines={2} />
              </LegacyCard.Section>
            </LegacyCard>
          </Layout.Section>
        </Layout>
      </SkeletonPage> */}
    </Layout>
  );
}

export default SkeletonLoading;
