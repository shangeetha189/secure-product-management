import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Inventory2Icon from "@mui/icons-material/Inventory2";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CategoryIcon from "@mui/icons-material/Category";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import "./Dashboard.css";

function Dashboard() {

  const [products, setProducts] = useState([]);

  /* =========================
     GET PRODUCTS FROM BACKEND
  ========================= */

  const getProducts = async () => {

    try {

      const response = await fetch(
        "http://localhost:4000/products"
      );

      const data = await response.json();

      if (response.ok) {
        setProducts(data);
      } else {
        console.log("Error getting products:", data.message);
      }

    } catch (error) {

      console.log(
        "Unable to connect to product server:",
        error
      );

    }

  };


  /* =========================
     LOAD PRODUCTS
  ========================= */

  useEffect(() => {

    getProducts();

    // Refresh when returning to Dashboard
    const handleFocus = () => {
      getProducts();
    };

    window.addEventListener(
      "focus",
      handleFocus
    );

    return () => {

      window.removeEventListener(
        "focus",
        handleFocus
      );

    };

  }, []);


  /* =========================
     CURRENT DATE
  ========================= */

  const currentDate = new Date();

  const dayName = currentDate.toLocaleDateString(
    "en-IN",
    {
      weekday: "long"
    }
  );

  const monthName = currentDate.toLocaleDateString(
    "en-IN",
    {
      month: "long"
    }
  );

  const year = currentDate.getFullYear();


  /* =========================
     GREETING
  ========================= */

  const currentHour = currentDate.getHours();

  let greeting = "Good morning";

  if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good afternoon";
  }

  if (currentHour >= 17) {
    greeting = "Good evening";
  }


  /* =========================
     DASHBOARD CALCULATIONS
  ========================= */

  const totalProducts = products.length;


  const totalStock = products.reduce(
    (total, product) =>
      total + Number(product.stock || 0),
    0
  );


  const inventoryValue = products.reduce(
    (total, product) =>
      total +
      Number(product.price || 0) *
      Number(product.stock || 0),
    0
  );


  const lowStockProducts = products.filter(
    (product) =>
      Number(product.stock || 0) <= 10
  );


  const lowStock = lowStockProducts.length;


  const categories = [
    ...new Set(
      products
        .map((product) => product.category)
        .filter(Boolean)
    )
  ];


  const totalCategories = categories.length;


  /* =========================
     FORMAT CURRENCY
  ========================= */

  const formatCurrency = (value) => {

    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(1)}Cr`;
    }

    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(1)}L`;
    }

    if (value >= 1000) {
      return `₹${(value / 1000).toFixed(1)}K`;
    }

    return `₹${value.toLocaleString("en-IN")}`;

  };


  /* =========================
     CATEGORY STOCK DATA
  ========================= */

  const categoryData = categories.map(
    (category) => {

      const stock = products
        .filter(
          (product) =>
            product.category === category
        )
        .reduce(
          (total, product) =>
            total +
            Number(product.stock || 0),
          0
        );

      return {
        category,
        stock
      };

    }
  );


  const maxCategoryStock = Math.max(
    ...categoryData.map(
      (item) => item.stock
    ),
    1
  );


  /* =========================
     RECENT PRODUCTS
  ========================= */

  const recentProducts = [...products]
    .sort(
      (a, b) =>
        Number(b.id) - Number(a.id)
    )
    .slice(0, 5);


  return (

    <div className="dashboard-page">

      {/* ================= SIDEBAR ================= */}

      <aside className="dashboard-sidebar">

        <div className="dashboard-brand">

          <div className="dashboard-brand-mark">
            A
          </div>

          <span>
            AURELIA
          </span>

        </div>


        <div className="sidebar-section-title">
          WORKSPACE
        </div>


        <nav className="sidebar-navigation">

          <Link
            to="/dashboard"
            className="sidebar-link active"
          >
            <span>◈</span>
            Dashboard
          </Link>


          <Link
            to="/products"
            className="sidebar-link"
          >
            <Inventory2Icon />
            Products
          </Link>


          <Link
            to="/categories"
            className="sidebar-link"
          >
            <CategoryIcon />
            Categories
          </Link>


          <div className="sidebar-section-title second">
            SYSTEM
          </div>


          <Link
            to="/about"
            className="sidebar-link"
          >
            <span>○</span>
            About
          </Link>


          <Link
            to="/contact"
            className="sidebar-link"
          >
            <span>□</span>
            Contact
          </Link>

        </nav>


        <div className="sidebar-bottom">

          <div className="sidebar-user">

            <div className="user-avatar">
              A
            </div>

            <div>

              <strong>
                Workspace
              </strong>

              <small>
                Product Management
              </small>

            </div>

          </div>


          <Link
            to="/login"
            className="logout-link"
          >
            Log out
          </Link>

        </div>

      </aside>


      {/* ================= MAIN ================= */}

      <main className="dashboard-main">


        {/* ================= HEADER ================= */}

        <header className="dashboard-header">

          <div>

            <div className="dashboard-date">

              {dayName.toUpperCase()}
              {" / "}
              {monthName.toUpperCase()}
              {" "}
              {year}

            </div>


            <h1>

              {greeting},
              {" "}
              <span>Shangeetha</span>
              {" "}
              ✦

            </h1>


            <p>
              Here's what's happening with your
              product inventory today.
            </p>

          </div>


          <div className="header-status">

            <span className="online-dot">
              ●
            </span>

            SYSTEM ONLINE

          </div>

        </header>


        {/* ================= STATISTICS ================= */}

        <section className="stats-grid">


          {/* TOTAL PRODUCTS */}

          <div className="stat-card">

            <div className="stat-top">

              <div className="stat-icon">
                <Inventory2Icon />
              </div>

              <span className="stat-label">
                TOTAL PRODUCTS
              </span>

            </div>


            <div className="stat-number">
              {totalProducts}
            </div>


            <div className="stat-footer">

              <TrendingUpIcon />

              <span>
                Current catalog
              </span>

            </div>

          </div>


          {/* INVENTORY VALUE */}

          <div className="stat-card">

            <div className="stat-top">

              <div className="stat-icon orange">
                <CurrencyRupeeIcon />
              </div>

              <span className="stat-label">
                INVENTORY VALUE
              </span>

            </div>


            <div className="stat-number">

              {formatCurrency(
                inventoryValue
              )}

            </div>


            <div className="stat-footer">

              <CurrencyRupeeIcon />

              <span>
                Price × stock
              </span>

            </div>

          </div>


          {/* LOW STOCK */}

          <div className="stat-card warning-card">

            <div className="stat-top">

              <div className="stat-icon warning">
                <WarningAmberIcon />
              </div>

              <span className="stat-label">
                LOW STOCK
              </span>

            </div>


            <div className="stat-number">
              {lowStock}
            </div>


            <div className="stat-footer warning-text">

              {lowStock === 0
                ? "All products stocked"
                : "Needs attention"}

            </div>

          </div>


          {/* CATEGORIES */}

          <div className="stat-card">

            <div className="stat-top">

              <div className="stat-icon green">
                <CategoryIcon />
              </div>

              <span className="stat-label">
                CATEGORIES
              </span>

            </div>


            <div className="stat-number">
              {String(totalCategories).padStart(2, "0")}
            </div>


            <div className="stat-footer">
              Active categories
            </div>

          </div>

        </section>


        {/* ================= CONTENT GRID ================= */}

        <section className="dashboard-content">


          {/* INVENTORY OVERVIEW */}

          <div className="overview-card">

            <div className="section-heading">

              <div>

                <span>
                  INVENTORY OVERVIEW
                </span>

                <h2>
                  Stock distribution
                </h2>

              </div>

            </div>


            {categoryData.length > 0 ? (

              <div className="inventory-chart">

                <div className="chart-y">

                  <span>
                    {maxCategoryStock}
                  </span>

                  <span>
                    {Math.round(
                      maxCategoryStock * 0.75
                    )}
                  </span>

                  <span>
                    {Math.round(
                      maxCategoryStock * 0.5
                    )}
                  </span>

                  <span>
                    {Math.round(
                      maxCategoryStock * 0.25
                    )}
                  </span>

                  <span>
                    0
                  </span>

                </div>


                <div className="chart-area">

                  <div className="chart-line line-one"></div>

                  <div className="chart-line line-two"></div>

                  <div className="chart-line line-three"></div>


                  <div className="chart-bars">

                    {categoryData.map(
                      (item) => (

                        <div
                          className={
                            item.stock ===
                            maxCategoryStock
                              ? "bar current"
                              : "bar"
                          }
                          style={{
                            height: `${Math.max(
                              (item.stock /
                                maxCategoryStock) *
                                100,
                              5
                            )}%`
                          }}
                          key={item.category}
                        >

                          <span>
                            {item.category}
                          </span>

                        </div>

                      )
                    )}

                  </div>

                </div>

              </div>

            ) : (

              <div className="dashboard-empty">

                <Inventory2Icon />

                <strong>
                  No products yet
                </strong>

                <span>
                  Add products to see your
                  inventory distribution.
                </span>

              </div>

            )}


            <div className="chart-summary">

              <div>

                <span>
                  CURRENT STOCK
                </span>

                <strong>
                  {totalStock.toLocaleString("en-IN")} units
                </strong>

              </div>


              <div>

                <span>
                  INVENTORY VALUE
                </span>

                <strong className="growth">
                  {formatCurrency(
                    inventoryValue
                  )}
                </strong>

              </div>

            </div>

          </div>


          {/* QUICK ACTION */}

          <div className="quick-card">

            <div className="quick-number">
              02
            </div>

            <span>
              QUICK ACTION
            </span>

            <h2>

              Add a new
              <br />
              <em>product.</em>

            </h2>

            <p>
              Expand your catalog and keep
              your inventory up to date.
            </p>


            <Link
              to="/products"
              className="quick-button"
            >

              <AddIcon />

              Add Product

            </Link>

          </div>

        </section>


        {/* ================= RECENT PRODUCTS ================= */}

        <section className="recent-section">


          <div className="recent-heading">

            <div>

              <span>
                RECENT ACTIVITY
              </span>

              <h2>
                Recently added products
              </h2>

            </div>


            <Link to="/products">

              View all

              <ArrowForwardIcon />

            </Link>

          </div>


          <div className="product-table">


            <div className="table-header">

              <span>
                PRODUCT
              </span>

              <span>
                CATEGORY
              </span>

              <span>
                PRICE
              </span>

              <span>
                STOCK
              </span>

              <span>
                STATUS
              </span>

              <span></span>

            </div>


            {recentProducts.map(
              (product) => (

                <div
                  className="product-row"
                  key={product.id}
                >


                  <div className="product-name-cell">

                    <div className="product-symbol">

                      {product.name
                        ?.substring(0, 2)
                        .toUpperCase()}

                    </div>


                    <div>

                      <strong>
                        {product.name}
                      </strong>

                      <small>
                        Product #{product.id}
                      </small>

                    </div>

                  </div>


                  <span className="category-cell">

                    {product.category}

                  </span>


                  <strong className="price-cell">

                    ₹
                    {Number(
                      product.price || 0
                    ).toLocaleString("en-IN")}

                  </strong>


                  <span className="stock-cell">

                    {product.stock} units

                  </span>


                  <span
                    className={
                      Number(product.stock) <= 10
                        ? "status low"
                        : "status available"
                    }
                  >

                    ●{" "}

                    {Number(product.stock) <= 10
                      ? "Low Stock"
                      : "In Stock"}

                  </span>


                  <button
                    className="more-button"
                    onClick={() => {
                      window.location.href =
                        "/products";
                    }}
                  >

                    <MoreHorizIcon />

                  </button>


                </div>

              )
            )}


            {products.length === 0 && (

              <div className="dashboard-empty">

                <Inventory2Icon />

                <strong>
                  No products found
                </strong>

                <span>
                  Add your first product from
                  the Products page.
                </span>

              </div>

            )}

          </div>

        </section>


      </main>

    </div>

  );

}

export default Dashboard;