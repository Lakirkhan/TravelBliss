import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaGoogle,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-center text-white pt-4">
      {/* Grid container */}
      <div className="container p-4">
        {/* Company Info */}
        <div className="mb-4">
          <h5>About TravelBliss</h5>
          <p>
            At TravelBliss, we are dedicated to creating unforgettable travel experiences. Join us in exploring the world's most amazing destinations.
          </p>
        </div>

        {/* Contact Information */}
        <div className="mb-4">
          <h5>Contact Us</h5>
          <p>Email: info@TravelBliss.com</p>
          <p>Phone: (+91)7574812451</p>
          <p>Address:A-325 golden-9 flat near cg road Ahemdabad ,Gujrat</p>
        </div>

        {/* Section: Social media */}
        <section className="mb-4">
          {/* Facebook */}
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <FaFacebookF />
          </a>

          {/* Twitter */}
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <FaTwitter />
          </a>

          {/* Google */}
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <FaGoogle />
          </a>

          {/* Instagram */}
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <FaInstagram />
          </a>

          {/* Linkedin */}
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="https://www.linkedin.com/in/lakirkhan/"
            role="button"
          >
            <FaLinkedinIn />
          </a>

          {/* Github */}
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="https://github.com/Lakirkhan"
            role="button"
          >
            <FaGithub />
          </a>
        </section>
        {/* Section: Social media */}
      </div>
      {/* Grid container */}

      {/* Copyright */}
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © {new Date().getFullYear()} TravelBliss:
        <a className="text-white" href="https://mdbootstrap.com/">
          MDBootstrap.com
        </a>
      </div>
      {/* Copyright */}
    </footer>
  );
};

export default Footer;
