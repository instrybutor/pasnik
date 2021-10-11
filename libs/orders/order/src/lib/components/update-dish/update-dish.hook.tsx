import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { addDishValidator, DishModel } from '@pasnik/api/data-transfer';

export const useUpdateDish = (dish: DishModel) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addDishValidator),
    defaultValues: {
      priceCents: String(dish.priceCents / 100),
      name: dish.name,
    },
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
