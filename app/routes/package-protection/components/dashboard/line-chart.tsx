import { LineChart } from '@shopify/polaris-viz';
import { useState, useEffect } from 'react';

function LineChartForDashboard({ lineData, date }) {
  const { currentData, prevData } = lineData || {};
  const [Viz, setViz] = useState<typeof import('@shopify/polaris-viz') | null>(
    null
  );

  useEffect(() => {
    const loadPolarisViz = async () => {
      const viz = await import('@shopify/polaris-viz');

      if (!viz) {
        return;
      }

      setViz(viz);
    };

    loadPolarisViz();
  }, []);

  if (!Viz) return <div>Loading...</div>;

  const formateData = (date: string): string => {
    if (!date) return '';
    const dateObject = new Date(date);

    // Using toLocaleString to format the date
    const options = { month: 'short' as const, day: 'numeric' as const };
    return dateObject.toLocaleString('en-US', options);
  };
  const chartData = [
    {
      name: `${formateData(date.startDate)} - ${formateData(date.endDate)}`,
      data: currentData,
    },
    {
      name: 'Previous month',
      data: prevData,
      color: 'red',
      isComparison: true,
    },
  ];

  return (
    <div className="h-[300px] mt-3">
      <Viz.LineChart data={chartData} />
    </div>
  );
}

export default LineChartForDashboard;
