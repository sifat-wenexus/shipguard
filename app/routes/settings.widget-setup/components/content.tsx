import { Box, FormLayout, Icon, TextField } from '@shopify/polaris';
import { ShadowBevelBox } from '~/components/shadow-bevel-box';
import { ContentIcon } from '@shopify/polaris-icons';

const Content = ({ formState }) => {

  return (
    <ShadowBevelBox
      icon={<Icon source={ContentIcon} />}
      title="Content"
      className="my-4"
    >
      <FormLayout>
        <FormLayout.Group>
          { formState.messages.enabledDescription?.message }
          <Box paddingBlockStart="100" paddingBlockEnd="100">
            <TextField
              label="Add-on title (Name of the insurance)"
              autoComplete="yes"
              onChange={(title) => formState.addToStaged({ title })}
              error={formState.messages.title?.message}
              onBlur={formState.commitStaged}
              value={formState.staged.title}
              showCharacterCount
              maxLength={20}
            />
          </Box>

          <Box paddingBlockStart="100" paddingBlockEnd="100">
            <TextField
              label="Enabled description (Upsell description)"
              autoComplete="yes"
              onChange={(enabledDescription) =>
                formState.addToStaged({ enabledDescription })
              }
              error={formState.messages.enabledDescription?.message}
              value={formState.staged.enabledDescription}
              onBlur={formState.commitStaged}
              showCharacterCount
              maxLength={70}
              multiline={2}
            />
          </Box>
          <Box paddingBlockStart="100" paddingBlockEnd="100">
            <TextField
              label="Disabled description (Upsell description)"
              autoComplete="yes"
              onChange={(disabledDescription) =>
                formState.addToStaged({ disabledDescription })
              }
              onBlur={formState.commitStaged}
              value={formState.staged.disabledDescription}
              error={formState.messages.disabledDescription?.message}
              showCharacterCount
              maxLength={70}
              multiline={2}
            />
          </Box>
          <Box paddingBlockStart="100" paddingBlockEnd="100">
            <TextField
              type="url"
              prefix="https://"
              label="Refund policy url"
              autoComplete="yes"
              onChange={(policyUrl) =>
                formState.addToStaged({
                  policyUrl: policyUrl.replace('https://', ''),
                })
              }
              onBlur={formState.commitStaged}
              value={formState.staged.policyUrl}
              error={formState.messages.policyUrl?.message}
              showCharacterCount
              maxLength={100}
            />
          </Box>
        </FormLayout.Group>
      </FormLayout>
    </ShadowBevelBox>
  );
};

export default Content;

// TODO: theme detection and package protection support
// TODO: mini cart package protection issues
