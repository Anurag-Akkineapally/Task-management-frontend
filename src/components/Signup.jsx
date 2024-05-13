// components/Signup.js
import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import "./Signup.css";
import { message } from "antd";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signedUp, setSignedUp] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await fetch("http://localhost:5179/User/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      // Check if response is successful (status 200)
      if (response.ok) {
        setSignedUp(true);
        message.info(
          "Hurrah!Signup is successfull and your account is created"
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

  return (
    <div className="signup-page">
      <div className="signup-container">
        <form onSubmit={handleSignup}>
          <h2>Sign Up</h2>
          <div className="input-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
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
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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
