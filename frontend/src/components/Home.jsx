import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import styles from "../styles/Home.module.css";
import axios from "axios";
import Footer from "./Footer";

const Home = () => {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();
  const { username } = useParams();

  useEffect(() => {
    const typedTextElement = document.querySelector(`.${styles.typedText}`);

    if (typedTextElement) {
      const texts = JSON.parse(typedTextElement.getAttribute("data-text"));

      let index = 0;
      let textIndex = 0;
      let currentText = "";
      let isDeleting = false;

      function type() {
        if (textIndex < texts.length) {
          if (!isDeleting && index <= texts[textIndex].length) {
            currentText = texts[textIndex].slice(0, index);
            index++;
          }

          if (isDeleting && index <= texts[textIndex].length) {
            currentText = texts[textIndex].slice(0, index);
            index--;
          }

          typedTextElement.textContent = currentText;

          if (!isDeleting && index === texts[textIndex].length) {
            isDeleting = true;
            setTimeout(type, 2000);
          } else if (isDeleting && index === 0) {
            isDeleting = false;
            textIndex++;
            setTimeout(type, 500);
          } else {
            setTimeout(type, isDeleting ? 50 : 100);
          }
        } else {
          textIndex = 0;
          type();
        }
      }
      type();
    }

    // Fetch package data from the backend
    axios
      .get("http://localhost:8000/api/packages_title/")
      .then((response) => {
        setPackages(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the package data!", error);
      });
  }, []);

  const handleTourClick = (state, type, name, image) => {
    console.log("packages page" + username);
    navigate({
      pathname: `/packages/${username}`,
      search: `?name=${name}`,
      state: { headerImage: `/static/image/Individual_Pages_Banners/${image}` },
    });
  };

  return (
    <>
      <div className={`${styles.navbarDiv}`}>
        <Navbar />
      </div>

      <div className={styles.superMainDiv}>
        {/* Background Video */}
        <video autoPlay loop muted className={styles.backgroundVideo}>
          <source src="/static/video/background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className={`${styles.mainDiv}`}>
          <div className={`${styles.typingContainer}`}>
            <h3 className={`${styles.h1Heading}`}>
              <span
                className={`${styles.typedText} ${styles.fontStyle}`}
                data-text='["Your Journey Begins Here! "]'
              ></span>
            </h3>
          </div>
          <div className={`${styles.fixedText}`}>
            <h1>Every Destination Has a Tale</h1>
            <h3>
              Create yours with <span>TravelBliss</span>
            </h3>
          </div>
        </div>

        <div className={styles.tourPackagesSectionMain}>
          <div className={styles.tourPackagesSection}>
            <div className={styles.packagesHeadingContainer}>
              <h2 className={`${styles.sectionHeading} ${styles.fontStyle}`}>
                Explore Tours
              </h2>
            </div>
            <div className={styles.packagesContainer}>
              {packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className={styles.packageCard}
                  onClick={() =>
                    handleTourClick(
                      pkg.state,
                      pkg.type,
                      pkg.name,
                      pkg.banner_image
                    )
                  }
                >
                  <img
                    src={`/static/image/HomePage/${pkg.image}`}
                    alt={pkg.name}
                    className={styles.packageImage}
                  />
                  <h3 className={styles.packageTitle}>{pkg.name}</h3>
                  <p className={styles.packageDescription}>{pkg.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
