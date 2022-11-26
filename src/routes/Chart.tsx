import { useQuery } from 'react-query';
import { useOutletContext } from 'react-router-dom'
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';
import { Helmet } from 'react-helmet-async';

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface IChartProp {
  coinId: string;
}

const Chart = () => {
  const {coinId} = useOutletContext<IChartProp>();
  const {isLoading, data} = useQuery<IHistorical[]>(['ohlcv', coinId], () => fetchCoinHistory(coinId), {
    refetchInterval: 10000,
  });

  return (
    <>
    <Helmet>
      <title>Chart</title>
    </Helmet>
    <div>{isLoading ? "Loading chart..." 
    : 
    <ApexChart 
      type='line'
      series={[
        {
          name: "price",
          data: data?.map((price) => price.close)as number[],
        }
      ]}
      options={{
        theme: {
          mode: 'dark',
        },
        chart: {
          height:300,
          width: 500,
          toolbar: {
            show: false,
          },
          background: 'transparent',
        },
        grid: {
          show: false,
        },
        stroke: {
          curve: "smooth",
          width: 4,
        },
        xaxis: {
          axisTicks: {show: false},
          labels: {show: false},
          type: "datetime",
          categories: data?.map((price) => new Date(Number(price.time_close) * 1000).toISOString()),
        },
        yaxis: {
          labels: {
            show: false,
          },
        },
        fill: {
          type: 'gradient',
          gradient: {
            gradientToColors: ["blue"],
            stops: [0, 100],
          },
        },
        colors: ["red"],
        tooltip: {
          y: {
            formatter: (value) => `$${value.toFixed(2)}`,
          }
        }
      }} 
    />}</div>
    </>
  )
}

export default Chart