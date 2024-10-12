import { I18nContext, I18nManager } from '@shopify/react-i18n';
import React, { useMemo } from 'react';

type Props = React.PropsWithChildren<{
  currencyCode: string;
}>;

export const PageShell: React.FC<Props> = ({ currencyCode, children }) => {
  const i18nManager = useMemo(() => {
    return new I18nManager({
      locale: 'en',
      currency: currencyCode,
      onError(error) {
        console.error(error);
      },
    });
  }, [currencyCode]);

  return <I18nContext.Provider value={i18nManager}>{children}</I18nContext.Provider>;
};
