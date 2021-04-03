import * as React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { apiService } from '../../apiService';
import { useAuth } from '../../AuthContext';

export const Login = () => {
  const [form] = Form.useForm();
  const { setAuth } = useAuth();
  const history = useHistory();

  const onFinish = async (values) => {
    const userData = await apiService.auth.login(
      values.UserName,
      values.Password
    );
    setAuth(userData);
    history.push('/');
  };

  return (
    <Form
      form={form}
      name='normal_login'
      className='login-form'
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name='UserName'
        rules={[{ required: true, message: 'Wpisz swoją nazwę użytkownika!' }]}
      >
        <Input
          prefix={<UserOutlined className='site-form-item-icon' />}
          placeholder='Nazwa użytkownika'
        />
      </Form.Item>
      <Form.Item
        name='Password'
        rules={[{ required: true, message: 'Wpisz swoje hasło!' }]}
      >
        <Input
          prefix={<LockOutlined className='site-form-item-icon' />}
          type='password'
          placeholder='Hasło'
        />
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit' className='login-form-button'>
          Zaloguj się
        </Button>
        Lub <Link to='/register'>Stwórz konto!</Link>
      </Form.Item>
    </Form>
  );
};
