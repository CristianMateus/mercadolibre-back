export interface BaseServiceResponse {
  author: {
    name: String;
    lastname: String;
  };
}

export interface GetProductsResponse extends BaseServiceResponse {
  categories: string[];
  items: Product[];
}

export interface GetProductResponse extends BaseServiceResponse {
  item: Product;
}

export interface GetProductResponse extends BaseServiceResponse {
  item: Product;
}

export interface ProductPrice {
  currency: string;
  amount: number;
  decimals: number;
}

export interface Product {
  id: string;
  title: string;
  price: ProductPrice;
  picture: string;
  condition: string;
  free_shipping: boolean;
  sold_quantity?: Number;
  description?: string;
  location?: string;
  category?: string;
}
