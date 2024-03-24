/* Interface for the Product API.
 * Provided by the DjangoRestFramework used in the backend */
export interface ProductAPI {
  count: string;
  next?: string | null;
  previous?: string | null;
  results: Product[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  seller: Seller;
  stock: number;
  price: number;
  digital: boolean;
  category: string;
}

export interface Seller {
  id: string;
  name: string;
}
