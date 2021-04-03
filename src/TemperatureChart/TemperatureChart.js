import React from 'react';
import { Line } from '@reactchartjs/react-chart.js';
import { Redirect, withRouter } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import { apiService } from '../apiService';

import styles from './TemperatureChart.module.scss';
import { Space, DatePicker } from 'antd';
import Cookies from 'js-cookie';

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
          max: 35,
          min: -35,
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

const getTemperatures = () => {
  return apiService.sensorResults.getAllTemp().then((res) => {
    return res.data;
  });
};

const TemperatureChart = () => {
  const [temperatures, setTemperatures] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const { isAuth } = useAuth();

  const handleChange = (date, dateString) => {
    setDateRange(dateString);
    console.log(dateRange);
    Cookies.set('dateRange', dateString);
  };

  const reloadItems = async () => {
    const getTemperatureData = await getTemperatures();
    setTemperatures(getTemperatureData);
  };

  useEffect(() => {
    if (isAuth) {
      reloadItems();
    }
  }, [isAuth]);

  let labels = [];
  let data = [];

  const initChartData = () => {
    let lastSensor = temperatures[0].Sensor_Name,
      lastIndex = 0,
      tempData = [];
    temperatures.forEach((index, item) => {
      if (lastIndex !== item.dateHour) {
        tempData.push(item.AVG_Temperature);
      }

      if (item.Sensor_Name !== lastSensor) {
        data.push({
          label: item.Sensor_Name,
          data: tempData,
          fill: false,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgba(0, 128, 255, 0.5)',
        });
      }
    });
  };
  // initChartData();
  // console.log(temperatures);

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
  const { RangePicker } = DatePicker;
  const returnChart = (
    <>
      <p>Wybierz zakres</p>
      <Space>
        <RangePicker
          onChange={(date, dateString) => handleChange(date, dateString)}
        />
      </Space>
      <div className={styles.chart}>
        <Line data={chartData} options={options} />;
      </div>
    </>
  );
  return <>{isAuth ? returnChart : <Redirect to='/login' />}</>;
};

const WrappedNavigation = withRouter(TemperatureChart);

export { WrappedNavigation as TemperatureChart };
