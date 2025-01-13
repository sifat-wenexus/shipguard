import { useEffect, useRef, useState } from 'react';
import type { IGuideLineResponse } from '~/routes/get-guide-line-data';

export function useLivePageData(delay: number = 10000) {
  const [storeInfo, setStoreInfo] = useState<IGuideLineResponse|null>(null);
  const [loading, setLoading] = useState(false);

  const previousDataRef = useRef();
  const getStoreInfoData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/get-guide-line-data`);
      const res = await response.json();
      if (JSON.stringify(res) !== JSON.stringify(previousDataRef.current)) {
        setLoading(false);
        setStoreInfo(res);
        previousDataRef.current = res;
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getStoreInfoData();
    const intervalId = setInterval(() => {
      getStoreInfoData();
    }, delay);
    return () => clearInterval(intervalId);
  }, []);
  return { storeInfo, loading };
}
