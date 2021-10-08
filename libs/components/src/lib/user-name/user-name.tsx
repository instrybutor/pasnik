import { UserModel } from '@pasnik/api/data-transfer';
import { PropsWithChildren } from 'react';
import classNames from 'classnames';

export interface UserNameProps {
  user?: UserModel | null;
  initials?: boolean;
}

export function UserName({
  user,
  children,
  initials,
}: PropsWithChildren<UserNameProps>) {
  const formatName = ({ givenName, familyName, email }: UserModel) =>
    givenName && familyName ? `${givenName} ${familyName}` : email;

  const formatInitials = ({ givenName, familyName, email }: UserModel) =>
    givenName && familyName ? `${givenName[0]}${familyName[0]}` : email[0];

  return user ? (
    <div
      className={classNames({
        'inline-flex': !children,
      })}
    >
      <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
        {initials ? formatInitials(user) : formatName(user)}
      </p>
      {children && (
        <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
          {children}
        </p>
      )}
    </div>
  ) : (
    <div />
  );
}
