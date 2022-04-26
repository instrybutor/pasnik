import { useMutation } from 'react-query';
import axios from '@pasnik/axios';

export const useWorkspaceApproveMembersMutation = (slug: string) => {
  return useMutation(async (email: string) => {
    const { data } = await axios.put(`/api/workspaces/${slug}/request-access`);
    return data;
  });
};
