import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { addDishValidator } from '@pasnik/api/data-transfer';

export interface UpdateDishModel {
  name: string;
  userId: number;
  priceCents: number;
}

export const useUpdateDish = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<UpdateDishModel>({
    resolver: yupResolver(addDishValidator),
  });

  const [error, setError] = useState<string | null>(null);

  return {
    error,
    errors,
    setValue,
    getValues,
    register,
    setError,
    handleSubmit,
    reset,
    control,
  };
};
