import React, { useState, useEffect } from "react";
import styles from "../styles/AboutUs.module.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const AboutUs = () => {
  const [isBlurred, setIsBlurred] = useState(false);
  const [navbarColor, setNavbarColor] = useState("transparent");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavbarColor("white");
        setIsBlurred("true");
      } else {
        setNavbarColor("transparent");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className={styles.aboutUs}>
        <div className={styles.navbarDiv} style={{ backgroundColor: navbarColor }}>
          <Navbar colorUpdated="black" isBlurred={isBlurred} />
        </div>
        <header className={styles.aboutUsHeader}>
          <h1>Welcome to TravelBliss</h1>
          <p>Your adventure awaits!</p>
        </header>

        <section className={styles.companyInfo}>
          <h2>Who We Are</h2>
          <p>
            At TravelBliss, we are passionate travelers who believe in the transformative power of exploration. Founded by a group of travel enthusiasts, our mission is to create unforgettable experiences that connect people to the world around them. With years of expertise and a commitment to quality, we offer a wide range of tours designed for every type of traveler.
          </p>
        </section>

        <section className={styles.companyInfo}>
          <h2>Our Mission</h2>
          <p>
            Our mission is to inspire and empower travelers to discover extraordinary destinations while providing personalized service and expert guidance. We believe that every journey should be enriching and stress-free, whether you're seeking adventure, relaxation, or cultural immersion.
          </p>
        </section>

        <section className={styles.companyInfo}>
          <h2>Our Values</h2>
          <ul>
            <li>
              <strong>Customer-Centric Approach: </strong> We prioritize our clients' needs, crafting experiences that resonate with their travel aspirations.
            </li>
            <li>
              <strong>Integrity: </strong> Honesty and transparency guide our actions. We stand by our commitments and deliver exceptional service.
            </li>
            <li>
              <strong>Innovation: </strong> We constantly seek new ways to enhance the travel experience, blending creativity with modern technology.
            </li>
            <li>
              <strong>Sustainability: </strong> We are dedicated to promoting responsible tourism that respects local cultures and preserves the environment.
            </li>
          </ul>
        </section>

        <section className={styles.companyInfo}>
          <h2>Why Choose TravelBliss?</h2>
          <p>
            With a wealth of experience in the travel industry, our expert team is here to guide you every step of the way. From tailored itineraries to insider tips, we ensure that your journey is seamless and memorable. Our strong partnerships with local guides and providers allow us to offer unique experiences that you won't find anywhere else.
          </p>
          <p>
            Whether you're traveling solo, with family, or as part of a group, TravelBliss is your trusted partner in discovering the world. Let us take care of the details while you focus on making memories that last a lifetime.
          </p>
        </section>

        <section className={styles.companyInfo}>
          <h2>What Our Travelers Say</h2>
          <blockquote>
            <p>
              "TravelBliss transformed our vacation into an unforgettable adventure! Their attention to detail and local knowledge made all the difference." - Sarah L.
            </p>
          </blockquote>
          <blockquote>
            <p>
              "From start to finish, the team at TravelBliss provided exceptional service. I can't wait to book my next trip with them!" - James T.
            </p>
          </blockquote>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
