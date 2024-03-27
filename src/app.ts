import express from "express";
import cors from "cors";

import {
  getProducts,
  getProduct,
  getProductDescription,
  getCategory,
  Category,
} from "./services";
import { GetProductResponse, GetProductsResponse, Product } from "./types";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get("/api/items", async (req, res) => {
  const searchQuery = req.query.q as string;
  try {
    const { results: originProducts, filters } = await getProducts(searchQuery);

    const uniqueCategoriesSet: Set<string> = new Set();
    filters.forEach((filter) => {
      filter?.values?.forEach((value) => uniqueCategoriesSet.add(value.name));
    });

    const categories: string[] = Array.from(uniqueCategoriesSet);

    const items: Product[] = originProducts?.slice(0, 4).map((product) => ({
      id: product.id,
      title: product.title,
      price: {
        currency: "COP",
        amount: product.price || 0,
        decimals: 0,
      },
      picture: product.thumbnail,
      condition: product.condition,
      description: product?.attributes
        ?.map((attribute) => `${attribute.name}: ${attribute.value_name}`)
        .join(", "),
      free_shipping: product.shipping?.free_shipping,
      location: product?.location?.city?.name,
    }));

    const result: GetProductsResponse = {
      author: {
        name: "Cristian",
        lastname: "Mateus",
      },
      categories,
      items,
    };

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/items/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await getProduct(productId);
    const description = await getProductDescription(productId);
    let category: Category = { name: "" };
    if (product) {
      category = await getCategory(product.category_id);
    }

    const item: Product = {
      id: product.id,
      title: product.title,
      price: {
        currency: "COP",
        amount: product.price || 0,
        decimals: 0,
      },
      picture: product.pictures[0]?.url,
      condition: product.condition,
      free_shipping: product.shipping?.free_shipping,
      location: product?.location?.city?.name,
      description: description?.plain_text,
      sold_quantity: product?.sold_quantity || 0,
      category: category?.name,
    };

    const result: GetProductResponse = {
      author: {
        name: "Cristian",
        lastname: "Mateus",
      },
      item,
    };

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
