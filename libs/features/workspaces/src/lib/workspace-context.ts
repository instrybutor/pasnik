import { createContext } from 'react';
import { WorkspaceModel } from '@pasnik/api/data-transfer';

export const WorkspaceContext = createContext<WorkspaceModel | undefined>(
  undefined
);
