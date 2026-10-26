import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Contact.css";

function Contact() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!name || !email || !subject || !message) {
      alert("Please fill all the fields");
      return;
    }

    setSubmitted(true);

    setName("");
    setEmail("");
    setSubject("");
    setMessage("");

  };

  return (

    <div className="contact-page">

      {/* ================= HEADER ================= */}

      <section className="contact-hero">

        <div className="contact-hero-content">

          <span className="contact-eyebrow">
            AURELIA / CONTACT
          </span>

          <h1>
            Let's talk about
            <br />
            <em>your workspace.</em>
          </h1>

          <p>
            Have a question, suggestion or feedback?
            Send us a message and we'll be happy to
            hear from you.
          </p>

        </div>


        <div className="contact-hero-mark">

          <span>
            04
          </span>

          <strong>
            A
          </strong>

        </div>

      </section>


      {/* ================= MAIN CONTENT ================= */}

      <section className="contact-content">


        {/* ================= CONTACT INFO ================= */}

        <div className="contact-info">

          <span className="contact-section-label">
            GET IN TOUCH
          </span>

          <h2>
            We'd love to
            <br />
            <em>hear from you.</em>
          </h2>

          <p className="contact-description">
            Whether you have a question about the
            product management system or simply want
            to share your feedback, you can reach us
            through the information below.
          </p>


          <div className="contact-details">


            <div className="contact-detail">

              <div className="detail-number">
                01
              </div>

              <div>

                <span>
                  EMAIL
                </span>

                <strong>
                  aurelia.workspace@gmail.com
                </strong>

              </div>

            </div>


            <div className="contact-detail">

              <div className="detail-number">
                02
              </div>

              <div>

                <span>
                  SUPPORT
                </span>

                <strong>
                  Product Management Team
                </strong>

              </div>

            </div>


            <div className="contact-detail">

              <div className="detail-number">
                03
              </div>

              <div>

                <span>
                  AVAILABILITY
                </span>

                <strong>
                  Monday — Friday
                </strong>

              </div>

            </div>


          </div>


          <div className="contact-note">

            <span>
              AURELIA
            </span>

            <p>
              SECURE / SIMPLE / SCALABLE
            </p>

          </div>

        </div>


        {/* ================= CONTACT FORM ================= */}

        <div className="contact-form-card">

          <div className="form-card-top">

            <span>
              SEND A MESSAGE
            </span>

            <span>
              01 / 04
            </span>

          </div>


          {submitted ? (

            <div className="contact-success">

              <div className="success-mark">
                ✓
              </div>

              <span>
                MESSAGE SENT
              </span>

              <h2>
                Thank you
                <br />
                <em>for reaching out.</em>
              </h2>

              <p>
                Your message has been received
                successfully.
              </p>

              <button
                onClick={() => setSubmitted(false)}
                className="send-another"
              >
                Send another message
              </button>

            </div>

          ) : (

            <form
              className="contact-form"
              onSubmit={handleSubmit}
            >


              {/* NAME */}

              <div className="contact-field">

                <label>
                  YOUR NAME
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />

              </div>


              {/* EMAIL */}

              <div className="contact-field">

                <label>
                  EMAIL ADDRESS
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />

              </div>


              {/* SUBJECT */}

              <div className="contact-field">

                <label>
                  SUBJECT
                </label>

                <input
                  type="text"
                  placeholder="What would you like to discuss?"
                  value={subject}
                  onChange={(e) =>
                    setSubject(e.target.value)
                  }
                />

              </div>


              {/* MESSAGE */}

              <div className="contact-field">

                <label>
                  MESSAGE
                </label>

                <textarea
                  placeholder="Write your message here..."
                  rows="5"
                  value={message}
                  onChange={(e) =>
                    setMessage(e.target.value)
                  }
                />

              </div>


              {/* SUBMIT */}

              <button
                type="submit"
                className="contact-submit"
              >

                <span>
                  Send Message
                </span>

                <span className="submit-arrow">
                  →
                </span>

              </button>


              <p className="form-security">
                Your information is kept private and
                used only for responding to your message.
              </p>

            </form>

          )}

        </div>

      </section>


      {/* ================= BOTTOM ================= */}

      <section className="contact-bottom">

        <div>

          <span>
            HAVE A QUESTION?
          </span>

          <h2>
            We're here
            <br />
            <em>to help.</em>
          </h2>

        </div>


        <Link
          to="/products"
          className="contact-products-link"
        >
          Explore Products
          <span>→</span>
        </Link>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="contact-footer">

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

export default Contact;