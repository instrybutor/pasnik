import { useMutation, useQueryClient } from 'react-query';
import { UserModel, WorkspaceModel } from '@pasnik/api/data-transfer';
import axios from '@pasnik/axios';

export const useChangeWorkspaceMutation = () => {
  const queryClient = useQueryClient();
  const queryKey = ['users', 'me'];
  return useMutation(
    async ({ id }: WorkspaceModel) => {
      const { data } = await axios.post<UserModel>(
        `/auth/set-default-workspace/${id}`
      );
      return data;
    },
    {
      onMutate: async ({ id }: WorkspaceModel) => {
        await queryClient.cancelQueries(queryKey);
        const user = queryClient.getQueryData<UserModel>(queryKey);
        if (user) {
          queryClient.setQueryData(queryKey, {
            ...user,
            currentWorkspaceId: id,
          });
        }
      },
      onSuccess: (user) => {
        queryClient.setQueryData(queryKey, user);
      },
    }
  );
};
