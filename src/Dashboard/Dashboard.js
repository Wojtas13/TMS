import React from 'react';
import { Redirect, Link, withRouter } from 'react-router-dom';

import { Card } from 'antd';
import { apiService } from '../apiService';
import { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import { BarsOutlined } from '@ant-design/icons';

const getLastSensors = () => {
  return apiService.sensors.getLastSensors().then((res) => {
    return res.data;
  });
};

const Dashboard = () => {
  const [sensors, setSensors] = useState([]);
  const { isAuth } = useAuth();

  const reloadItems = async () => {
    const getLastSensorsData = await getLastSensors();
    setSensors(getLastSensorsData);
  };

  useEffect(() => {
    if (isAuth) {
      reloadItems();
    }
  }, [isAuth]);

  const listData = () => {
    let data = [];

    sensors.forEach((sensor) => {
      data.push({
        sensorName: sensor.Sensor_Name,
        AvgTemp: sensor.AVG_Temperature,
        AvgHumidity: sensor.AVG_Humidity,
        ReadTime: sensor.Timestamp_Of_Reading,
      });
    });

    return data;
  };

  // const data = listData();

  const link = (
    <Link to='/sensorDetails'>
      <BarsOutlined />
    </Link>
  );

  const returnList = (
    <>
      {/* <Card title={data.sensorName} extra={link} style={{ width: 400 }}>
        <ul>
          <li>Średnia temperatura: {data.AvgTemp}°</li>
          <li>Średnia wilgotność: {data.AvgHumidity}°</li>
          <li>Czas odczytu: {data.ReadTime}</li>
        </ul>
      </Card>
      <Card title={data.sensorName} extra={link} style={{ width: 400 }}>
        <ul>
          <li>Średnia temperatura: {data.AvgTemp}°</li>
          <li>Średnia wilgotność: {data.AvgHumidity}°</li>
          <li>Czas odczytu: {data.ReadTime}</li>
        </ul>
      </Card> */}
      <Card title='Indoor Kraków' extra={link} style={{ width: 400 }}>
        <ul>
          <li>Średnia temperatura: 22°</li>
          <li>Średnia wilgotność: 85%</li>
          <li>Czas odczytu: 21.03.21 21:14</li>
        </ul>
      </Card>
      <Card title='Outdoor Kraków' extra={link} style={{ width: 400 }}>
        <ul>
          <li>Średnia temperatura: 0°</li>
          <li>Średnia wilgotność: 89%</li>
          <li>Czas odczytu: 21.03.21 21:14</li>
        </ul>
      </Card>
    </>
  );
  return <>{isAuth ? returnList : <Redirect to='/login' />}</>;
};

const WrappedNavigation = withRouter(Dashboard);

export { WrappedNavigation as Dashboard };
