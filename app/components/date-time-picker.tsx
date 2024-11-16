import { timezoneRowToResourceItem } from '~/modules/utils/timezone-row-to-resource-item';
import type { FilterValues, ResourceItem } from '~/components/resource-select';
import { ResourceSelectMini } from '~/components/resource-select-mini';
import { Button, Popover, TextField } from '@shopify/polaris';
import type { TextFieldProps } from '@shopify/polaris';
import { useCallback, useMemo, useState } from 'react';
import type { Prisma } from '#prisma-client';
import type { FC } from 'react';

export interface DateTimePickerValue {
  date?: string;
  timezone: {
    id: string;
    title: string;
  };
}

export interface DateTimerPickerProps {
  onChange: (value: DateTimePickerValue) => void;
  error?: TextFieldProps['error'];
  value?: DateTimePickerValue;
  disabled?: boolean;
  label: string;
}

export const DateTimePicker: FC<DateTimerPickerProps> = (props) => {
  const [active, setActive] = useState(false);

  const selectedTimezoneIds = useMemo(
    () => [props.value ? props.value.timezone.id : 'UTC'],
    [props.value]
  );

  const onTimezoneChange = useCallback(
    (items: ResourceItem<'timezone'>[]) => {
      if (props.value) {
        props.onChange({
          date: props.value.date,
          timezone: timezoneRowToResourceItem(items[0]),
        });
      }
    },
    [props]
  );

  const onDateChange = useCallback(
    (value: string) => {
      props.onChange({
        date: value,
        timezone: props.value?.timezone ?? {
          id: 'Antarctica/Troll',
          title: 'UTC',
        },
      });
    },
    [props]
  );

  const getSearchConditions = useCallback((search: string) => {
    const stringFilter: Prisma.StringFilter = {
      contains: search,
      mode: 'insensitive',
    };

    return {
      OR: [
        { id: stringFilter },
        { gmtOffset: stringFilter },
        { Country: { name: stringFilter } },
      ],
    } satisfies FilterValues<'timezone'>;
  }, []);

  return (
    <TextField
      value={props.value?.date}
      disabled={props.disabled}
      onChange={onDateChange}
      type="datetime-local"
      label={props.label}
      error={props.error}
      autoComplete="on"
      prefix={
        <Popover
          onClose={() => setActive(false)}
          active={active}
          activator={
            <div
              className="ml-[-8px]"
              onClick={() => {
                if (!props.disabled) {
                  setActive(true);
                }
              }}
            >
              <Button
                disabled={props.disabled}
                disclosure="select"
                variant="tertiary"
              >
                {props.value?.timezone.title ?? 'UTC'}
              </Button>
            </div>
          }
        >
          <div className="p-[.75rem]" onClick={(e) => e.stopPropagation()}>
            <ResourceSelectMini
              getTitle={(item) => timezoneRowToResourceItem(item).title}
              getId={(item) => item.id}
              getSearchConditions={getSearchConditions}
              value={selectedTimezoneIds}
              onChange={onTimezoneChange}
              resource="timezone"
              multiple={false}
              autoSelect
              resourceName={{
                plural: 'Timezones',
                singular: 'Timezone',
              }}
            />
          </div>
        </Popover>
      }
    />
  );
};
