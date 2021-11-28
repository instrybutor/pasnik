import { UserModel } from '@pasnik/api/data-transfer';
import { PropsWithChildren } from 'react';
import classNames from 'classnames';

export interface UserNameProps {
  user?: UserModel | null;
  initials?: boolean;
  fallbackValue?: string;
}

const formatName = ({ givenName, familyName, email }: UserModel) =>
  givenName && familyName ? `${givenName} ${familyName}` : email;

const formatInitials = ({ givenName, familyName, email }: UserModel) =>
  givenName && familyName ? `${givenName[0]}${familyName[0]}` : email[0];

export function UserName({
  user,
  children,
  initials,
  fallbackValue,
}: PropsWithChildren<UserNameProps>) {
  const formatUser = () => {
    if (!user) {
      return fallbackValue;
    }

    return initials ? formatInitials(user) : formatName(user);
  };

  return (
    <div
      className={classNames('overflow-hidden', {
        'inline-flex': !children,
        'flex flex-col': Boolean(children),
      })}
    >
      <p className="truncate">{formatUser()}</p>
      {children && (
        <p className="text-xs font-medium text-gray-500 truncate">{children}</p>
      )}
    </div>
  );
}
