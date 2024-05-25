import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import "./Signup.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { message } from "antd";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [signedUp, setSignedUp] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5179/User/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSignedUp(true);
        message.info(
          "Hurrah! Signup is successful and your account is created"
        );
      } else if (response.status === 409) {
        setError("User already exists");
      } else {
        setError("Sign up failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while processing the request.");
    }
  };

  if (signedUp) {
    setTimeout(() => {
      window.location.reload();
    }, 1);
    return <Redirect to="/" />;
  }

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Sign Up</h2>
          <div className="input-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <p className="error-message">{errors.username.message}</p>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="error-message">{errors.password.message}</p>
              )}
              {showPassword ? (
                <FaEyeSlash
                  className="toggle-password-icon"
                  onClick={handleTogglePasswordVisibility}
                />
              ) : (
                <FaEye
                  className="toggle-password-icon"
                  onClick={handleTogglePasswordVisibility}
                />
              )}
            </div>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="signup-button">
            Sign Up
          </button>
          <p className="login-link">
            Already have an account?{" "}
            <span className="login-link">
              <a href="/" style={{ color: "blue" }}>
                Login
              </a>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
