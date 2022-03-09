import { useMutation, useQueryClient } from 'react-query';
import axios from '@pasnik/axios';
import {
  AddMembersToWorkspaceDto,
  WorkspaceAccessRequestModel,
  WorkspaceUserModel,
} from '@pasnik/api/data-transfer';

export const useWorkspaceAddMembersMutation = (slug: string) => {
  const queryClient = useQueryClient();
  const workspaceUsersQueryKey = ['workspaces', slug, 'users'];
  const workspaceAccessRequestsQueryKey = [
    'workspaces',
    slug,
    'access-requests',
  ];
  return useMutation(
    async (addMembersDto: AddMembersToWorkspaceDto) => {
      const { data } = await axios.put<WorkspaceUserModel[]>(
        `/api/workspaces/${slug}/users`,
        addMembersDto
      );
      return data;
    },
    {
      onSuccess: (workspaceUsers) => {
        const workspaceUsersQueryData =
          queryClient.getQueryData<WorkspaceUserModel[]>(
            workspaceUsersQueryKey
          ) ?? [];
        queryClient.setQueryData(workspaceUsersQueryKey, [
          ...workspaceUsersQueryData,
          ...workspaceUsers,
        ]);

        const workspaceAccessRequestsQueryData =
          queryClient.getQueryData<WorkspaceAccessRequestModel[]>(
            workspaceAccessRequestsQueryKey
          ) ?? [];
        queryClient.setQueryData(
          workspaceAccessRequestsQueryKey,
          workspaceAccessRequestsQueryData.filter((accessRequest) =>
            workspaceUsers.some(
              ({ user }) => accessRequest.user.id === user?.id
            )
          )
        );
      },
    }
  );
};
