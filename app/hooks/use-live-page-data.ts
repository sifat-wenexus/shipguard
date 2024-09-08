import { useEffect, useRef, useState } from 'react';

export function useLivePageData(delay: number = 10000) {
  const [storeInfo, setStoreInfo] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);

  const previousDataRef = useRef();
  const getStoreInfoData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/get-guide-line-data`);
      const res = await response.json();

      if (
        JSON.stringify(res.data) !== JSON.stringify(previousDataRef.current)
      ) {
        setLoading(false);
        setStoreInfo(res.data);
        previousDataRef.current = res.data;
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
