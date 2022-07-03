import { createContext } from 'react';
import { WorkspaceModel } from '@pasnik/api/data-transfer';

const emptyWorkspace = new Proxy(
  {},
  {
    get() {
      throw new Error('Used outside RequireAuth context!');
    },
  }
) as WorkspaceModel;

export const WorkspaceContext = createContext<WorkspaceModel>(emptyWorkspace);
