import { useMutation } from 'react-query';
import axios from '@pasnik/axios';

export const useWorkspaceAddMembersMutation = (slug: string) => {
  return useMutation(async () => {
    const { data } = await axios.put(`/api/workspaces/${slug}/request-access`);
    return data;
  });
};
