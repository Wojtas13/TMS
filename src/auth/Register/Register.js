import * as React from 'react';

import { apiService } from '../../apiService';
import { useAuth } from '../../AuthContext';
import { RegistrationForm } from './RegistrationForm';
import { SuccessStep } from './SuccessStep';

export const Register = () => {
  const { setAuth } = useAuth();
  const [step, setStep] = React.useState('registration');

  const handleRegister = async (values) => {
    const userData = await apiService.auth.register(values);
    setAuth(userData);
    setStep('success');
  };

  if (step === 'registration') {
    return <RegistrationForm onSubmit={handleRegister} />;
  } else if (step === 'success') {
    return <SuccessStep />;
  }
};
