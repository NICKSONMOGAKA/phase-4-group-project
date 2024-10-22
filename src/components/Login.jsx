import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5500/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.access_token) {
          login(data.access_token);
          navigate("/products");
        } else {
          setErrorMessage("Invalid email or password");
        }
      })
      .catch(() => setErrorMessage("An error occurred. Please try again."));
  };

  return (
    <div className="form-box">
      <form className="form" onSubmit={handleSubmit}>
        <span className="title">Login</span>
        <span className="subtitle">
          Enter your account details to log in.
        </span>
        <div className="form-container">
          <input
            type="email"
            name="email"
            className="input"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default Login;
