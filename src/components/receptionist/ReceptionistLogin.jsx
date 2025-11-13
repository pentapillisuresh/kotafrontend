import React, { useState } from "react";
import "./ReceptionistLogin.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const ReceptionistLogin = ({ onLogin, onClose }) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Static credentials for receptionist
  const STATIC_CREDENTIALS = {
    email: "kota123@gmail.com",
    password: "kota123"
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validate credentials against static values
    if (credentials.email === STATIC_CREDENTIALS.email && 
        credentials.password === STATIC_CREDENTIALS.password) {
      
      setTimeout(() => {
        onLogin(credentials);
        setIsLoading(false);
        
        // ✅ Navigate to Receptionist Form after login
        navigate("/receptionist");
      }, 1000);
    } else {
      setTimeout(() => {
        setIsLoading(false);
        setError("Invalid email or password. Please try again.");
      }, 1000);
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError("");
  };

  // Close modal when clicking on overlay
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Auto-fill demo credentials for testing
  const fillDemoCredentials = () => {
    setCredentials({
      email: STATIC_CREDENTIALS.email,
      password: STATIC_CREDENTIALS.password
    });
  };

  return (
    <>
      <Navbar />
      <div className="login-modal-overlay" onClick={handleOverlayClick}>
        <div className="login-modal">
          <div className="login-header">
            <h3>Receptionist Login</h3>
            <button className="close-btn" onClick={onClose}>×</button>
          </div>
          
          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
            
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                disabled={isLoading}
              />
            </div>
            
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                disabled={isLoading}
              />
            </div>
            
            <button 
              type="submit" 
              className="login-btn"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
            
            {/* Demo credentials section */}
            {/* <div className="demo-credentials">
              <div className="demo-header">
                <span>Demo Credentials</span>
                <button 
                  type="button" 
                  className="fill-demo-btn"
                  onClick={fillDemoCredentials}
                  disabled={isLoading}
                >
                  Auto Fill
                </button>
              </div>
              <div className="credential-list">
                <div className="credential-item">
                  <strong>Email:</strong> {STATIC_CREDENTIALS.email}
                </div>
                <div className="credential-item">
                  <strong>Password:</strong> {STATIC_CREDENTIALS.password}
                </div>
              </div>
            </div> */}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ReceptionistLogin;