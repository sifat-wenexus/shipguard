import { DonutChartDataSeries } from '@shopify/polaris-viz/build/ts/components/DonutChart/types';
import { useEffect, useState } from 'react';
import ReactDomServer from 'react-dom/server';
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

  const chartData1 = [
    {
      name: 'Stollen',
      data: [
        {
          key: 'total',
          value: 3,
        },
      ],
    },
    {
      name: 'Damaged',
      data: [
        {
          key: 'total',
          value: 5,
        },
      ],
      color: 'lime',
    },
    {
      name: 'Lost',
      data: [
        {
          key: 'total',
          value: 10,
        },
      ],
    },
  ];
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
        // renderLegendContent={(e) => {
        //   console.log(e.getColorVisionEventAttrs(1));
        //   return 'd';
        // }}
        showLegendValues
        // renderBucketLegendLabel={() => 'hhh'}
        // renderHiddenLegendLabel={(e) => {
        //   console.log(e);
        //   return 'd';
        // }}
        // renderInnerValueContent={(e) => {
        //   console.log(e);
        //   return (
        //     <>
        //       <div>
        //         <p>Total Claim</p>
        //         <p className="text-center mt-1 font-bold">{e.totalValue}</p>
        //       </div>
        //     </>
        //   );
        // }}
        // comparisonMetric={{
        //   trend: 'negative',
        //   accessibilityLabel: 'negative',
        //   metric: '12',
        // }}
        // labelFormatter={(e) => {
        //   const htmlString = ReactDomServer.renderToStaticMarkup(
        //     <div>
        //       <p>Total Claim</p>
        //       <p className="text-center mt-1 font-bold">{e}</p>
        //     </div>
        //   );
        //   return `${htmlString}`;

        // }}
      />
    </div>
  );
};

export default PieChart;
