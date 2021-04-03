import React from 'react';
import { Line } from '@reactchartjs/react-chart.js';
import { Redirect, withRouter } from 'react-router-dom';

import styles from './SensorForecast.module.scss';
import { useAuth } from '../AuthContext';

const chartData = {
  labels: ['12:00', '13:00', '14:00', '15:00', '16:00'],
  datasets: [
    {
      label: 'Indoor Kraków',
      data: [21, 20.5, 22, 21, 23],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(0, 255, 128, 0.5)',
    },
    {
      label: 'Outdoor Kraków',
      data: [-2, 3, -1, 3, 0],
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
          labelString: '°C',
        },
        ticks: {
          max: 30,
          min: -30,
          stepSize: 5,
        },
      },
    ],
    xAxes: [
      {
        ticks: {
          max: 24,
          min: 1,
          stepSize: 1,
        },
      },
    ],
  },
};

const SensorForecast = () => {
  const { isAuth } = useAuth();
  const returnLine = (
    <div className={styles.chart}>
      <Line data={chartData} options={options} />;
    </div>
  );

  return <>{isAuth ? returnLine : <Redirect to='/login' />}</>;
};

const WrappedNavigation = withRouter(SensorForecast);

export { WrappedNavigation as SensorForecast };
