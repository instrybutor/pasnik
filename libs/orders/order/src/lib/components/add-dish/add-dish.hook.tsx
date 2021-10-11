import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { addDishValidator } from '@pasnik/api/data-transfer';

export const useAddDish = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addDishValidator),
  });

  const [error, setError] = useState<string | null>(null);

  return {
    error,
    errors,
    register,
    setError,
    handleSubmit,
    reset,
  };
};
