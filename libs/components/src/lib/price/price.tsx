import currency from 'currency.js';

export interface PriceProps {
  priceCents?: number | string | null;
  className?: string;
  precission?: number;
}

export function Price({ priceCents, className, precission }: PriceProps) {
  const price = currency(priceCents ?? 0, {
    fromCents: true,
    pattern: '# !',
    separator: ' ',
    decimal: ',',
    negativePattern: '-# !',
  }).format({
    precision: precission,
    symbol: '',
  });
  return (
    <span className={className}>
      {price} <span>zł</span>
    </span>
  );
}
