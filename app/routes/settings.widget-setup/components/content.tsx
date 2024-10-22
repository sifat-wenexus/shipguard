import { Box, FormLayout, Icon, TextField } from '@shopify/polaris';
import { ShadowBevelBox } from '~/components/shadow-bevel-box';
import { ContentIcon } from '@shopify/polaris-icons';

const Content = ({ formState }) => {
  const { state } = formState;
  return (
    <ShadowBevelBox
      icon={<Icon source={ContentIcon} />}
      title="Content"
      className="my-4"
    >
      <FormLayout>
        <FormLayout.Group>
          <Box paddingBlockStart="100" paddingBlockEnd="100">
            <TextField
              label="Add-on title (Name of the insurance)"
              autoComplete="yes"
              onChange={(title) => formState.addToStaged({ title })}
              onBlur={(event) => {
                const target = event?.target as HTMLInputElement;
                if (target.value !== '') {
                  formState.commitStaged();
                } else {
                  formState.addToStaged({ title: state.title });
                }
              }}
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
              onBlur={(event) => {
                const target = event?.target as HTMLInputElement;
                if (target.value !== '') {
                  formState.commitStaged();
                } else {
                  formState.addToStaged({
                    enabledDescription: state.enabledDescription,
                  });
                }
              }}
              value={formState.staged.enabledDescription}
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
              onBlur={(event) => {
                const target = event?.target as HTMLInputElement;
                if (target.value !== '') {
                  formState.commitStaged();
                } else {
                  formState.addToStaged({
                    disabledDescription: state.disabledDescription,
                  });
                }
              }}
              value={formState.staged.disabledDescription}
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
              onBlur={(event) => {
                const target = event?.target as HTMLInputElement;
                if (target.value !== '') {
                  formState.commitStaged();
                } else {
                  formState.addToStaged({
                    policyUrl: state.policyUrl,
                  });
                }
              }}
              value={formState.staged.policyUrl}
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
