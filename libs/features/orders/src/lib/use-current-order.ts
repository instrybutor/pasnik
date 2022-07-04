import { useSlug } from '@pasnik/shared/utils';
import { useOrder } from './queries';

export function useCurrentOrder() {
  const slug = useSlug();
  const query = useOrder(slug);
  return {
    ...query,
    order: query.data,
  };
}
