import axios from "axios";

export interface OriginProduct {
  id: string;
  title: string;
  category_id: string;
  price: number;
  thumbnail: string;
  condition: string;
  shipping: {
    free_shipping: boolean;
  };
  available_quantity: number;
  attributes: {
    name: string;
    value_name: string;
  }[];
  location: {
    city: {
      name: string;
    };
  };
  sold_quantity: number;
  pictures: {
    url: string;
  }[];
  currency_id: string;
}

export interface OriginFilter {
  id: string;
  name: string;
  type: string;
  values: {
    id: string;
    name: string;
  }[];
}

export interface ProductDescription {
  plain_text: string;
}

export interface Category {
  name: string;
}

export interface GetOriginProductsResult {
  results: OriginProduct[];
  filters: OriginFilter[];
}

const BASE_URL = "https://api.mercadolibre.com";

export const getProducts = async (
  searchQuery: string
): Promise<GetOriginProductsResult> => {
  const response = await axios.get<GetOriginProductsResult>(
    `${BASE_URL}/sites/MLA/search?q=${searchQuery}`
  );
  return response?.data;
};

export const getProduct = async (productId: string): Promise<OriginProduct> => {
  const productResponse = await axios.get<OriginProduct>(
    `${BASE_URL}/items/${productId}`
  );

  return productResponse.data;
};

export const getProductDescription = async (
  productId: string
): Promise<ProductDescription> => {
  const descriptionResponse = await axios.get<ProductDescription>(
    `${BASE_URL}/items/${productId}/description`
  );

  return descriptionResponse.data;
};

export const getCategory = async (categoryId: string): Promise<Category> => {
  const descriptionResponse = await axios.get<Category>(
    `${BASE_URL}/categories/${categoryId}`
  );

  return descriptionResponse.data;
};
