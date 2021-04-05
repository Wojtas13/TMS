import React from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';

import { apiService } from '../apiService';
import { useAuth } from '../AuthContext';
import { useEffect, useState } from 'react';

import { FileSearchOutlined } from '@ant-design/icons';
import { Table } from 'antd';

const columns = [
  {
    title: 'ID Sensora',
    dataIndex: 'sensorId',
    key: 'sensorId',
  },
  {
    title: 'Nazwa czujnika',
    dataIndex: 'sensorName',
    key: 'sensorName',
    render: (text, sensor) => (
      <Link to='/sensorDetails'>
        <FileSearchOutlined /> {sensor.sensorName}
      </Link>
    ),
  },
];

const getSensors = () => {
  return apiService.sensors.getSensors().then((res) => {
    return res.data;
  });
};

const SensorList = () => {
  const [sensors, setSensors] = useState([]);
  const { isAuth } = useAuth();

  const reloadItems = async () => {
    const getSensorsData = await getSensors();
    setSensors(getSensorsData);
  };

  useEffect(() => {
    reloadItems();
  }, []);

  const sensorList = () => {
    let data = [];

    sensors.forEach((sensor) => {
      data.push({
        key: sensor.Sensor_ID,
        sensorName: sensor.Sensor_Name,
        sensorId: sensor.Sensor_ID,
      });
    });
    return data;
  };
  const data = sensorList();

  const returnTable = (
    <Table key={data.key} columns={columns} dataSource={data} />
  );

  return <>{isAuth ? returnTable : <Redirect to='/login' />}</>;
};

const WrappedNavigation = withRouter(SensorList);

export { WrappedNavigation as SensorList };
