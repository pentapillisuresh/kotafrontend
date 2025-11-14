import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import "./Receptionist.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const VisitorForm = ({ onLogout }) => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    fatherName: "",
    age: "",
    address: "",
    adharCardNumber: "",
    purpose: "",
    state: "",
    photo: null
  });

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [photoPreview, setPhotoPreview] = useState(null); // New state for preview
  const webcamRef = useRef(null);
  const API_URL = "https://kotamangementbackend.onrender.com/api/citizen";


  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const openCamera = () => {
    setCameraError("");
    setPhotoPreview(null); // Reset preview when opening camera
    setIsCameraOpen(true);
  };

  const closeCamera = () => {
    setIsCameraOpen(false);
    setCameraError("");
  };

  const capturePhoto = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        // Set the preview first
        setPhotoPreview(imageSrc);

        // Convert base64 to blob for file
        fetch(imageSrc)
          .then(res => res.blob())
          .then(blob => {
            const file = new File([blob], "visitor-photo.jpg", {
              type: "image/jpeg",
              lastModified: new Date().getTime()
            });
            setFormData(prev => ({
              ...prev,
              photo: file
            }));
          })
          .catch(err => {
            console.error("Error converting photo:", err);
            setCameraError("Error capturing photo");
          });
      }
    }
  }, [webcamRef]);

  const handleUserMediaError = (error) => {
    console.error("Webcam error:", error);
    setCameraError("Cannot access camera. Please check permissions or try file upload.");
  };

  const handleUserMedia = () => {
    setCameraError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.photo) {
      alert("Please capture or upload a visitor photo");
      return;
    }

    try {
      const submissionData = new FormData();

      Object.keys(formData).forEach((key) => {
        submissionData.append(key, formData[key]);
      });

      const response = await fetch(API_URL, {
        method: "POST",
        body: submissionData
      });

      const result = await response.json();

      if (result.success) {
        alert("Visitor registered successfully!");

        // Reset form
        setFormData({
          name: "",
          phoneNumber: "",
          fatherName: "",
          age: "",
          address: "",
          adharCardNumber: "",
          purpose: "",
          state: "",
          photo: null
        });
        setPhotoPreview(null);
      } else {
        alert(result.message || "Registration failed");
      }
    } catch (error) {
      console.error("Submit Error:", error);
      alert("Error submitting the form");
    }
  };


  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert("Please select an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Please select an image smaller than 5MB");
        return;
      }

      // Create preview for uploaded file
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target.result);
      };
      reader.readAsDataURL(file);

      setFormData(prev => ({
        ...prev,
        photo: file
      }));
    }
  };

  const removePhoto = () => {
    setFormData(prev => ({
      ...prev,
      photo: null
    }));
    setPhotoPreview(null);
  };

  const retakePhoto = () => {
    setPhotoPreview(null);
    setFormData(prev => ({
      ...prev,
      photo: null
    }));
  };

  return (
    <>
      <Navbar />
      <div className="visitor-form-container">
        <div className="form-header">
          <h2>Visitor Registration</h2>
          <button onClick={onLogout} className="logout-btn">Logout</button>
        </div>

        <form onSubmit={handleSubmit} className="visitor-form">
          <div className="form-row">
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter full name"
              />
            </div>

            <div className="form-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                pattern="[0-9]{10}"
                title="Please enter a 10-digit phone number"
                placeholder="Enter 10-digit phone number"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Father's Name *</label>
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                required
                placeholder="Enter father's name"
              />
            </div>

            <div className="form-group">
              <label>Age *</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                min="1"
                max="120"
                placeholder="Enter age"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Address *</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              required
              placeholder="Enter complete address"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Aadhar Card Number *</label>
              <input
                type="text"
                name="adharCardNumber"
                value={formData.adharCardNumber}
                onChange={handleChange}
                pattern="[0-9]{12}"
                title="12-digit Aadhar number"
                required
                placeholder="Enter 12-digit Aadhar number"
              />
            </div>

            <div className="form-group">
              <label>State *</label>
              <input
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />


            </div>
          </div>

          <div className="form-group">
            <label>Purpose of Visit *</label>
            <input
              type="text"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              required
              placeholder="Enter purpose of visit"
            />
          </div>


          <div className="form-group">
            <label>Visitor Photo *</label>
            <div className="photo-options">
              <button type="button" onClick={openCamera} className="camera-btn">
                📷 Take Photo
              </button>
              <span className="or-text">OR</span>
              <div className="file-upload-wrapper">
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="file-input"
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  onClick={() => document.getElementById('fileInput').click()}
                  className="upload-btn"
                >
                  📁 Upload Photo
                </button>
              </div>
            </div>

            {cameraError && (
              <div className="error-message">
                {cameraError}
              </div>
            )}

            {(formData.photo || photoPreview) && (
              <div className="photo-preview-container">
                <div className="photo-preview">
                  <div className="preview-image">
                    <img src={photoPreview} alt="Visitor preview" />
                  </div>
                  <div className="preview-info">
                    <p className="preview-text">✅ Photo ready!</p>
                    <p className="file-name">{formData.photo?.name || "visitor-photo.jpg"}</p>
                    <div className="preview-actions">
                      <button type="button" onClick={retakePhoto} className="retake-btn">
                        🔄 Retake
                      </button>
                      <button type="button" onClick={removePhoto} className="remove-btn">
                        🗑️ Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button type="submit" className="submit-btn">Register Visitor</button>
        </form>

        {isCameraOpen && (
          <div className="camera-modal">
            <div className="camera-container">
              <div className="camera-header">
                <h3>Take Visitor Photo</h3>
                <button onClick={closeCamera} className="close-camera-btn">×</button>
              </div>

              <div className="video-container">
                {!photoPreview ? (
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                    onUserMedia={handleUserMedia}
                    onUserMediaError={handleUserMediaError}
                    className="webcam-video"
                  />
                ) : (
                  <div className="captured-preview">
                    <img src={photoPreview} alt="Captured preview" />
                  </div>
                )}
              </div>

              {cameraError ? (
                <div className="camera-error">
                  <p>{cameraError}</p>
                  <button onClick={closeCamera} className="cancel-btn">
                    Close
                  </button>
                </div>
              ) : (
                <div className="camera-controls">
                  {!photoPreview ? (
                    <>
                      <button onClick={capturePhoto} className="capture-btn">
                        📸 Capture Photo
                      </button>
                      <button onClick={closeCamera} className="cancel-btn">
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={retakePhoto} className="retake-btn">
                        🔄 Retake Photo
                      </button>
                      <button onClick={closeCamera} className="confirm-btn">
                        ✅ Use This Photo
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default VisitorForm;