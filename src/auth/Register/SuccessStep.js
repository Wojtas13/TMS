import * as React from 'react';

import { Alert, Button } from 'antd';
import { Link } from 'react-router-dom';

export const SuccessStep = () => {
  return (
    <>
      <Alert
        message='Rejestracja zakończona'
        description='Twoje konto zostało stworzone.'
        type='success'
        showIcon
      />

      <Link to='/'>
        <Button type='primary' size='large'>
          Przejdź do tablicy
        </Button>
      </Link>
    </>
  );
};
