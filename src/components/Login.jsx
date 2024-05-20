// components/Login.js
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import "./Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5179/User/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        const { userId, userName, token, userEmail } = responseData;
        localStorage.setItem("userId", userId);
        localStorage.setItem("userName", userName);
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("userEmail", userEmail);
        setLoggedIn(true);
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      setError("An error occurred while processing the request.");
    }
  };

  if (loggedIn) {
    setTimeout(() => {
      window.location.reload();
    }, 0.000001);
    return <Redirect to="/tasklist" />;
  }

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignupRedirect = () => {
    setTimeout(() => {
      window.location.href = "/signup";
    }, 0.00001);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Login</h2>
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
          <button type="submit" className="login-button">
            Login
          </button>
          <p className="create-new-link">
            Don't have an account?{" "}
            <span className="signup-link">
              <a href="/signup" style={{ color: "blue" }}>
                Create new account
              </a>
            </span>
            .
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
