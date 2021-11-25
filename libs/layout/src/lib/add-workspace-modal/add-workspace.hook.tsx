import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  CreateWorkspaceDto,
  createWorkspaceValidator,
} from '@pasnik/api/data-transfer';
import { useWorkspaceStore } from '@pasnik/store';
import { useLayoutStore } from '../layout.store';

export const useAddWorkspace = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateWorkspaceDto>({
    resolver: yupResolver(createWorkspaceValidator),
  });
  const { createWorkspace } = useWorkspaceStore();
  const { hideAddWorkspaceModal } = useLayoutStore();

  const [error, setError] = useState<string | null>(null);

  const onSubmit = useCallback(
    (data: CreateWorkspaceDto) => {
      createWorkspace(data)
        .then(() => hideAddWorkspaceModal())
        .catch((err: Error) => setError(err.message));
    },
    [createWorkspace, setError, hideAddWorkspaceModal]
  );

  return {
    error,
    errors,
    register,
    setError,
    handleSubmit,
    onSubmit,
    control,
  };
};
