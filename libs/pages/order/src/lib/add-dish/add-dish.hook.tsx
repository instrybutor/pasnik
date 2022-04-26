import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { addDishValidator } from '@pasnik/api/data-transfer';
import { useUserStore } from '@pasnik/store';

export interface UpdateDishModel {
  name: string;
  userId: number;
  priceCents: number;
}

export const useAddDish = () => {
  const { user } = useUserStore();
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
    defaultValues: {
      userId: user!.id,
    },
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
    control,
  };
};
