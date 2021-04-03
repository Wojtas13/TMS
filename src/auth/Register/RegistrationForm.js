import * as React from 'react';

import { Form, Input, Button } from 'antd';

export const RegistrationForm = ({ onSubmit }) => {
  const [form] = Form.useForm();

  return (
    <Form form={form} name='register' onFinish={onSubmit} scrollToFirstError>
      <Form.Item name='Name' label='Imię'>
        <Input />
      </Form.Item>

      <Form.Item name='Surname' label='Nazwisko'>
        <Input />
      </Form.Item>

      <Form.Item name='UserName' label='Nazwa użytkownika'>
        <Input />
      </Form.Item>

      <Form.Item
        name='Email'
        label='E-mail'
        rules={[
          {
            type: 'email',
            message: 'Podany e-mail nie jest prawidłowy!',
          },
          {
            required: true,
            message: 'Podaj swój e-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='Password'
        label='Hasło'
        rules={[
          {
            required: true,
            message: 'Wpisz swoje hasło!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name='PasswordRepeat'
        label='Potwierdź hasło'
        dependencies={['Password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Potwierdź swoje hasło!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('Password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                'Hasła nie są identyczne. Spróbuj ponownie!'
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Zarejestruj się
        </Button>
      </Form.Item>
    </Form>
  );
};
