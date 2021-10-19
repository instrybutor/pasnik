import currency from 'currency.js';
export interface PriceProps {
  priceCents?: number | string | null;
}

export function Price({ priceCents }: PriceProps) {
  const price = currency(priceCents ?? 0, {
    fromCents: true,
    pattern: '# !',
  }).format({
    precision: 2,
    symbol: 'PLN',
  });

  return <span>{price}</span>;
}
