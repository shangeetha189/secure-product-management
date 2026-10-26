import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import Product from "./models/Product.js";
import User from "./models/User.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


// ================= PRODUCT ROUTES =================

// GET all products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.log("Error getting products:", error);
    res.status(500).json({ message: "Error getting products" });
  }
});


// CREATE product
app.post("/product", async (req, res) => {
  const { name, category, price, stock, description } = req.body;

  try {
    const lastProduct = await Product.findOne().sort({ id: -1 });

    const newProduct = {
      id: lastProduct ? lastProduct.id + 1 : 1,
      name: name,
      category: category,
      price: price,
      stock: stock,
      description: description
    };

    await Product.create(newProduct);

    console.log("New product created:", newProduct);

    res.status(201).json(newProduct);
  } catch (error) {
    console.log("Error creating product:", error);
    res.status(500).json({ message: "Error creating product" });
  }
});


// UPDATE product
app.put("/product/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  const { name, category, price, stock, description } = req.body;

  try {
    const product = await Product.findOne({ id: id });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name;
    product.category = category;
    product.price = price;
    product.stock = stock;
    product.description = description;

    await Product.findOneAndUpdate(
      { id: id },
      {
        name: name,
        category: category,
        price: price,
        stock: stock,
        description: description
      }
    );

    console.log("Product updated:", product);

    res.json(product);
  } catch (error) {
    console.log("Error updating product:", error);
    res.status(500).json({ message: "Error updating product" });
  }
});


// DELETE product
app.delete("/product/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const product = await Product.findOne({ id: id });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Product.findOneAndDelete({ id: id });

    console.log("Product deleted:", product);

    res.json({
      message: "Product deleted successfully",
      product: product
    });
  } catch (error) {
    console.log("Error deleting product:", error);
    res.status(500).json({ message: "Error deleting product" });
  }
});


// ================= AUTHENTICATION =================

// REGISTER
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Please fill all fields"
      });
    }

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("Hashed password:", hashedPassword);

    const user = {
      username: username,
      email: email,
      password: hashedPassword
    };

    await User.create(user);

    console.log("User registered successfully");

    res.status(201).json({
      message: "Registration successful"
    });

  } catch (error) {
    console.log("Register error:", error);

    res.status(500).json({
      message: "Registration failed"
    });
  }
});


// LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      user.password
    );

    console.log("Password match:", isPasswordMatch);

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid password"
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token: token
    });

  } catch (error) {
    console.log("Login error:", error);

    res.status(500).json({
      message: "Login failed"
    });
  }
});


// ================= MONGODB CONNECTION =================

mongoose
  .connect("mongodb://127.0.0.1:27017/ProductDB")
  .then(async () => {

    console.log("MongoDB connected successfully");

    const defaultProducts = [
      {
        id: 1,
        name: "iPhone 15",
        category: "Smartphone",
        price: 65000,
        stock: 25,
        description: "Latest generation Apple smartphone"
      },
      {
        id: 2,
        name: "Dell Inspiron 15",
        category: "Laptop",
        price: 62000,
        stock: 8,
        description: "Powerful laptop for work and study"
      },
      {
        id: 3,
        name: "Sony WH-1000XM5",
        category: "Audio",
        price: 29999,
        stock: 18,
        description: "Premium wireless noise cancelling headphones"
      },
      {
        id: 4,
        name: "iPad Air",
        category: "Tablet",
        price: 55000,
        stock: 3,
        description: "Lightweight tablet with powerful performance"
      }
    ];

    for (const product of defaultProducts) {

      const existingProduct = await Product.findOne({
        id: product.id
      });

      if (!existingProduct) {
        await Product.create(product);
      }
    }

  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });


// ================= SERVER =================

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});