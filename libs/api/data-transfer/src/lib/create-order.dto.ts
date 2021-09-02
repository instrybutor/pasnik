export interface CreateOrderDto {
  from?: string;
  menuUrl: string;
  orderAt: string;
  shippingCents?: number;
}
