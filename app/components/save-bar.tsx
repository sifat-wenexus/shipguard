import { Box, Button, ButtonGroup, ContextualSaveBar } from '@shopify/polaris';
import type { FormState } from '~/hooks/use-form-state';
import * as Icons from '@shopify/polaris-icons';
import { useCallback } from 'react';
import type { FC } from 'react';
import _ from 'lodash';

interface Props {
  formState: FormState<any>;
  onSave: () => any;
}

export const SaveBar: FC<Props> = ({ formState, onSave }) => {
  const save = useCallback(async () => {
    const validationResult = await formState.validate(formState.state);

    if (_.isEmpty(validationResult)) {
      onSave();
    }
  }, [formState, onSave]);

  if (formState.changes.length === 1) return null;

  return (
    <ContextualSaveBar
      message={formState.isDirty ? 'Unsaved changes' : 'No changes to save'}
      discardAction={{
        content: 'Discard',
        onAction: formState.reset,
        discardConfirmationModal: true,
      }}
      saveAction={{
        content: 'Save',
        disabled: !formState.isDirty,
        onAction: save,
      }}
      // secondaryMenu={
      //   <Box width="150px">
      //     <ButtonGroup variant="segmented" noWrap fullWidth>
      //       <Button
      //         disabled={formState.cursor === 0}
      //         onClick={formState.undo}
      //         icon={Icons.UndoIcon}
      //         variant="tertiary"
      //         size="large"
      //       >
      //         Undo
      //       </Button>
      //       <Button
      //         disabled={formState.cursor === formState.changes.length - 1}
      //         icon={Icons.RedoIcon}
      //         onClick={formState.redo}
      //         variant="tertiary"
      //         size="large"
      //       >
      //         Redo
      //       </Button>
      //     </ButtonGroup>
      //   </Box>
      // }
    />
  );
};
