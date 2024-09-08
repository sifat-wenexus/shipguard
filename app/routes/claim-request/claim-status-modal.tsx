import { Button, Modal, ChoiceList, TextField } from '@shopify/polaris';
import { useBetterFetcher } from '~/hooks/use-better-fetcher';
import { useState, useCallback } from 'react';

const ClaimStatusModal = ({ data, setRefetch }) => {
  const fetcher = useBetterFetcher();
  const [active, setActive] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([
    data.claimStatus,
  ]);
  const [cancelText, setCancelText] = useState(
    data.claimStatus === 'CANCEL' ? data.claimStatusMessage : ''
  );
  const [approveText, setApproveText] = useState(
    data.claimStatus === 'APPROVE' ? data.claimStatusMessage : ''
  );
  const [loading, setLoading] = useState(false);

  const handleModalChange = useCallback(() => setActive(!active), [active]);
  const handleClose = () => {
    handleModalChange();
    handleSelectedStatus([]);
  };

  console.log(data);

  const handleSubmit = async () => {
    setLoading(true);
    await fetcher
      .submit(
        { loading: true, toast: true },
        {
          action: 'changeClaimStatus',
          state: JSON.stringify({
            cancelText,
            approveText,
            selectedStatus,
            fulfillmentId: data.id,
          }),
        },
        {
          action: '/get-claim-order-data',
          method: 'POST',
        }
      )
      .then((e) => {
        setLoading(false);
        setActive(false);
        setRefetch((p) => p + 1);
      })
      .catch((err) => setLoading(false));
  };

  const handleSelectedStatus = useCallback(
    (value: string[]) => setSelectedStatus(value),
    []
  );

  const activator = (
    <Button
      onClick={handleModalChange}
      accessibilityLabel="Change Claim Status"
      variant="primary"
      tone="success"
    >
      Change Claim Status
    </Button>
  );
  return (
    <div>
      <Modal
        activator={activator}
        open={active}
        onClose={handleClose}
        title="Change Claim Status"
        primaryAction={{
          content: 'submit',
          onAction: handleSubmit,
          loading,
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: handleClose,
          },
        ]}
      >
        <Modal.Section>
          <ChoiceList
            title=""
            choices={[
              { label: 'In Progress', value: 'INPROGRESS' },
              // { label: 'Partially Approve', value: 'PARTIALLYAPPROVE' },
              { label: 'Approve', value: 'APPROVE' },
              { label: 'Cancel', value: 'CANCEL' },
            ]}
            selected={selectedStatus}
            onChange={handleSelectedStatus}
          />
          <br />
          {selectedStatus[0] === 'CANCEL' && (
            <TextField
              label="Reason For Cancellation"
              value={cancelText}
              onChange={(e) => setCancelText(e)}
              multiline={2}
              autoComplete="off"
              helpText="Customer will receive comment over email"
            />
          )}
          {selectedStatus[0] === 'APPROVE' && (
            <TextField
              label="Approve Message"
              value={approveText}
              onChange={(e) => setApproveText(e)}
              multiline={2}
              autoComplete="off"
              helpText="Customer will receive comment over email"
            />
          )}
        </Modal.Section>
      </Modal>
    </div>
  );
};

export default ClaimStatusModal;
