import { FormLayout, Modal, TextField } from '@shopify/polaris';
import React, { useCallback, useState } from 'react';

export const SendTestEmail: React.FC<{ onTest: (email: string, subject: string) => any }> = ({ onTest }) => {
  const [subject, setSubject] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);

  const handleTest = useCallback(() => {
    if (!email || !subject) {
      return setError(true);
    }

    setError(false);
    setOpen(false);

    onTest(email, subject);
  }, [email, onTest, subject]);

  const handleClose = useCallback(() => {
    setError(false);
    setSubject('');
    setEmail('');
    setOpen(false);
  }, []);

  return <Modal
    title="Send a Test Email"
    onClose={handleClose}
    open={open}
    secondaryActions={[
      {
        onAction: handleClose,
        content: 'Cancel',
      },
    ]}
    primaryAction={{
      content: 'Send',
      onAction: handleTest,
    }}
    activator={
      <button
        className="px-4 py-2 bg-white font-bold shadow-md rounded-lg border"
        onClick={() => setOpen(true)}
      >
        Send Test Mail
      </button>
    }
  >
    <Modal.Section>
      <FormLayout>
        <TextField
          error={error && !subject ? 'Subject is required' : undefined}
          onChange={(value) => setSubject(value)}
          placeholder="Enter a subject line"
          autoComplete="yes"
          requiredIndicator
          value={subject}
          label="Subject"
        />

        <TextField
          error={error && !email ? 'Email is required' : undefined}
          onChange={(value) => setEmail(value)}
          placeholder="Enter an email address"
          requiredIndicator
          autoComplete="yes"
          value={email}
          label="Email"
          type="email"
        />
      </FormLayout>
    </Modal.Section>

  </Modal>;
};
