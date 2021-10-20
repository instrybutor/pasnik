import currency from 'currency.js';
export interface PriceProps {
  priceCents?: number | string | null;
}

export function Price({ priceCents }: PriceProps) {
  const price = currency(priceCents ?? 0, {
    fromCents: true,
    pattern: '# !',
    negativePattern: '-# !',
  }).format({
    precision: 2,
    symbol: 'zł',
  });

  return <span>{price}</span>;
}
