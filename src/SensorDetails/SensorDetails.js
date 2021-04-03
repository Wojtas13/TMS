import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';

import { Table } from 'antd';
import { apiService } from '../apiService';
import { useAuth } from '../AuthContext';
import { useEffect, useState } from 'react';

const columns = [
  {
    title: 'Id Sensora',
    dataIndex: 'SensorId',
    key: 'SensorId',
  },
  {
    title: 'Nazwa czujnika',
    dataIndex: 'sensorName',
    key: 'sensorName',
  },
  {
    title: 'Hasło czujnika',
    dataIndex: 'sensorPassword',
    key: 'sensorPassword',
  },
  {
    title: 'Wersja oprogramowania',
    dataIndex: 'firmwareVersion',
    key: 'firmwareVersion',
  },
  {
    title: 'Id urządzenia',
    dataIndex: 'deviceId',
    key: 'deviceId',
  },
  {
    title: 'Typ urządzenia',
    dataIndex: 'deviceType',
    key: 'deviceType',
  },
  {
    title: 'Automatyczna aktualizacja',
    dataIndex: 'FirmwareAutoUpdate',
    key: 'FirmwareAutoUpdate',
  },
  {
    title: 'Adres Url serwera',
    dataIndex: 'WebserwerUrl',
    key: 'WebserwerUrl',
  },
  {
    title: 'Zaaktualizowany Adres Url serwera',
    dataIndex: 'UpdateUrl',
    key: 'UpdateUrl',
  },
];

const getSensorsDetail = () => {
  return apiService.sensors.getSensorsDetail().then((res) => {
    return res.data;
  });
};

const SensorDetails = () => {
  const [sensorDetails, setSensorDetails] = useState([]);
  const { isAuth } = useAuth();

  const reloadItems = async () => {
    const getSensorDetails = await getSensorsDetail();
    setSensorDetails(getSensorDetails);
  };

  useEffect(() => {
    if (isAuth) {
      reloadItems();
    }
  }, [isAuth]);

  const detailsList = () => {
    let data = [];

    sensorDetails.forEach((detail) => {
      data.push({
        SensorId: detail.Sensor_ID,
        sensorName: detail.Sensor_Name,
        sensorPassword: detail.Password,
        firmwareVersion: detail.Firmware_Version,
        deviceId: detail.Device_ID,
        deviceType: detail.Device_Type,
        FirmwareAutoUpdate: detail.Firmware_AutoUpdate === 1 ? 'Tak' : 'Nie',
        WebserwerUrl: detail.Webserver_URL,
        UpdateUrl: detail.Update_URL,
      });
    });
    return data;
  };
  const data = detailsList();

  const returnCard = (
    <Table key={data.SensorId} columns={columns} dataSource={data} />
  );

  return <>{isAuth ? returnCard : <Redirect to='/login' />}</>;
};

const WrappedNavigation = withRouter(SensorDetails);

export { WrappedNavigation as SensorDetails };
