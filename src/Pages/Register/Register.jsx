import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import "./Register.css";

function Register() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {

    e.preventDefault();

    if (!username || !email || !password) {
      alert("Please fill all the fields");
      return;
    }

    try {

      const response = await fetch("http://localhost:4000/register", {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          username: username,
          email: email,
          password: password
        })
      });

      const data = await response.json();

      if (response.ok) {

        alert(data.message);

        navigate("/login");

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.error("Register error:", error);

      alert("Unable to connect to server");

    }
  };

  return (

    <div className="register-page">

      {/* LEFT SIDE */}

      <section className="register-form-section">

        <div className="register-container">

          <Link to="/login" className="back-link">
            <ArrowBackIcon />
            Back to login
          </Link>

          <div className="register-heading">

            <span className="register-label">
              CREATE YOUR WORKSPACE
            </span>

            <h1>
              Start
              <br />
              <span>managing.</span>
            </h1>

            <p>
              Create your secure account and get
              complete control over your product
              inventory.
            </p>

          </div>

          <form onSubmit={handleRegister}>

            {/* USERNAME */}

            <div className="register-field">

              <label>
                USERNAME
              </label>

              <div className="register-input">

                <PersonIcon />

                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value)
                  }
                />

              </div>

            </div>

            {/* EMAIL */}

            <div className="register-field">

              <label>
                EMAIL ADDRESS
              </label>

              <div className="register-input">

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

            <div className="register-field">

              <label>
                PASSWORD
              </label>

              <div className="register-input">

                <LockIcon />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />

                <button
                  type="button"
                  className="register-eye"
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

            <button
              type="submit"
              className="register-button"
            >

              <span>
                Create Workspace
              </span>

              <ArrowForwardIcon />

            </button>

          </form>

          <div className="already-account">

            <span>
              Already have an account?
            </span>

            <Link to="/login">
              Sign in
            </Link>

          </div>

          <div className="register-security">

            <div className="security-symbol">
              ✓
            </div>

            <div>

              <strong>
                Secure by design
              </strong>

              <p>
                Your password will be securely
                protected before being stored.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* RIGHT SIDE */}

      <section className="register-showcase">

        <div className="register-brand">

          <div className="register-brand-mark">
            A
          </div>

          <span>
            AURELIA
          </span>

        </div>

        <div className="register-visual">

          <div className="visual-small">
            PRODUCT / MANAGEMENT / SYSTEM
          </div>

          <div className="visual-number">
            24
          </div>

          <h2>
            Everything
            <br />
            <i>in one place.</i>
          </h2>

          <p>
            Organize your products.
            <br />
            Understand your inventory.
            <br />
            Work smarter.
          </p>

        </div>

        <div className="mini-cards">

          <div className="mini-card">

            <span>
              01
            </span>

            <strong>
              PRODUCTS
            </strong>

            <small>
              Manage your catalog
            </small>

          </div>

          <div className="mini-card active">

            <span>
              02
            </span>

            <strong>
              SECURITY
            </strong>

            <small>
              Protected access
            </small>

          </div>

          <div className="mini-card">

            <span>
              03
            </span>

            <strong>
              INSIGHTS
            </strong>

            <small>
              Monitor inventory
            </small>

          </div>

        </div>

        <div className="register-footer">

          <span>
            AURELIA PRODUCT SYSTEM
          </span>

          <span>
            EST. 2026
          </span>

        </div>

      </section>

    </div>
  );
}

export default Register;