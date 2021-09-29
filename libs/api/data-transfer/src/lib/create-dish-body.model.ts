export interface CreateDishBody {
  id: string
  name: string;
  priceCents: number;
  paid?: boolean;
}
