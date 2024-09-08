import { ChatIcon, QuestionCircleIcon } from '@shopify/polaris-icons';
import { ShadowBevelBox } from '~/components/shadow-bevel-box';
import { Box, Button, Grid } from '@shopify/polaris';
import { HelpModal } from '~/components/help-modal';

const Tutorial = () => {
  return (
    <Box paddingBlockEnd="400">
      <Grid columns={{ md: 3, lg: 2, xl: 3, sm: 2, xs: 1 }}>
        <Grid.Cell>
          <ShadowBevelBox title="Watch the Tutorial" divider={false}>
            <Box paddingBlockStart="300">
              <HelpModal
                video="https://www.youtube.com/embed/rgZU5pDf6mw?si=EeaXQcg8gvEz36RV"
                thumbnail="https://i.ytimg.com/vi/rgZU5pDf6mw/maxresdefault.jpg"
                duration={60 * 9 + 29}
              />
            </Box>
          </ShadowBevelBox>
        </Grid.Cell>

        <Grid.Cell>
          <ShadowBevelBox
            className="h-full bg-[var(--p-color-bg-surface)]"
            title="Check our Help Center"
            divider={false}
          >
            <Box paddingBlockStart="300" paddingBlockEnd="300">
              Learn how to use Scroll to Top Button and get the most out of it.
              Check our Help Center for more information.
            </Box>

            <Button icon={QuestionCircleIcon}>Get Help</Button>
          </ShadowBevelBox>
        </Grid.Cell>

        <Grid.Cell>
          <ShadowBevelBox
            className="h-full bg-[var(--p-color-bg-surface)]"
            title="We're here for you, 24/7"
            divider={false}
          >
            <Box paddingBlockStart="300" paddingBlockEnd="300">
              We're here to help you get the most out of Scroll to Top Button.
              If you have any questions, please contact us.
            </Box>

            <Button icon={ChatIcon}>Contact us</Button>
          </ShadowBevelBox>
        </Grid.Cell>
      </Grid>
    </Box>
  );
};

export default Tutorial;
