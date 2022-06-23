import { formatDistance } from 'date-fns';
import { pl } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { Tooltip } from '../tooltip/tooltip';
import { DateFormat } from '../date-format/date-format';

export interface DateDistance {
  date?: number | string | null;
}

export function DateDistance({ date }: DateDistance) {
  const [dateObj, setDateObj] = useState<Date | null>(null);

  useEffect(() => {
    setDateObj(date ? new Date(date) : null);
  }, [date]);

  return (
    <Tooltip
      title={<DateFormat date={date ?? null} format="MM/dd/yyyy HH:mm" />}
    >
      <time dateTime={dateObj?.toISOString()}>
        {date
          ? formatDistance(new Date(date), new Date(), {
              addSuffix: true,
              locale: pl,
            })
          : '??-??-????'}
      </time>
    </Tooltip>
  );
}
