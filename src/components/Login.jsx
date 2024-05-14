// components/Login.js
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import "./Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await fetch("http://localhost:5179/User/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Check if response is successful (status 200)
      if (response.ok) {
        const data = await response.json();
        const userId = data.userId;
        const userName = data.userName;
        const token = data.token;
        const email = data.userEmail;
        localStorage.setItem("userId", userId);
        localStorage.setItem("userName", userName);
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("userEmail", email);
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
    }, 0.00001); // Redirect after 1 second
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {/* Toggle password visibility button */}
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
