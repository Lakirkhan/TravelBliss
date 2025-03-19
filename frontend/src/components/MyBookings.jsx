import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../styles/MyBookings.module.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Helmet } from "react-helmet-async";

const MyBookings = () => {
  const { username } = useParams();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cleanedString = username.replace(/^b'|'+$/g, "");
  const decodedUsername = atob(cleanedString);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      // console.log(decodedUsername)
      try {
        const response = await axios.get(
          `http://localhost:8000/api/get_bookings/?username=${decodedUsername}`,
          {
            withCredentials: true,
          }
        );
        // console.log("booking data : "+response.data.bookings)
        setBookings(response.data.bookings);
      } catch (error) {
        setError("Failed to fetch bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);


  if (loading) {
    return <p>Loading...</p>;
  }

  

  return (
    <div className={styles.myBookingsWrapper}>
      <div className={`${styles.navbarDiv}`}>
        <Navbar />
      </div>
      <h2 className={`${styles.heading} ${styles.brodiesFont}`}>
        Your History
      </h2>
      <div className={styles.bookingsContainer}>
        {error && <p className={styles.errorMessage}>{error}</p>}
        {bookings.length > 0 ? (
          <table className={styles.bookingsTable}>
            <thead>
              <tr>
                <th>Package Title</th>
                <th>Tour Highlights</th>
                <th>Duration</th>
                <th>Booking Date & Time</th>
                <th>Family Members</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.package_details.title}</td>
                  <td>{booking.package_details.tour_highlights}</td>
                  <td>
                    {booking.package_details.duration.days}D /{" "}
                    {booking.package_details.duration.nights}N
                  </td>
                  <td>{booking.date}</td>
                  <td>
                    <ul className={styles.familyDetailsList}>
                      {booking.family_members.map((member, index) => (
                        <li key={index}>
                          {member.name} (Age: {member.age})
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No bookings found.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MyBookings;
