import { StackedListItem } from './stacked-list-item';
import { StackedListItemSubItem } from './stacked-list-item-sub-item';

export interface StackedListProps {
  children: JSX.Element[];
}

export function StackedList({ children }: StackedListProps) {
  return <ul className="divide-y divide-gray-200">{children}</ul>;
}

StackedList.Item = StackedListItem;
StackedList.SubItem = StackedListItemSubItem;
