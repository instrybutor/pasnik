import { FC, useCallback } from 'react';
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
    <div className="flex flex-col w-screen min-h-screen">
      {children}

      <footer className="p-4 flex flex-row">
        <div className="text-xs flex-grow flex gap-4">
          <div className="flex items-center">
            Version:{' '}
            <span className="bg-green-200 p-1 px-2 rounded">
              {commitHash ?? 'Development'}
            </span>
          </div>
          <div className="flex items-center">
            Copyright © <Link to="#">Paśnik</Link> {new Date().getFullYear()}.
          </div>
          <div className="flex flex-grow justify-end items-center">
            {auth.user ? (
              <>
                <span className="mr-4">Logged as: {auth.user?.email}</span>
                <Button
                  type="button"
                  color="error"
                  variant="outlined"
                  onClick={logoutHandler}
                >
                  Logout
                </Button>
              </>
            ) : null}
          </div>
        </div>
      </footer>
    </div>
  );
};
