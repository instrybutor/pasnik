export type CreateOrderPayload = Readonly<{
  from: string;
  menuUrl: string;
  orderAt: string;
  shippingCents?: number;
}>;
