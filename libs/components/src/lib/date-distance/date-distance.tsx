import { formatDistance } from 'date-fns';
import { pl } from 'date-fns/locale';

export interface DateDistance {
  date?: number | string | null;
}

export function DateDistance({ date }: DateDistance) {
  return (
    <>
      {date
        ? formatDistance(new Date(date), new Date(), {
            addSuffix: true,
            locale: pl,
          })
        : '??-??-????'}
    </>
  );
}
