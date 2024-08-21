import { Tooltip, ActionList, Button, Popover } from '@shopify/polaris';
import type { ActionListItemDescriptor } from '@shopify/polaris';
import * as Icons from '@shopify/polaris-icons';
import { useMemo, useState } from 'react';
import type { FC } from 'react';

interface Props {
  onAction: (action: string) => void;
  status: string;
}

export const CampaignActions: FC<Props> = ({ status, onAction }) => {
  const [active, setActive] = useState(false);

  const actions = useMemo(() => {
    const actions: ActionListItemDescriptor[] = [
      {
        id: 'duplicate',
        content: 'Duplicate',
        icon: Icons.DuplicateIcon,
        onAction: () => onAction('duplicate'),
      },
      {
        id: 'delete',
        content: 'Delete',
        destructive: true,
        icon: Icons.DeleteIcon,
        onAction: () => onAction('delete'),
      },
    ];

    if (status !== 'Ended') {
      actions.unshift({
        id: 'edit',
        content: 'Edit',
        icon: Icons.EditIcon,
        onAction: () => onAction('edit'),
      });
    }

    if (status === 'Paused') {
      actions.unshift({
        id: 'end',
        content: 'End',
        icon: Icons.StopCircleIcon,
        destructive: true,
        onAction: () => onAction('end'),
      });
      actions.unshift({
        id: 'resume',
        content: 'Resume',
        icon: Icons.PlayCircleIcon,
        onAction: () => onAction('resume'),
      });
    } else if (status === 'Running') {
      actions.unshift({
        id: 'end',
        content: 'End',
        icon: Icons.StopCircleIcon,
        destructive: true,
        onAction: () => onAction('end'),
      });
      actions.unshift({
        id: 'pause',
        content: 'Pause',
        icon: Icons.PauseCircleIcon,
        destructive: true,
        onAction: () => onAction('pause'),
      });
    } else if (status === 'Scheduled') {
      actions.unshift({
        id: 'cancel',
        content: 'Cancel',
        icon: Icons.XIcon,
        destructive: true,
        onAction: () => onAction('cancel'),
      });
    } else if (status === 'Ended') {
      actions.splice(2, 0, {
        id: 'archive',
        content: 'Archive',
        icon: Icons.ArchiveIcon,
        destructive: true,
        onAction: () => onAction('archive'),
      });
    }

    return actions;
  }, [onAction, status]);

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Popover
        onClose={() => setActive(false)}
        active={active}
        activator={
          <Tooltip content="Actions">
            <Button
              onClick={() => setActive(true)}
              icon={Icons.MenuVerticalIcon}
            />
          </Tooltip>
        }
      >
        <ActionList actionRole="menuitem" items={actions} />
      </Popover>
    </div>
  );
};
