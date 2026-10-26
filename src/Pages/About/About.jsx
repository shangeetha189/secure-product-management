import React from "react";

import "./About.css";

function About() {

  const features = [
    {
      icon: "▣",
      number: "01",
      title: "Product Management",
      text: "Create, update and remove products while keeping your inventory organized."
    },
    {
      icon: "◈",
      number: "02",
      title: "Inventory Insights",
      text: "Understand your stock levels and inventory value through a clear dashboard."
    },
    {
      icon: "◇",
      number: "03",
      title: "Secure Access",
      text: "User authentication keeps the product workspace accessible only to registered users."
    },
    {
      icon: "↗",
      number: "04",
      title: "Simple Workflow",
      text: "A focused interface makes everyday product and inventory management easier."
    }
  ];

  return (

    <div className="about-page">

      {/* ================= HERO ================= */}

      <section className="about-hero">

        <div className="about-hero-left">

          <span className="about-eyebrow">
            AURELIA / ABOUT
          </span>

          <h1>
            Built for
            <br />
            <em>better inventory.</em>
          </h1>

          <p>
            AURELIA is a secure product management
            workspace designed to make inventory
            management simple, organized and clear.
          </p>

        </div>


        <div className="about-hero-card">

          <div className="about-card-number">
            01
          </div>

          <div className="about-big-mark">
            A
          </div>

          <span>
            PRODUCT INTELLIGENCE
          </span>

          <strong>
            Secure.
            <br />
            Simple.
            <br />
            Scalable.
          </strong>

        </div>

      </section>


      {/* ================= INTRO ================= */}

      <section className="about-intro">

        <div className="about-intro-label">

          <span>
            01
          </span>

          <p>
            OUR PURPOSE
          </p>

        </div>


        <div className="about-intro-content">

          <h2>
            Everything you need to
            <br />
            <em>manage your products.</em>
          </h2>

          <p>
            AURELIA brings product management and
            inventory visibility together in one
            workspace. Users can securely access
            their account, manage products and
            monitor important inventory information
            through a clean and structured interface.
          </p>

          <p>
            The system is designed around a simple
            idea: inventory management should be
            efficient without becoming complicated.
          </p>

        </div>

      </section>


      {/* ================= FEATURES ================= */}

      <section className="about-features">

        <div className="about-section-heading">

          <span>
            02 / CAPABILITIES
          </span>

          <h2>
            What AURELIA
            <br />
            <em>helps you do.</em>
          </h2>

        </div>


        <div className="features-grid">

          {features.map((feature) => (

            <div
              className="feature-card"
              key={feature.number}
            >

              <div className="feature-top">

                <span className="feature-number">
                  {feature.number}
                </span>

                <div className="feature-icon">
                  {feature.icon}
                </div>

              </div>


              <div className="feature-content">

                <h3>
                  {feature.title}
                </h3>

                <p>
                  {feature.text}
                </p>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* ================= WORKFLOW ================= */}

      <section className="about-workflow">

        <div className="workflow-heading">

          <span>
            03 / WORKFLOW
          </span>

          <h2>
            One workspace.
            <br />
            <em>One clear process.</em>
          </h2>

        </div>


        <div className="workflow-steps">


          <div className="workflow-step">

            <div className="workflow-icon">
              01
            </div>

            <div>

              <strong>
                Sign in
              </strong>

              <p>
                Access the workspace using
                your registered account.
              </p>

            </div>

          </div>


          <div className="workflow-line"></div>


          <div className="workflow-step">

            <div className="workflow-icon">
              02
            </div>

            <div>

              <strong>
                Manage
              </strong>

              <p>
                Add, edit and remove products
                from your inventory.
              </p>

            </div>

          </div>


          <div className="workflow-line"></div>


          <div className="workflow-step">

            <div className="workflow-icon">
              03
            </div>

            <div>

              <strong>
                Monitor
              </strong>

              <p>
                View stock levels and inventory
                information from the dashboard.
              </p>

            </div>

          </div>


        </div>

      </section>


      {/* ================= SECURITY ================= */}

      <section className="about-security">

        <div className="security-icon">
          ◇
        </div>


        <div className="security-content">

          <span>
            SECURITY / ACCESS CONTROL
          </span>

          <h2>
            Your workspace,
            <br />
            protected.
          </h2>

          <p>
            AURELIA uses secure user authentication
            to control access to the product
            management workspace.
          </p>

        </div>


        <div className="security-points">

          <div>

            <span className="security-check">
              ✓
            </span>

            <span>
              Registered users
            </span>

          </div>


          <div>

            <span className="security-check">
              ✓
            </span>

            <span>
              Password protection
            </span>

          </div>


          <div>

            <span className="security-check">
              ✓
            </span>

            <span>
              Secure authentication
            </span>

          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="about-footer">

        <span>
          AURELIA PRODUCT INTELLIGENCE
        </span>

        <span>
          SECURE / SIMPLE / SCALABLE
        </span>

      </footer>

    </div>

  );
}

export default About;