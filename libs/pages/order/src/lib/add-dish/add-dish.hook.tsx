import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { addDishValidator, UserModel } from '@pasnik/api/data-transfer';

export interface UpdateDishModel {
  name: string;
  user: UserModel;
  priceCents: number;
}

export const useAddDish = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm<UpdateDishModel>({
    resolver: yupResolver(addDishValidator),
  });

  const [error, setError] = useState<string | null>(null);

  return {
    error,
    errors,
    register,
    getValues,
    setValue,
    setError,
    handleSubmit,
    reset,
  };
};
