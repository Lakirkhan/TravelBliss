import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Login.module.css";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/login/",
        {
          username,
          password,
        },
        {
          withCredentials: true, // Ensure credentials are sent with the request
        }
      );

      alert(response.data.message);

      if (response.data.success) {
        const user = response.data.user;

        if (user) {
          navigate(response.data.redirect || "/");
          window.location.reload();
        } else {
          console.error("User data is missing in the response");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = error.response?.data?.error || "An error occurred";
      alert(errorMessage);
    }
  };

  return (
    <div className={styles.loginPage}>
      <Helmet>
        <title>Reconnect with Your Travel Plans: Log In</title>
      </Helmet>
      <div className={styles.loginContainer}>
        {/* Left Section - Login Form */}
        <div className={styles.formContainer}>
          <div className={styles.logoContainer}>
            <span className={styles.fontStyle}>
              TravelBliss
              <i className="fa-solid fa-plane" style={{ margin: "0 8px" }}></i>
            </span>
          </div>
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            {/* New Slogan */}
            <p className={styles.loginSlogan}>
              Ready to explore the world? Let's make it happen!
            </p>
            <h5 className={styles.loginHeading}>
              Log in to continue your adventure!
            </h5>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className={styles.inputField}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className={styles.inputField}
            />
            <button type="submit" className={styles.loginButton}>
              Continue
            </button>
            <Link to="/register" className={styles.registerLink}>
              Don't have an account? Register now!
            </Link>
          </form>
        </div>

        {/* Right Section - Image */}
        <div className={styles.imageContainer}>
          <img src="/static/image/login.jpg" alt="Travel" className={styles.image} />
          <p className={styles.imageText}>
            Start your journey by one click, explore the beautiful world!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
