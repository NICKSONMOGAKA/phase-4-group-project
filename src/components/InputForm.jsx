import React, { useState } from "react";

const InputForm = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:5500/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        fetch("http://127.0.0.1:5500/products", { 
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data), 
          })
            .then((backendResponse) => backendResponse.json())
            .then((backendData) => {
              console.log("Data successfully sent to backend:", backendData);
              alert("You have purchased this item");
              setSuccessMessage("Purchase successful! Thank you for shopping with us.");
              setFormData({
                fullName: "",
                email: "",
                password: "",
              });
            })
        })
        
    };
        
     
  return (
    <div className="form-box">
      <form className="form" onSubmit={handleSubmit}>
        <span className="title">Purchase</span>
        <span className="subtitle">
          Enter your account details to confirm purchase.
        </span>
        <div className="form-container">
          <input
            type="text"
            name="fullName"
            className="input"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            className="input"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Cash out</button>
      </form>

      {successMessage && (
        <div className="success-message">
          <p>{successMessage}</p>
        </div>
      )}
    </div>
  );
};

export default InputForm;
