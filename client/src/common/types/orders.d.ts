import { Product } from "./product";

export interface Order {
  id: string;
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  total: number;
  items: Product[];
  created_at: string;
}

export interface addToCartDTO {
  product_id: string;
}

export interface patchCartDTO {
  method: string;
  product_id: string;
}
