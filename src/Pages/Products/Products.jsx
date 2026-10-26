import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Inventory2Icon from "@mui/icons-material/Inventory2";
import CategoryIcon from "@mui/icons-material/Category";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import "./Products.css";

function Products() {

  /* =========================
     PRODUCTS FROM DATABASE
  ========================= */

  const [products, setProducts] = useState([]);


  /* =========================
     STATES
  ========================= */

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [showForm, setShowForm] = useState(false);

  const [editId, setEditId] = useState(null);

  const [name, setName] = useState("");

  const [productCategory, setProductCategory] = useState("");

  const [price, setPrice] = useState("");

  const [stock, setStock] = useState("");

  const [description, setDescription] = useState("");


  /* =========================
     GET PRODUCTS FROM DATABASE
  ========================= */

  useEffect(() => {

    const getProducts = async () => {

      try {

        const response = await fetch(
          "http://localhost:4000/products"
        );

        const data = await response.json();

        if (response.ok) {

          setProducts(data);

        } else {

          alert(data.message);

        }

      } catch (error) {

        console.log("Error getting products:", error);

        alert("Unable to connect to server");

      }

    };

    getProducts();

  }, []);


  /* =========================
     OPEN ADD FORM
  ========================= */

  const handleAddProduct = () => {

    setEditId(null);

    setName("");

    setProductCategory("");

    setPrice("");

    setStock("");

    setDescription("");

    setShowForm(true);

  };


  /* =========================
     OPEN EDIT FORM
  ========================= */

  const handleEdit = (product) => {

    setEditId(product.id);

    setName(product.name);

    setProductCategory(product.category);

    setPrice(product.price);

    setStock(product.stock);

    setDescription(product.description);

    setShowForm(true);

  };


  /* =========================
     SAVE PRODUCT
  ========================= */

  const handleSubmit = async (e) => {

    e.preventDefault();


    if (
      !name ||
      !productCategory ||
      !price ||
      !stock ||
      !description
    ) {

      alert("Please fill all the fields");

      return;

    }


    try {

      /* =========================
         EDIT PRODUCT
      ========================= */

      if (editId !== null) {

        const response = await fetch(
          `http://localhost:4000/product/${editId}`,
          {
            method: "PUT",

            headers: {
              "Content-Type": "application/json"
            },

            body: JSON.stringify({
              name: name,
              category: productCategory,
              price: Number(price),
              stock: Number(stock),
              description: description
            })
          }
        );


        const data = await response.json();


        if (response.ok) {

          setProducts(
            products.map((product) =>
              product.id === editId
                ? data
                : product
            )
          );

          alert("Product updated successfully");

        } else {

          alert(data.message);

        }

      }


      /* =========================
         CREATE PRODUCT
      ========================= */

      else {

        const response = await fetch(
          "http://localhost:4000/product",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json"
            },

            body: JSON.stringify({
              name: name,
              category: productCategory,
              price: Number(price),
              stock: Number(stock),
              description: description
            })
          }
        );


        const data = await response.json();


        if (response.ok) {

          setProducts([
            ...products,
            data
          ]);

          alert("Product added successfully");

        } else {

          alert(data.message);

        }

      }

    } catch (error) {

      console.log("Product error:", error);

      alert("Unable to connect to server");

    }


    setShowForm(false);

    setName("");

    setProductCategory("");

    setPrice("");

    setStock("");

    setDescription("");

    setEditId(null);

  };


  /* =========================
     DELETE PRODUCT
  ========================= */

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this product?"
      );


    if (!confirmDelete) {

      return;

    }


    try {

      const response = await fetch(
        `http://localhost:4000/product/${id}`,
        {
          method: "DELETE"
        }
      );


      const data = await response.json();


      if (response.ok) {

        setProducts(
          products.filter(
            (product) => product.id !== id
          )
        );

        alert("Product deleted successfully");

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.log("Delete error:", error);

      alert("Unable to connect to server");

    }

  };


  /* =========================
     FILTER PRODUCTS
  ========================= */

  const filteredProducts =
    products.filter((product) => {

      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        product.category
          .toLowerCase()
          .includes(search.toLowerCase());


      const matchesCategory =
        category === "All" ||
        product.category === category;


      return matchesSearch && matchesCategory;

    });


  /* =========================
     TOTAL VALUES
  ========================= */

  const totalProducts =
    products.length;


  const totalStock =
    products.reduce(
      (total, product) =>
        total + Number(product.stock),
      0
    );


  const lowStock =
    products.filter(
      (product) => Number(product.stock) <= 10
    ).length;


  return (

    <div className="products-page">


      {/* =================================
          SIDEBAR
      ================================= */}

      <aside className="products-sidebar">


        <div className="products-brand">

          <div className="products-brand-mark">
            A
          </div>

          <span>
            AURELIA
          </span>

        </div>


        <div className="products-nav-title">
          WORKSPACE
        </div>


        <nav className="products-navigation">


          <Link
            to="/dashboard"
            className="products-nav-link"
          >

            <span>◈</span>

            Dashboard

          </Link>


          <Link
            to="/products"
            className="products-nav-link active"
          >

            <Inventory2Icon />

            Products

          </Link>


          <Link
            to="/products"
            className="products-nav-link"
          >

            <CategoryIcon />

            Categories

          </Link>


          <div className="products-nav-title system-title">
            SYSTEM
          </div>


          <Link
            to="/about"
            className="products-nav-link"
          >

            <span>○</span>

            About

          </Link>


          <Link
            to="/contact"
            className="products-nav-link"
          >

            <span>□</span>

            Contact

          </Link>

        </nav>


        <div className="products-sidebar-bottom">


          <div className="products-user">

            <div className="products-avatar">
              A
            </div>

            <div>

              <strong>
                Admin
              </strong>

              <small>
                Administrator
              </small>

            </div>

          </div>


          <Link
            to="/login"
            className="products-logout"
          >

            Log out

          </Link>

        </div>

      </aside>


      {/* =================================
          MAIN CONTENT
      ================================= */}

      <main className="products-main">


        {/* HEADER */}

        <header className="products-header">


          <div>

            <Link
              to="/dashboard"
              className="products-back"
            >

              <ArrowBackIcon />

              Dashboard

            </Link>


            <div className="products-label">
              PRODUCT MANAGEMENT
            </div>


            <h1>
              Your <span>products.</span>
            </h1>


            <p>
              Manage your complete product catalog
              from one place.
            </p>

          </div>


          <button
            className="add-product-button"
            onClick={handleAddProduct}
          >

            <AddIcon />

            Add Product

          </button>

        </header>


        {/* =================================
            SUMMARY
        ================================= */}

        <section className="products-summary">


          <div className="summary-box">

            <span>
              TOTAL PRODUCTS
            </span>

            <strong>
              {totalProducts}
            </strong>

          </div>


          <div className="summary-box">

            <span>
              TOTAL UNITS
            </span>

            <strong>
              {totalStock}
            </strong>

          </div>


          <div className="summary-box warning">

            <span>
              LOW STOCK
            </span>

            <strong>
              {lowStock}
            </strong>

          </div>


          <div className="summary-message">

            <span>
              CATALOG STATUS
            </span>

            <strong>
              ● Everything is up to date
            </strong>

          </div>

        </section>


        {/* =================================
            SEARCH + FILTER
        ================================= */}

        <section className="products-toolbar">


          <div className="product-search">

            <SearchIcon />

            <input
              type="text"
              placeholder="Search products or categories..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          <div className="category-filter">

            <button
              className={
                category === "All"
                  ? "filter-button active"
                  : "filter-button"
              }
              onClick={() =>
                setCategory("All")
              }
            >
              All
            </button>


            <button
              className={
                category === "Smartphone"
                  ? "filter-button active"
                  : "filter-button"
              }
              onClick={() =>
                setCategory("Smartphone")
              }
            >
              Smartphones
            </button>


            <button
              className={
                category === "Laptop"
                  ? "filter-button active"
                  : "filter-button"
              }
              onClick={() =>
                setCategory("Laptop")
              }
            >
              Laptops
            </button>


            <button
              className={
                category === "Audio"
                  ? "filter-button active"
                  : "filter-button"
              }
              onClick={() =>
                setCategory("Audio")
              }
            >
              Audio
            </button>


            <button
              className={
                category === "Tablet"
                  ? "filter-button active"
                  : "filter-button"
              }
              onClick={() =>
                setCategory("Tablet")
              }
            >
              Tablets
            </button>

          </div>

        </section>


        {/* =================================
            PRODUCTS
        ================================= */}

        <section className="products-grid">


          {filteredProducts.map((product) => (

            <div
              className="product-card"
              key={product.id}
            >


              {/* CARD TOP */}

              <div className="product-card-top">

                <div className="product-card-symbol">

                  {product.name
                    .substring(0, 2)
                    .toUpperCase()}

                </div>


                <div className="product-actions">

                  <button
                    onClick={() =>
                      handleEdit(product)
                    }
                  >

                    <EditIcon />

                  </button>


                  <button
                    onClick={() =>
                      handleDelete(product.id)
                    }
                  >

                    <DeleteIcon />

                  </button>

                </div>

              </div>


              {/* PRODUCT INFO */}

              <div className="product-card-info">

                <span className="product-category">
                  {product.category}
                </span>


                <h2>
                  {product.name}
                </h2>


                <p>
                  {product.description}
                </p>

              </div>


              {/* PRICE */}

              <div className="product-price">

                ₹{Number(product.price).toLocaleString("en-IN")}

              </div>


              {/* BOTTOM */}

              <div className="product-card-bottom">


                <div>

                  <small>
                    STOCK
                  </small>

                  <strong>
                    {product.stock} units
                  </strong>

                </div>


                <span
                  className={
                    Number(product.stock) <= 10
                      ? "stock-status low"
                      : "stock-status good"
                  }
                >

                  ●{" "}

                  {Number(product.stock) <= 10
                    ? "Low Stock"
                    : "In Stock"}

                </span>

              </div>

            </div>

          ))}


          {/* EMPTY */}

          {filteredProducts.length === 0 && (

            <div className="no-products">

              <Inventory2Icon />

              <h2>
                No products found
              </h2>

              <p>
                Try another search or add a new product.
              </p>

            </div>

          )}

        </section>

      </main>


      {/* =================================
          ADD / EDIT MODAL
      ================================= */}

      {showForm && (

        <div className="product-modal-overlay">


          <div className="product-modal">


            <button
              className="modal-close"
              onClick={() =>
                setShowForm(false)
              }
            >

              <CloseIcon />

            </button>


            <div className="modal-label">

              {editId
                ? "EDIT PRODUCT"
                : "NEW PRODUCT"}

            </div>


            <h2>

              {editId
                ? "Update product"
                : "Add a product"}

            </h2>


            <p>
              Enter the product information below.
            </p>


            <form onSubmit={handleSubmit}>


              {/* NAME */}

              <div className="modal-field">

                <label>
                  PRODUCT NAME
                </label>

                <input
                  type="text"
                  placeholder="Example: MacBook Air"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />

              </div>


              {/* CATEGORY */}

              <div className="modal-field">

                <label>
                  CATEGORY
                </label>

                <select
                  value={productCategory}
                  onChange={(e) =>
                    setProductCategory(e.target.value)
                  }
                >

                  <option value="">
                    Select category
                  </option>

                  <option value="Smartphone">
                    Smartphone
                  </option>

                  <option value="Laptop">
                    Laptop
                  </option>

                  <option value="Audio">
                    Audio
                  </option>

                  <option value="Tablet">
                    Tablet
                  </option>

                  <option value="Wearable">
                    Wearable
                  </option>

                  <option value="Accessories">
                    Accessories
                  </option>

                </select>

              </div>


              {/* PRICE + STOCK */}

              <div className="modal-row">


                <div className="modal-field">

                  <label>
                    PRICE
                  </label>

                  <input
                    type="number"
                    placeholder="₹ 0"
                    value={price}
                    onChange={(e) =>
                      setPrice(e.target.value)
                    }
                  />

                </div>


                <div className="modal-field">

                  <label>
                    STOCK
                  </label>

                  <input
                    type="number"
                    placeholder="0"
                    value={stock}
                    onChange={(e) =>
                      setStock(e.target.value)
                    }
                  />

                </div>

              </div>


              {/* DESCRIPTION */}

              <div className="modal-field">

                <label>
                  DESCRIPTION
                </label>

                <textarea
                  placeholder="Describe the product..."
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                />

              </div>


              <button
                type="submit"
                className="modal-submit"
              >

                {editId
                  ? "Update Product"
                  : "Create Product"}

                <AddIcon />

              </button>

            </form>

          </div>

        </div>

      )}

    </div>

  );

}

export default Products;