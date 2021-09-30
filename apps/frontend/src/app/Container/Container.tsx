import { FC, Fragment, useCallback } from 'react';
import { useAuth } from '@pasnik/shared/utils-auth';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export const Container: FC = ({ children }) => {
  const commitHash = process.env.NX_COMMIT_HASH;
  const auth = useAuth();
  const logoutHandler = useCallback(() => {
    auth.signOut();
  }, [auth]);

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <div className="mb-auto">{children}</div>
      <div className="p-4 flex justify-between">
        <div className="p-4 absolute bottom-0 left-0 text-xs flex gap-4">
          <div>
            Version:{' '}
            <span className="bg-green-200 p-1 px-2 rounded">
              {commitHash ?? 'Development'}
            </span>
          </div>
          <div>
            Copyright © <Link to="#">Paśnik</Link> {new Date().getFullYear()}.
          </div>
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
