import axios from '@pasnik/axios';
import { useQuery } from 'react-query';

const QUERY_KEY = ['notifications', 'list'];
const API_URL = '/api/notifications';

interface Notification {
  type: string;
  status: string;
  data: {
    slug: string;
    title: string;
  };
  createdAt: string;
}

export const useNotificationsQuery = () => {
  return useQuery(
    QUERY_KEY,
    async () => {
      const { data } = await axios.get<Notification[]>(API_URL);
      return data;
    },
    {
      refetchInterval: 5000,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
};
