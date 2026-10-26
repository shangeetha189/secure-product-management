import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import "./Login.css";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {

    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all the fields");
      return;
    }

    try {

      const response = await fetch(
        "http://localhost:4000/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email,
            password: password
          })
        }
      );

      const data = await response.json();

      console.log("Login response:", data);

      // Wrong email / wrong password
      if (!response.ok) {

        alert(data.message);

        return;
      }

      // Save JWT token
      localStorage.setItem(
        "token",
        data.token
      );

      console.log("Login successful");
      console.log("Token stored successfully");

      // Go to dashboard only after successful login
      navigate("/dashboard");

    } catch (error) {

      console.log("Login error:", error);

      alert("Unable to connect to server");

    }

  };


  return (

    <div className="aurelia-login">

      {/* LEFT SIDE */}

      <section className="aurelia-showcase">

        <div className="aurelia-brand">

          <div className="brand-mark">
            A
          </div>

          <span>
            AURELIA
          </span>

        </div>


        <div className="showcase-content">

          <div className="eyebrow">
            PRODUCT INTELLIGENCE / 01
          </div>

          <h1>
            Your inventory,
            <br />
            <em>beautifully</em>
            <br />
            organized.
          </h1>

          <p>
            A secure workspace for teams to manage
            products, monitor stock and keep their
            inventory under control.
          </p>

        </div>


        {/* FLOATING PRODUCT CARD */}

        <div className="floating-product">

          <div className="product-number">
            01
          </div>

          <div className="product-visual">
            <span>⌁</span>
          </div>

          <div className="product-info">

            <small>
              FEATURED PRODUCT
            </small>

            <h3>
              Smart Device
            </h3>

            <div className="product-bottom">

              <strong>
                ₹42,999
              </strong>

              <span className="stock">
                ● IN STOCK
              </span>

            </div>

          </div>

        </div>


        <div className="showcase-footer">

          <span>
            SECURE / SIMPLE / SCALABLE
          </span>

          <span>
            2026
          </span>

        </div>

      </section>


      {/* RIGHT SIDE */}

      <section className="aurelia-form-section">

        <div className="form-container">

          <div className="form-top">

            <span>
              SECURE ACCESS
            </span>

            <div className="status-dot">
              ● SYSTEM ONLINE
            </div>

          </div>


          <div className="form-heading">

            <h2>
              Welcome
              <br />
              <span>back.</span>
            </h2>

            <p>
              Sign in to continue managing
              your product workspace.
            </p>

          </div>


          <form onSubmit={handleLogin}>

            {/* EMAIL */}

            <div className="field">

              <label>
                EMAIL ADDRESS
              </label>

              <div className="aurelia-input">

                <EmailIcon />

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div className="field">

              <label>
                PASSWORD
              </label>

              <div className="aurelia-input">

                <LockIcon />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />

                <button
                  type="button"
                  className="visibility"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >

                  {showPassword
                    ? <VisibilityOffIcon />
                    : <VisibilityIcon />
                  }

                </button>

              </div>

            </div>


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="aurelia-login-button"
            >

              <span>
                Enter Workspace
              </span>

              <ArrowForwardIcon />

            </button>

          </form>


          <div className="new-user">

            <span>
              New to Aurelia?
            </span>

            <Link to="/register">
              Create an account
            </Link>

          </div>


          <div className="security-note">

            <LockIcon />

            <span>
              Your account is protected with
              secure authentication.
            </span>

          </div>

        </div>

      </section>

    </div>

  );
}

export default Login;