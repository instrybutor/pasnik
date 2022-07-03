import { createContext } from 'react';
import { UserModel } from '@pasnik/api/data-transfer';

const emptyUser = new Proxy(
  {},
  {
    get() {
      throw new Error('Used outside RequireAuth context!');
    },
  }
) as UserModel;

export const UserContext = createContext<UserModel>(emptyUser);
