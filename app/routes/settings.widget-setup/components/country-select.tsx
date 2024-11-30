import { useCallback, useEffect, useState } from 'react';
import { Autocomplete, Icon, Tag } from '@shopify/polaris';
import { SearchIcon } from '@shopify/polaris-icons';
import type { FormState } from '~/hooks/use-form-state';

type Countries = {
  id: string;
  name: string;
};

export type IRecord = Record<string, string>;

interface CountrySelectProps {
  countries: Countries[];
  formState: FormState;
}

export function CountrySelect({
  countries,
  formState,
}: CountrySelectProps) {
  const { state } = formState;
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<any>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    state.geoLocation.length > 0 ? state.geoLocation.map((e) => e.value) : []
  );




  useEffect(() => {
    setOptions(countries?.map((c) => ({ label: c.name, value: c.id })));
  }, [countries]);

  useEffect(() => {
    const selected = options.filter((country: IRecord) =>
      selectedOptions.some((s) => s === country.value)
    );
    if(selected.length>0) formState.addChange({geoLocation:selected})

  }, [options ,selectedOptions]);


  const removeTag = useCallback(
    (country: IRecord) => {
      formState.addChange({geoLocation: state.geoLocation.filter((d) => d.value !== country.value) });
      setSelectedOptions((prev) => prev.filter((o) => o !== country.value));
    },
    [formState,state.geoLocation]
  );

  const updateText = (value) => {
    setInputValue(value);
    if (value === '') {
      setOptions(countries?.map((c) => ({ label: c.name, value: c.id })));
      return;
    }

    const filterOptions = (countries || [])
      .filter((c) => c.name.toLowerCase().includes(value.toLowerCase()))
      .map((c) => ({ label: c.name, value: c.id }));

    setOptions(filterOptions);
  };

  return (
    <div className="mb-4">
      <Autocomplete
        allowMultiple
        options={options}
        selected={selectedOptions}
        onSelect={setSelectedOptions}
        textField={
          <Autocomplete.TextField
            onChange={updateText}
            label={''}
            value={inputValue}
            prefix={<Icon source={SearchIcon} />}
            placeholder="Search Countries"
            autoComplete="off"
          />
        }
      />

      <div className="mt-2 flex flex-wrap">
        {state.geoLocation.length > 0
          ? state.geoLocation.map((c) => {
              return (
                <div className="mr-1 mb-1" key={c.value}>
                  <Tag key={c.value} onRemove={() => removeTag(c)}>
                    {c.label}
                  </Tag>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}
