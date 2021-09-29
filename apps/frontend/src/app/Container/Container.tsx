import { FC } from 'react';
import { useAuth } from '@pasnik/shared/utils-auth';
import { Button } from '@mui/material';

export const Container: FC = ({ children }) => {
  const commitHash = process.env.NX_COMMIT_HASH;
  const auth = useAuth();

  return (
    <div className="flex flex-col h-screen justify-between">
      <div className="mb-auto">{children}</div>
      <div className="p-4 flex justify-between">
        <div className="flex items-center justify-center">
          Version: {commitHash ?? 'Development'}
        </div>
        <div className="flex items-center justify-center">
          <span className="mr-4">Logged as: {auth.user?.email}</span>
          <Button
            type="button"
            color="error"
            variant="outlined"
            onClick={() => auth.signOut()}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};
