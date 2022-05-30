import currency from 'currency.js';

export const currencyTransform = {
  output: (value: string) =>
    currency(value ?? 0, {
      symbol: '',
      decimal: ',',
      separator: '',
    }).value * 100,
  input: (value?: number) =>
    currency(value ?? 0, {
      fromCents: true,
      symbol: '',
      decimal: ',',
      separator: '',
    }).format(),
};
