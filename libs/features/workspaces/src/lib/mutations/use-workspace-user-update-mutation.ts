import { useMutation, useQueryClient } from 'react-query';
import {
  UpdateWorkspaceUserDto,
  WorkspaceUserModel,
} from '@pasnik/api/data-transfer';
import axios from '@pasnik/axios';

const updateUserInCollection = (
  userToUpdate: Partial<WorkspaceUserModel>,
  users: WorkspaceUserModel[]
) => {
  const userIdx = users.findIndex((user) => user.id === userToUpdate.id);
  if (userIdx !== -1) {
    const newCollection = [...users];
    const previousUser = users[userIdx];
    newCollection[userIdx] = {
      ...previousUser,
      ...userToUpdate,
    };
    return newCollection;
  }

  return users;
};

export const useWorkspaceUserUpdateMutation = (
  slug: string,
  userId: number
) => {
  const queryKey = ['workspaces', slug, 'users'];
  const queryClient = useQueryClient();
  return useMutation(
    async (updateWorkspaceUserDto: UpdateWorkspaceUserDto) => {
      const { data } = await axios.put<WorkspaceUserModel>(
        `/api/workspaces/${slug}/users/${userId}`,
        updateWorkspaceUserDto
      );
      return data;
    },
    {
      onMutate: async (updateWorkspaceUserDto: UpdateWorkspaceUserDto) => {
        const users =
          queryClient.getQueryData<WorkspaceUserModel[]>(queryKey) ?? [];

        const newCollection = updateUserInCollection({
          ...updateWorkspaceUserDto,
          id: userId,
        }, users);

        queryClient.setQueryData(queryKey, newCollection);

        return { users };
      },
      onError: (err, updateWorkspaceDto, context) => {
        queryClient.setQueryData(queryKey, context?.users);
      },
      onSuccess: (updatedUser) => {
        const users =
          queryClient.getQueryData<WorkspaceUserModel[]>(queryKey) ?? [];
        const newCollection = updateUserInCollection(updatedUser, users);

        queryClient.setQueryData(queryKey, newCollection);
      }
    }
  );
};
