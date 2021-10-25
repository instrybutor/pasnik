import { format as formatDate } from 'date-fns';
import { pl } from 'date-fns/locale';

export interface DateFormatProps {
  date: number | string | null;
  format: string;
}

const formatStrMap: Record<string, string> = {
  LT: 'HH:ss',
  LTS: 'HH:mm:ss',
  L: 'dd/MM/yyyy',
  LL: 'd MMMM yyyy',
  LLL: 'd MMMM yyyy HH:mm',
  LLLL: 'd MMMM yyyy HH:mm',
};

export function DateFormat({ date, format }: DateFormatProps) {
  const dateObj = date ? new Date(date) : undefined;
  const formatStr = formatStrMap[format] ?? format;
  return (
    <time dateTime={dateObj?.toISOString()}>
      {dateObj
        ? formatDate(dateObj, formatStr, {
            locale: pl,
          })
        : '??-??-????'}
    </time>
  );
}
