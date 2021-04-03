import React from 'react';
import { Line } from '@reactchartjs/react-chart.js';
import { Redirect, withRouter } from 'react-router-dom';

import styles from './HumidityChart.module.scss';
import { useAuth } from '../AuthContext';

const chartData = {
  labels: ['12:00', '13:00', '14:00', '15:00', '16:00'],
  datasets: [
    {
      label: 'Indoor Kraków',
      data: [89, 87, 90, 85, 89],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(0, 255, 128, 0.5)',
    },
    {
      label: 'Outdoor Kraków',
      data: [89, 91, 89, 90, 89],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(0, 128, 255, 0.5)',
    },
  ],
};

const options = {
  hover: {
    mode: 'nearest',
    intersect: true,
  },
  tooltips: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    yAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: '%',
        },
        ticks: {
          max: 100,
          min: 0,
          stepSize: 10,
        },
      },
    ],
  },
};

const HumidityChart = () => {
  const { isAuth } = useAuth();
  const returnLine = (
    <div className={styles.chart}>
      <Line data={chartData} options={options} />;
    </div>
  );
  return <>{isAuth ? returnLine : <Redirect to='/login' />}</>;
};

const WrappedNavigation = withRouter(HumidityChart);

export { WrappedNavigation as HumidityChart };
