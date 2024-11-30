import { CountrySelect } from '~/routes/settings.widget-setup/components/country-select';
import { useQueryPaginated } from '~/hooks/use-query-paginated';
import { ShadowBevelBox } from '~/components/shadow-bevel-box';
import { queryProxy } from '~/modules/query/query-proxy';
import { Box, FormLayout, Icon } from '@shopify/polaris';
import { LocationIcon } from '@shopify/polaris-icons';
import { useEffect, useMemo, useState } from 'react';
import Radio from '~/components/radio';

const Location = ({ formState }) => {
  const [location, setLocation] = useState(formState.state.geoLocation.length===0);

  const query = useMemo(
    async () => await queryProxy.country.findMany({ pageSize: 500 }),
    []
  );
  const countries = useQueryPaginated(query).data;
  // geoLocation

  useEffect(() => {
    if(formState.state.geoLocation.length===0){
      setLocation(true)
    }
  }, [formState.state.geoLocation]);


  const handleRadio = (event: 'all' | 'specific') => {
    if (event === 'all') {
      setLocation(true);
      formState.addChange({geoLocation:[]})
    } else if (event === 'specific') {
      setLocation(false);
    }
  };

  return (
    <ShadowBevelBox
      icon={<Icon source={LocationIcon} />}
      title="Geo Location Target"
      className="my-4"
    >
      <FormLayout>
        <FormLayout.Group>
          <Box paddingBlockStart="100" paddingBlockEnd="100">
            {/*<b>Insurance default display status</b>*/}
            <Radio
              onChange={() => handleRadio('all')}
              checked={location}
              label="All World"
              id="All"
              type="radio"
            />
            <Radio
              onChange={() => handleRadio('specific')}
              checked={!location}
              label="Specific Countries"
              id="Specific"
              type="radio"
            />
          </Box>

          {!location && (
            <Box paddingBlockStart="100" paddingBlockEnd="100">
              <p className="mb-2">
                <b>Countries</b>
              </p>
              <CountrySelect
                formState={formState}
                countries={countries ?? []}
              />
            </Box>
          )}
        </FormLayout.Group>
      </FormLayout>
    </ShadowBevelBox>
  );
};

export default Location;
