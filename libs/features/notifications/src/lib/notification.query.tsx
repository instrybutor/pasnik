import axios from '@pasnik/axios';
import { useQuery } from 'react-query';

import {
  NotificationModel,
  OrderStatusChangedDto,
} from '@pasnik/api/data-transfer';

const QUERY_KEY = ['notifications', 'list'];
const API_URL = '/api/notifications';

export const useNotificationsQuery = () => {
  return useQuery(
    QUERY_KEY,
    async () => {
      const { data } = await axios.get<
        NotificationModel<OrderStatusChangedDto>[]
      >(API_URL);
      return data;
    },
    {
      refetchInterval: 5000,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
};
