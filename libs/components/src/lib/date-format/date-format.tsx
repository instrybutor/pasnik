import { format as formatDate } from 'date-fns';
import { pl } from 'date-fns/locale';

export interface DateFormatProps {
  date: number | string | null;
  format: string;
}

export function DateFormat({ date, format }: DateFormatProps) {
  const dateObj = date ? new Date(date) : undefined;
  return (
    <time dateTime={dateObj?.toISOString()}>
      {dateObj
        ? formatDate(new Date(dateObj), format, {
            locale: pl,
          })
        : '??-??-????'}
    </time>
  );
}
