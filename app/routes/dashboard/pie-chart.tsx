import { useEffect, useState } from 'react';
const PieChart = ({ pieData }) => {
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
  if (!pieData) return null;
  const chartData = Object.entries(pieData).map(([name, value]) => ({
    name: name.charAt(0) + name.slice(1).toLowerCase(),
    data: [
      {
        key: 'total',
        value: Number(value),
      },
    ],
  }));

  return (
    <div className="h-[280px] mt-3">
      <Viz.DonutChart
        data={chartData}
        legendPosition="bottom"
        renderInnerValueContent={(v) => {
          const item = chartData[v.activeIndex];
          if (item) {
            return (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                }}
              >
                <span>{item.name}</span> <span>{item.data[0].value}</span>
              </div>
            );
          } else {
            return (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  color: '',
                }}
              >
                <span>Total Claim</span> <span>{v.totalValue}</span>
              </div>
            );
          }
        }}
      />
    </div>
  );
};

export default PieChart;
