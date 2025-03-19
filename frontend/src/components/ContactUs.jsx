import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/ContactUs.module.css"; // Create a CSS module for styling
import Footer from "./Footer";
import Navbar from "./Navbar";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8000/api/contact/",
  //       formData
  //     );
  //     setStatus("Message sent successfully!");
  //     setFormData({
  //       name: "",
  //       email: "",
  //       subject: "",
  //       message: "",
  //     });
  //   } catch (error) {
  //     setStatus("Failed to send message.");
  //   }
  // };


const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("http://localhost:8000/api/contact/", formData);
        setStatus(response.data.message);
        setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
        });
    } catch (error) {
        setStatus("Failed to send message.");
    }
};


  return (
    <>
      <Navbar />
      <div className={`container ${styles.contactContainer}`}>
        <h2 className={styles.contactHeading}>Contact Us</h2>
        <div className="row">
          <div className="col-md-6">
            <h3>Contact Information</h3>
            <p><strong>Address:</strong> 1234 Travel Lane, Wanderlust City, India</p>
            <p><strong>Phone:</strong> +91 98765 43210</p>
            <p><strong>Email:</strong> contact@tourtopia.com</p>
            <p><strong>Working Hours:</strong> Mon - Fri, 9:00 AM - 6:00 PM</p>
          </div>
          <div className="col-md-6">
            <h3>Send Us a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  className="form-control"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  className="form-control"
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                Send Message
              </button>
            </form>
          </div>
        </div>
        {status && (
          <div className={`alert mt-3 ${status === "Message sent successfully!" ? "alert-success" : "alert-danger"}`}>
            {status}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
