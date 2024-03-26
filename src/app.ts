import express from "express";
import cors from "cors"; // Import cors package
import { getProducts, getProductById } from "./services";

const app = express();
const PORT = process.env.PORT || 3001; // Change the port to 3001

app.use(cors()); // Enable CORS for all routes

app.get("/api/items", async (req, res) => {
  const searchQuery = req.query.q as string;
  try {
    const products = await getProducts(searchQuery);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/items/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await getProductById(productId);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
