export interface PriceProps {
  priceCents?: number | string | null;
}

const currencyFormatter = Intl.NumberFormat('pl-pl', {
  currency: 'PLN',
  style: 'currency',
});

export function Price({ priceCents }: PriceProps) {
  return (
    <>{priceCents ? currencyFormatter.format(+priceCents / 100) : '0 zł'}</>
  );
}
