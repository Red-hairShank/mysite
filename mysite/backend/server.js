const express = require("express");

const app = express();

app.use(express.json());

// Mock data for the "products" collection

const products = [
  { id: 1, name: "Product 1", price: 100 },
  { id: 2, name: "Product 2", price: 200 },
  { id: 3, name: "Product 3", price: 300 },
];

// GET all products

app.get("/products", (req, res) => {
  res.json(products);
});

// GET a single product by ID

app.get("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});

// POST a new product

app.post("/products", (req, res) => {
  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    price: parseFloat(req.body.price),
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT update an existing product

app.put("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const updatedProduct = {
    id: productId,
    name: req.body.name,
    price: parseFloat(req.body.price),
  };

  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  products[productIndex] = updatedProduct;
  res.json(updatedProduct);
});

// DELETE a product by ID
app.delete("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  products.splice(productIndex, 1);
  res.status(204).end();
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
