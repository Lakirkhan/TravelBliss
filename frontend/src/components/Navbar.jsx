import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { username } = useParams();
  const [decodedUsername, setDecodedUsername] = useState("");

  const navbarBrandStyle = {
    backgroundColor: "white",
    position: "absolute",
    background: `linear-gradient(to right, #ff6b08, #06ae06, black, black, black)`,
    WebkitTextFillColor: "transparent",
    WebkitBackgroundClip: "text",
  };

  useEffect(() => {
    if (username) {
      try {
        const cleanedString = username.replace(/^b'|'+$/g, "");
        const decoded = atob(cleanedString);
        setDecodedUsername(decoded);
        setUser(decoded); // Assume the decoded username indicates logged-in status
      } catch (error) {
        console.error("Error decoding username:", error);
      }
    }
  }, [username]);

  const handleLogout = () => {
    setUser(null); // Clear user state
    navigate("/"); // Navigate to the login page
    window.location.reload();
  };

  const handleProfile = () => {
    navigate(`/profile/${username}`);
  };

  const handleGuestRedirect = () => {
    if (username === "Z3Vlc3Q=") {
      navigate("/register");
    }
  };

  return (
    <nav
      className={`navbar fixed-top navbar-expand-md ${styles.navbar} ${styles.fontStyle}`}
    >
      <div className="container-fluid">
        <Link className={`navbar-brand ${styles.navbarBrand}`} to="/">
          TravelBliss{" "}
          {/* <i className="fa-solid fa-plane" style={{ margin: "0 8px" }}></i> */}
          <img
            src="/static/image/backgrounds/pic.jpeg"
            width="70px"
            height="70px"
            alt=""
          />
        </Link>
        <button
          className={`navbar-toggler ${styles.togglerBtn}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse justify-content-end navbar-collapse ${styles.togglerDiv}`}
          id="navbarNav"
        >
          <ul className={`navbar-nav ${styles.navList}`}>
            <li className={`nav-item ${styles.navItem}`}>
              <Link
                className={`nav-link ${styles.navLink}`}
                to={`/home/${username}`}
              >
                Home
              </Link>
            </li>
            <li className={`nav-item ${styles.navItem}`}>
              <Link
                className={`nav-link ${styles.navLink}`}
                to={`/packages/${username}`}
              >
                All Packages
              </Link>
            </li>
            <li className={`nav-item ${styles.navItem}`}>
              <span
                className={`nav-link ${styles.navLink}`}
                onClick={() => {
                  if (username === "Z3Vlc3Q=") {
                    handleGuestRedirect();
                  } else {
                    navigate(`/wishlist/${username}`);
                  }
                }}
              >
                Wishlist
              </span>
            </li>
            <li className={`nav-item ${styles.navItem}`}>
              <span
                className={`nav-link ${styles.navLink}`}
                onClick={() => {
                  if (username === "Z3Vlc3Q=") {
                    handleGuestRedirect();
                  } else {
                    navigate(`/mybookings/${username}`);
                  }
                }}
              >
                Bookings
              </span>
            </li>
            <li className={`nav-item ${styles.navItem}`}>
              <Link
                className={`nav-link ${styles.navLink}`}
                to={`/aboutus/${username}`}
              >
                About Us
              </Link>
            </li>
            <li className={`nav-item ${styles.navItem}`}>
              <Link
                className={`nav-link ${styles.navLink}`}
                to={`/contactus/${username}`}
              >
                Contact Us
              </Link>
            </li>
            <li
              className={`nav-item ${styles.navItem} nav-link ${styles.navLink}`}
              onClick={handleProfile}
            >
              View Profile
            </li>
            {user && username !== "Z3Vlc3Q=" ? (
              <li className={`nav-item ${styles.navItem}`}>
                <span
                  className={`nav-link ${styles.navLink}`}
                  onClick={handleLogout}
                >
                  Logout
                </span>
              </li>
            ) : (
              <li className={`nav-item ${styles.navItem}`}>
                <Link className={`nav-link ${styles.navLink}`} to="/login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
