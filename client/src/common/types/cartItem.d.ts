import { Product } from "./product";

export interface CartItem extends Product {
  order_item: string;
  quantity: number;
}
