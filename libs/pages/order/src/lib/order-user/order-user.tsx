import { UserModel } from '@pasnik/api/data-transfer';
import { useCallback } from 'react';

export interface OrderUserProps {
  user: UserModel;
  initials?: boolean;
}

export function OrderUser({ user, initials }: OrderUserProps) {
  const formatInitials = (familyName: string, givenName: string) =>
    `${givenName[0]}${familyName[0]}`;
  const formatName = useCallback(() => {
    if (user.familyName && user.givenName) {
      return initials
        ? formatInitials(user.familyName, user.givenName)
        : `${user.familyName} ${user.givenName}`;
    }
    return user.email;
  }, [initials, user.email, user.familyName, user.givenName]);

  return <span className="font-medium text-gray-900">{formatName()}</span>;
}

export default OrderUser;
