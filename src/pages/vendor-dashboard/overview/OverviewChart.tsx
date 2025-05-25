// components/LineChart.tsx
import React from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

type PlotData = {
  year: number;
  month: number;
  total_revenue: number;
  total_tickets: number;
  total_tickets_sold: number;
};


// Fill in months from Jan to Dec
const getNormalizedData = (data: PlotData[]) => {
  const monthMap = new Map(data?.map(item => [item.month, item]));

  return Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    return (
      monthMap.get(month) || {
        year: 2025,
        month,
        total_revenue: 0,
        total_tickets: 0,
        total_tickets_sold: 0,
      }
    );
  });
};

const monthLabels = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export const OverviewChart = ({chartData}:any) => {
  const normalizedData = getNormalizedData(chartData);

  const data = {
    labels: monthLabels,
    datasets: [
    //   {
    //     label: 'Total Tickets',
    //     data: normalizedData.map(d => d.total_tickets),
    //     borderColor: 'rgb(54, 162, 235)',
    //     backgroundColor: 'rgba(54, 162, 235, 0.2)',
    //     // tension: 0.3,
    //   },
      {
        label: 'Total Revenue',
        data: normalizedData.map(d => d.total_revenue),
        borderColor: '#00803b',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        // tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display:false,
        position: 'top' as const,
      },
      title: {
        display: false,
        text: 'Tickets and Revenue by Month (2025)',
      },
    },
  };

  return <Line data={data} options={options} />;
};
