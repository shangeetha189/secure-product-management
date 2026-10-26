import React from "react";

import SmartphoneIcon from "@mui/icons-material/Smartphone";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import TabletMacIcon from "@mui/icons-material/TabletMac";
import WatchIcon from "@mui/icons-material/Watch";
import CableIcon from "@mui/icons-material/Cable";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import "./Categories.css";

function Categories() {

  const categories = [
    {
      number: "01",
      name: "Smartphones",
      description: "Mobile devices and smart communication technology.",
      count: "08",
      icon: <SmartphoneIcon />
    },
    {
      number: "02",
      name: "Laptops",
      description: "Portable computers for work, study and productivity.",
      count: "06",
      icon: <LaptopMacIcon />
    },
    {
      number: "03",
      name: "Audio",
      description: "Headphones, speakers and wireless audio devices.",
      count: "05",
      icon: <HeadphonesIcon />
    },
    {
      number: "04",
      name: "Tablets",
      description: "Lightweight touchscreen devices for everyday use.",
      count: "04",
      icon: <TabletMacIcon />
    },
    {
      number: "05",
      name: "Wearables",
      description: "Smart watches and wearable technology.",
      count: "03",
      icon: <WatchIcon />
    },
    {
      number: "06",
      name: "Accessories",
      description: "Essential accessories and connected devices.",
      count: "07",
      icon: <CableIcon />
    }
  ];

  return (

    <div className="categories-page">

      {/* HEADER */}

      <div className="categories-header">

        <div>

          <span className="categories-eyebrow">
            AURELIA / CATALOGUE
          </span>

          <h1>
            Product
            <br />
            <em>categories.</em>
          </h1>

          <p>
            Organize and explore your inventory
            through structured product categories.
          </p>

        </div>

        <div className="category-total">

          <span>
            TOTAL CATEGORIES
          </span>

          <strong>
            06
          </strong>

        </div>

      </div>


      {/* CATEGORY GRID */}

      <div className="categories-grid">

        {categories.map((category) => (

          <div
            className="category-card"
            key={category.number}
          >

            <div className="category-card-top">

              <span className="category-number">
                {category.number}
              </span>

              <div className="category-icon">
                {category.icon}
              </div>

            </div>


            <div className="category-card-content">

              <h2>
                {category.name}
              </h2>

              <p>
                {category.description}
              </p>

            </div>


            <div className="category-card-bottom">

              <div>

                <strong>
                  {category.count}
                </strong>

                <span>
                  PRODUCTS
                </span>

              </div>

              <button>
                <ArrowForwardIcon />
              </button>

            </div>

          </div>

        ))}

      </div>


      {/* BOTTOM INFORMATION */}

      <div className="categories-info">

        <div className="info-mark">
          A
        </div>

        <div className="info-text">

          <span>
            AURELIA / INVENTORY STRUCTURE
          </span>

          <p>
            Categories make it easier to organize,
            identify and manage products across
            your inventory workspace.
          </p>

        </div>

        <div className="info-status">

          <span className="info-dot"></span>

          SYSTEM ORGANIZED

        </div>

      </div>


      {/* FOOTER */}

      <div className="categories-footer">

        <span>
          AURELIA PRODUCT INTELLIGENCE
        </span>

        <span>
          SECURE / SIMPLE / SCALABLE
        </span>

      </div>

    </div>

  );
}

export default Categories;