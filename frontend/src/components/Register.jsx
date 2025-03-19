import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Register.module.css";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate(); // Updated navigation hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/register/", {
        username,
        password,
      });
      alert(response.data.message);

      if (response.data.redirect) {
        navigate(response.data.redirect); // Replaced history.push with navigate
        window.location.reload();
      }
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage = error.response?.data?.error || "An error occurred";
      alert(errorMessage);
    }
  };

  return (
    <div className={styles.registerPage}>
      <Helmet>
        <title>Start Your Journey with Us: Register Now</title>
      </Helmet>
      <div className={styles.registerContainer}>
        {/* Left Section - Register Form */}
        <div className={styles.formContainer}>
          <div className={styles.logoContainer}>
            <span className={styles.fontStyle}>
              TravelBliss
              <i className="fa-solid fa-plane" style={{ margin: "0 8px" }}></i>
            </span>
          </div>
          <form onSubmit={handleSubmit} className={styles.registerForm}>
            <p className={styles.registerSlogan}>
              Join TravelBliss and Explore the World!
            </p>
            <h5 className={styles.registerHeading}>
              Create an account to start your adventure!
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
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
              className={styles.inputField}
            />
            <button type="submit" className={styles.registerButton}>
              Continue
            </button>
            <Link to="/login" className={styles.registerLink}>
              Already Have An Account? Login Now!
            </Link>
          </form>
        </div>

        {/* Right Section - Image */}
        <div className={styles.imageContainer}>
          <img
            src="/static/image/login.jpg"
            alt="Travel"
            className={styles.image}
          />
          <p className={styles.imageText}>
            Your next adventure awaits. Sign up now and explore!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
