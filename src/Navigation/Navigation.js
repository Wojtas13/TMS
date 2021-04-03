import {
  LineChartOutlined,
  BarChartOutlined,
  FileSearchOutlined,
  TableOutlined,
  AreaChartOutlined,
  UserOutlined,
  FormOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import React from 'react';
import { Menu } from 'antd';
import { apiService } from '../apiService';
import { useAuth } from '../AuthContext';
import { Link, withRouter, useHistory } from 'react-router-dom';

const Navigation = (props) => {
  const { isAuth, setAuth } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    await apiService.auth.logout();
    setAuth(undefined);
    history.push('/login');
  };

  return (
    <Menu mode='inline' selectedKeys={[props.location.pathname]} theme='dark'>
      {isAuth && (
        <Menu.Item key='/tempChart'>
          <Link to='/tempChart'>
            <LineChartOutlined /> Wykres temperatury
          </Link>
        </Menu.Item>
      )}
      {isAuth && (
        <Menu.Item key='/humidityChart'>
          <Link to='/humidityChart'>
            <BarChartOutlined /> Wykresy wilgotnosci
          </Link>
        </Menu.Item>
      )}
      {isAuth && (
        <Menu.Item key='/sensorList'>
          <Link to='/sensorList'>
            <TableOutlined /> Lista czujników
          </Link>
        </Menu.Item>
      )}
      {isAuth && (
        <Menu.Item key='/sensorForecast'>
          <Link to='/sensorForecast'>
            <AreaChartOutlined /> Prognoza czujnika
          </Link>
        </Menu.Item>
      )}
      {!isAuth && (
        <Menu.Item key='/login'>
          <Link to='/login'>
            <UserOutlined /> Zaloguj
          </Link>
        </Menu.Item>
      )}
      {!isAuth && (
        <Menu.Item key='/register'>
          <Link to='/register'>
            <FormOutlined /> Zarejestruj
          </Link>
        </Menu.Item>
      )}
      {isAuth && (
        <Menu.Item onClick={handleLogout}>
          <LogoutOutlined /> Wyloguj
        </Menu.Item>
      )}
    </Menu>
  );
};

const WrappedNavigation = withRouter(Navigation);

export { WrappedNavigation as Navigation };
