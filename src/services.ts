import axios from "axios";

interface Product {
  id: string;
  name: string;
}

const BASE_URL = "https://api.mercadolibre.com";

export async function getProducts(searchQuery: string): Promise<Product[]> {
  const response = await axios.get<Product[]>(
    `${BASE_URL}/sites/MLA/search?q=${searchQuery}`
  );
  return response.data;
}

export async function getProductById(
  productId: string
): Promise<Product | null> {
  const productResponse = await axios.get<Product>(
    `${BASE_URL}/items/${productId}`
  );
  const descriptionResponse = await axios.get<Product>(
    `${BASE_URL}/items/${productId}/description`
  );

  //   ! armar objeto
  return productResponse.data;
}
