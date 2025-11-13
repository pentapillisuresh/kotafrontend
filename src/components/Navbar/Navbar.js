import React, { useState,useEffect } from "react";
import { Search } from "lucide-react";
import { BiEnvelope, BiPhone } from "react-icons/bi";
import "./Navbar.css";
import { cardsData } from "../../components/products/data";
import { aboutData } from "../../components/about/AboutData";
import { ServicesData } from "../../components/services/ServicesData";
import { ResourcesData } from "../../components/resources/ResourcesData";
import { VentureData } from "../../components/ventures/VentureData";
import { Link } from "react-router-dom";
import ReceptionistLogin from "../../components/receptionist/ReceptionistLogin";
import VisitorForm from "../../components/receptionist/ReceptionistForm";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const filteredProducts = cardsData.filter(
    (product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      product.title !== "Quality Assurance"
  );

  const handleLogin = (credentials) => {
    // Add your authentication logic here
    console.log("Login credentials:", credentials);
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      {/* Top bar */}
      <div className="text-white py-2 background-small">
        <div className="container-fluid d-flex flex-column flex-md-row justify-content-between align-items-center text-center text-md-start top-navbar">
          {/* Registration Number */}
          <div className="mb-2 mb-md-0" style={{ fontSize: "20px", fontWeight: "bold" }}>
            Registration No: U70200AP2025PTC117652
          </div>

          {/* Scrolling Text */}
          <div className="scrolling-text">
            <p className="welcome">
              Welcome to Kota Management Services Private Limited—your trusted
              partner in innovative management consultancy. We specialize in
              empowering businesses with expert strategies, customized
              solutions, and operational excellence.
            </p>
          </div>

          {/* Contact Information */}
          <div className="d-flex flex-column flex-md-row gap-2 gap-md-4 mt-2 mt-md-0">
            <a
              href="mailto:kotamanagementservicespvtltd@gmail.com"
              className="text-white text-decoration-none d-flex align-items-center gap-1"
            >
              <BiEnvelope /> kotamanagementservicespvtltd@gmail.com
            </a>
            <a
              href="tel:+91 63054 49108"
              className="text-white text-decoration-none d-flex align-items-center gap-1"
            >
              <BiPhone /> +91 63054 49108
            </a>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          {/* Logo */}
          <div className="navbar-container">
            <a className="navbar-logo" href="/">
              <img
                src="/images/kotalogo.jpg"
                alt="Heerachand Logo"
                className="brand-logo"
              />
            </a>
            <div className="text-content">
              <h5 className="brand-name">Kota Management Services</h5>
              <p className="tagline">
                "Driving Success Through Strategic Solutions."
              </p>
            </div>
          </div>

          {/* Navbar Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto text-center text-lg-start">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/about"
                  id="aboutDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={(e) => e.preventDefault()}
                >
                  About Us
                </a>
                <ul className="dropdown-menu" aria-labelledby="aboutDropdown">
                  <li>
                    <Link className="dropdown-item" to="/about">
                      About Us Home
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="companyDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Ventures
                </a>
                <ul className="dropdown-menu">
                  {VentureData.map((item) => (
                    <li key={item.id}>
                      <Link className="dropdown-item" to={`/venture/${item.id}`}>
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="companyDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Services
                </a>
                <ul className="dropdown-menu">
                  {ServicesData.map((item) => (
                    <li key={item.id}>
                      <Link className="dropdown-item" to={`/service/${item.id}`}>
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="companyDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Industries
                </a>
                <ul className="dropdown-menu">
                  {ResourcesData.map((item) => (
                    <li key={item.id}>
                      <Link className="dropdown-item" to={`/resource/${item.id}`}>
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/contact">
                  Contact
                </a>
              </li>

              {/* Receptionist Dropdown */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="receptionistDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Receptionist
                </a>
                <ul className="dropdown-menu" aria-labelledby="receptionistDropdown">
                  <li>
                    <button 
                      className="dropdown-item" 
                      onClick={() => setShowLogin(true)}
                    >
                      Login
                    </button>
                  </li>
                </ul>
              </li>

              {/* Register Dropdown */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="registerDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Register
                </a>
                <ul className="dropdown-menu" aria-labelledby="registerDropdown">
                  <li>
                    <Link className="dropdown-item" to="/register/ngo">
                      NGO
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/register/applicant">
                      Applicant
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>

            {/* Search Input Field */}
            {searchOpen && (
              <div className="position-absolute top-50 start-50 translate-middle w-50">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <ul className="list-group position-absolute w-100 mt-2 bg-white shadow">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <li key={product.id} className="list-group-item">
                          <Link to={`/products/${product.id}`} className="text-dark">
                            {product.title}
                          </Link>
                        </li>
                      ))
                    ) : (
                      <li className="list-group-item text-muted">
                        No results found
                      </li>
                    )}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      {showLogin && (
        <ReceptionistLogin
          onLogin={handleLogin}
          onClose={() => setShowLogin(false)}
        />
      )}

      {/* Visitor Form (shown after login) */}
      {isLoggedIn && (
        <VisitorForm onLogout={handleLogout} />
      )}
    </>
  );
};

export default Navbar;