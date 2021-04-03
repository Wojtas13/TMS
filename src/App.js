import React, { useState } from 'react';
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom';
import { Breadcrumb, Layout } from 'antd';

import Cookies from 'js-cookie';

import { Dashboard } from './Dashboard/Dashboard';
import { HumidityChart } from './HumidityChart/HumidityChart';
import { Navigation } from './Navigation/Navigation';
import { SensorDetails } from './SensorDetails/SensorDetails';
import { SensorForecast } from './SensorForecast/SensorForecast';
import { SensorList } from './SensorList/SensorList';
import { TemperatureChart } from './TemperatureChart/TemperatureChart';

import styles from './App.module.scss';
import { AuthContext } from './AuthContext';
import { DocumentTitle } from './common/DocumentTitle';
import { Login } from './auth/Login/Login';
import { Register } from './auth/Register/Register';

export const AppContent = () => (
  <BrowserRouter>
    <Layout className={styles.outerLayout}>
      <Layout.Sider>
        <Link to='/'>
          <div className={styles.logo}>TMS</div>
        </Link>
        <Navigation />
      </Layout.Sider>

      <Layout className={styles.innerLayout}>
        <Layout.Content className={styles.contentWrapper}>
          <Breadcrumb className={styles.breadcrumbs}>
            <Breadcrumb.Item>
              <h4>TMS</h4>
            </Breadcrumb.Item>
          </Breadcrumb>

          <div className={styles.content}>
            <Switch>
              <Route exact path='/'>
                <DocumentTitle key='Dashboard' title='Dashboard'>
                  <Dashboard />
                </DocumentTitle>
              </Route>

              <Route exact path='/tempChart'>
                <DocumentTitle
                  key='Wykres temperatury'
                  title='Wykres temperatury'
                >
                  <TemperatureChart />
                </DocumentTitle>
              </Route>

              <Route exact path='/humidityChart'>
                <DocumentTitle
                  key='Wykres wilgotności'
                  title='Wykres wilgotności'
                >
                  <HumidityChart />
                </DocumentTitle>
              </Route>

              <Route exact path='/sensorDetails'>
                <DocumentTitle
                  key='Szczegóły czujnika'
                  title='Szczegóły czujnika'
                >
                  <SensorDetails />
                </DocumentTitle>
              </Route>

              <Route exact path='/sensorList'>
                <DocumentTitle key='Lista czujników' title='Lista czujników'>
                  <SensorList />
                </DocumentTitle>
              </Route>

              <Route exact path='/sensorForecast'>
                <DocumentTitle
                  key='Prognoza czujnika'
                  title='Prognoza czujnika'
                >
                  <SensorForecast />
                </DocumentTitle>
              </Route>

              <Route exact path='/login'>
                <DocumentTitle key='Zaloguj' title='Zaloguj'>
                  <Login />
                </DocumentTitle>
              </Route>

              <Route exact path='/register'>
                <DocumentTitle key='Zarejestruj' title='Zarejestruj'>
                  <Register />
                </DocumentTitle>
              </Route>

              <Route exact path='*'>
                <Redirect to='/' />
              </Route>
            </Switch>
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  </BrowserRouter>
);

const savedData = Cookies.get('sessionId');

export const App = () => {
  const [userData, setUserData] = useState(savedData);

  return (
    <AuthContext.Provider
      value={{
        isAuth: userData,
        setAuth: setUserData,
      }}
    >
      <AppContent />
    </AuthContext.Provider>
  );
};
