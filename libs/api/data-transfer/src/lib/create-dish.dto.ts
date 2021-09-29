export interface CreateDishDto {
  name: string;
  priceCents: number;
  menu: string;
  paid?: boolean;
}
