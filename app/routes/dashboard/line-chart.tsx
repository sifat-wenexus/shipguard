import { useState, useEffect } from 'react';

function LineChartForDashboard({ lineData }) {
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

  const chartData = [
    {
      name: 'Revenue',
      data: lineData?.map(e=>{
        return {...e, key:e.key.split('T')[0]}
      }) ?? [],
    },
  ];

  return (
    <div className="h-[300px] mt-3">
      <Viz.BarChart data={chartData} />
    </div>
  );
}

export default LineChartForDashboard;
