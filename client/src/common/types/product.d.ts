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
  seller: string;
  stock: number;
  price: number;
  digital: boolean;
  category: string;
}
