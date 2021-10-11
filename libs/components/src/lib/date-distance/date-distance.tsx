import { formatDistance } from 'date-fns';
import { pl } from 'date-fns/locale';
import { useEffect, useState } from 'react';

export interface DateDistance {
  date?: number | string | null;
}

export function DateDistance({ date }: DateDistance) {
  const [dateObj, setDateObj] = useState<Date | null>(null);

  useEffect(() => {
    setDateObj(date ? new Date(date) : null);
  }, [date]);

  return (
    <time dateTime={dateObj?.toISOString()}>
      {date
        ? formatDistance(new Date(date), new Date(), {
            addSuffix: true,
            locale: pl,
          })
        : '??-??-????'}
    </time>
  );
}
