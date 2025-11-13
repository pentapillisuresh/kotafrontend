import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import axios from "axios";

const NGOForm = () => {
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);

  const [formData, setFormData] = useState({
    organizationName: "",
    registrationNumber: "",
    number80G: "",
    number12A: "",
    fcraNumber: "",
    fullName: "",
    fatherName: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    religion: "",
    languagesKnown: "",
    officeAddress: "",
    homeAddress: "",
    houseNo: "",
    streetName: "",
    apartmentName: "",
    village: "",
    mandalName: "",
    districtName: "",
    city: "",
    wardName: "",
    landmark: "",
    pincode: "",
    whatsappNumber: "",
    contactNumber: "",
    email: "",
    webId: "",
    state: "",
    parlimentConstituency: "",
  });

  const [files, setFiles] = useState({
    addressProof: null,
    idProof: null,
    selfiePhoto: null,
    ngoProfile: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

      if (!agreedToPolicy) {
    alert("Please agree to the Privacy Policy before submitting.");
    return;
  }

    for (let key in formData) {
      data.append(key, formData[key]);
    }

    for (let key in files) {
      if (files[key]) {
        data.append(key, files[key]);
      }
    }

    try {
      const res = await axios.post("https://kotamangementbackend.onrender.com/api/ngo/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
        // withCredentials: true
      });
      alert("NGO Registered Successfully!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Registration Failed!");
    }
  };

  return (



    <>
    <Navbar />
    <div className="container mt-4">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">NGO Registration Form</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* NGO Details */}
          <h5 className="mt-4">Organization Details</h5>
          <div className="row">
            {["state","parlimentConstituency","organizationName", "registrationNumber", "number80G", "number12A", "fcraNumber"].map((field) => (
              <div className="col-md-6 mb-3" key={field}>
                <label className="form-label">
                  {field.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase())}
                </label>
                <input
                  type="text"
                  className="form-control"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>

          {/* Personal Info */}
          <h5 className="mt-4">Personal Information</h5>
          <div className="row">
            {["fullName", "fatherName", "dob", "gender", "maritalStatus", "religion", "languagesKnown"].map((field) => (
              <div className="col-md-6 mb-3" key={field}>
                <label className="form-label">
                  {field === "dob" ? "Date of Birth" : field.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase())}
                </label>
                {field === "gender" ? (
                  <select
                    className="form-control"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <input
                    type={field === "dob" ? "date" : "text"}
                    className="form-control"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Address Info */}
          <h5 className="mt-4">Address Details</h5>
          <div className="row">
            {["officeAddress", "homeAddress", "houseNo", "streetName", "apartmentName", "village", "mandalName", "districtName", "city", "wardName", "landmark", "pincode"].map((field) => (
              <div className="col-md-6 mb-3" key={field}>
                <label className="form-label">
                  {field.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase())}
                </label>
                <input
                  type="text"
                  className="form-control"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>

          {/* Contact Info */}
          <h5 className="mt-4">Contact Information</h5>
          <div className="row">
            {["whatsappNumber", "contactNumber", "email", "webId"].map((field) => (
              <div className="col-md-6 mb-3" key={field}>
                <label className="form-label">
                  {field.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase())}
                </label>
                <input
                  type="text"
                  className="form-control"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>

          {/* File Uploads */}
          <h5 className="mt-4">Upload Documents</h5>
          <div className="row">
            {["addressProof", "idProof", "selfiePhoto", "ngoProfile"].map((file) => (
              <div className="col-md-6 mb-3" key={file}>
                <label className="form-label">
                  {file.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase())}
                </label>
                <input
                  type="file"
                  className="form-control"
                  name={file}
                  onChange={handleFileChange}
                />
              </div>
            ))}
          </div>

          <div className="form-check mt-3">
  <input
    className="form-check-input"
    type="checkbox"
    id="privacyPolicy"
    checked={agreedToPolicy}
    onChange={(e) => setAgreedToPolicy(e.target.checked)}
    required
  />
  <label className="form-check-label" htmlFor="privacyPolicy">
    I agree to the <strong>Privacy Policy</strong>: I understand that the information I submit may be used for verification and record purposes, and I accept that the organization is not responsible for any future misuse, data sharing, or legal implications arising from the data I provide.
  </label>
</div>


          <div className="text-center mt-4">
            <button type="submit" className="btn btn-primary px-5">Register NGO</button>
          </div>
        </form>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default NGOForm;
