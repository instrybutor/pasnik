import { StackedList, UserAvatar, Users } from '@pasnik/components';
import { OrderStatusBadge } from '@pasnik/features/orders';

export function DashboardOrderListSkeleton() {
  return (
    <StackedList>
      {[3, 2].map((item) => (
        <StackedList.Item
          key={item}
          title={<div className="skeleton w-52" />}
          titleRight={<OrderStatusBadge.Skeleton />}
          subTitle={
            <>
              <StackedList.SubItem className="sm:w-40">
                <UserAvatar.Skeleton size="xsm" className="mr-2" />
                <div className="skeleton flex-1" />
              </StackedList.SubItem>
              <StackedList.SubItem className="sm:w-24">
                <div className="skeleton icon" />
                <div className="skeleton flex-1" />
              </StackedList.SubItem>
              <StackedList.SubItem className="sm:w-32">
                <div className="skeleton icon" />
                <div className="skeleton flex-1" />
              </StackedList.SubItem>
              <StackedList.SubItem>
                <div className="skeleton icon" />
                <div className="skeleton w-32" />
              </StackedList.SubItem>
            </>
          }
          subTitleRight={<Users.Skeleton avatarSize="xsm" usersToShow={item} />}
        />
      ))}
    </StackedList>
  );
}
