import { FC, Fragment, useCallback } from 'react';
import { useAuth } from '@pasnik/shared/utils-auth';
import { Button } from '@mui/material';

export const Container: FC = ({ children }) => {
  const commitHash = process.env.NX_COMMIT_HASH;
  const auth = useAuth();
  const logoutHandler = useCallback(() => {
    auth.signOut();
  }, [auth]);

  return (
    <div className="flex flex-col h-screen justify-between">
      <div className="mb-auto">{children}</div>
      <div className="p-4 flex justify-between">
        <div className="flex items-center justify-center">
          Version: {commitHash ?? 'Development'}
        </div>
        <div className="flex items-center justify-center">
          {auth.user ? (
            <Fragment>
              <span className="mr-4">Logged as: {auth.user?.email}</span>
              <Button
                type="button"
                color="error"
                variant="outlined"
                onClick={logoutHandler}
              >
                Logout
              </Button>
            </Fragment>
          ) : null}
        </div>
      </div>
    </div>
  );
};
