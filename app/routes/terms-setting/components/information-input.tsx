import { Box, TextField } from '@shopify/polaris';

const InformationInput = ({ formState }) => {
  return (
    <div className="wenexus-input-text">
      <Box paddingBlockStart="100" paddingBlockEnd="100">
        <p className="mb-2">
          <b>Checkbox text on the cart page</b>
        </p>
        <TextField
          helpText="EX :- I agree with the [Text](https://www.example.com)."
          onChange={(text) => formState.addToStaged({ text })}
          error={formState.messages.text?.message}
          onBlur={() => formState.commitStaged()}
          label=""
          placeholder="Example : I agree with the [Text](https://www.example.com)"
          value={formState.staged.text}
          autoComplete="yes"
          requiredIndicator
          maxLength={100}
          multiline={2}
          showCharacterCount
        />
      </Box>
      <Box paddingBlockStart="100" paddingBlockEnd="100">
        <p className="mb-2">
          <b>Checkbox Warning Text on cart page</b>
        </p>
        <TextField
          helpText="The Error that will be shown if the user tries to go to checkout without accepting your terms and conditions."
          onChange={(warningText) => formState.addToStaged({ warningText })}
          error={formState.messages.warningText?.message}
          onBlur={() => formState.commitStaged()}
          value={formState.staged.warningText}
          label=""
          placeholder="Example : You have to accept our [Text](https://www.example.com) and policy."
          autoComplete="yes"
          requiredIndicator
          maxLength={250}
          multiline={2}
          showCharacterCount
        />
      </Box>
    </div>
  );
};

export default InformationInput;
