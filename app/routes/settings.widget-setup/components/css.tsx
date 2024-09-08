import { FormLayout, Icon, Box, Link } from '@shopify/polaris';
import { ShadowBevelBox } from '~/components/shadow-bevel-box';
import { CodeIcon } from '@shopify/polaris-icons';
import { Editor } from '@monaco-editor/react';
const Css = ({ formState }) => {
  return (
    <ShadowBevelBox
      icon={<Icon source={CodeIcon} />}
      title="CSS"
      className="my-4"
    >
      <FormLayout>
        <FormLayout.Group>
          <Box paddingBlockStart="100" paddingBlockEnd="100">
            <Box>
              To customize the widget's style
              <Link url="contract" target="_blank" removeUnderline>
                {' '}
                contact us{' '}
              </Link>{' '}
              and we'll add CSS here. It won't affect your store theme
            </Box>
          </Box>
          <Box paddingBlockStart="100" paddingBlockEnd="100">
            <div
              onBlur={() => formState.commitStaged()}
              style={{ zIndex: '9999999' }}
            >
              <Editor
                height="200px"
                defaultLanguage="css"
                defaultValue="/* add your css style */"
                onChange={(css) => formState.addToStaged({ css })}
                theme="vs-dark"
                value={formState.state.css}
                options={{
                  colorDecorators: false,
                  fontSize: 13,
                  minimap: { enabled: false },
                  scrollbar: {
                    verticalScrollbarSize: 7,
                    horizontalScrollbarSize: 7,
                  },
                }}
              />
            </div>
          </Box>
        </FormLayout.Group>
      </FormLayout>
    </ShadowBevelBox>
  );
};

export default Css;
