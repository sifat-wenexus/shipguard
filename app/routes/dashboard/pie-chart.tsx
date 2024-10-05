import { useEffect, useMemo, useState } from 'react';
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

  const chartData = useMemo(() => pieData.map((item) => ({
    name: item.issue.charAt(0) + item.issue.slice(1).toLowerCase(),
    data: [
      {
        key: 'total',
        value: Number(item._count.id),
      },
    ],
  })), [pieData]);

  if (!Viz) return <div>Loading...</div>;

  if (!pieData) return null;

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
