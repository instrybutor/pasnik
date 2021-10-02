import { FC } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar';

export const Container: FC = ({ children }) => {
  const commitHash = process.env.NX_COMMIT_HASH;
  return (
    <div className="flex flex-col w-screen min-h-screen">
      <header>
        <NavBar />
      </header>

      <main className="flex-grow">
        <div className="mx-auto py-6 sm:px-6 lg:px-8">{children}</div>
      </main>

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
        </div>
      </footer>
    </div>
  );
};
