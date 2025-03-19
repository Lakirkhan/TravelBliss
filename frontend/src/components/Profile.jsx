import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../styles/Profile.module.css";
import Navbar from "./Navbar";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [editProfile, setEditProfile] = useState({
    name: "",
    email: "",
    area: "",
    city: "",
    state: "",
    country: "",
    contact_no: "",
    profile_photo: "",
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [activeSection, setActiveSection] = useState("profile-data");
  const [navbarColor, setNavbarColor] = useState("transparent");
  const [validationErrors, setValidationErrors] = useState({});

  const { username } = useParams();
  const cleanedString = username.replace(/^b'|'+$/g, "");
  const decodedUsername = atob(cleanedString);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios
        .get(
          `http://localhost:8000/api/get_profile/?username=${decodedUsername}`
        )
        .then((response) => {
          const userProfile = response.data.user;
          setProfile(userProfile);
          const isProfileEmpty =
            !userProfile.name &&
            !userProfile.email &&
            !userProfile.area &&
            !userProfile.city &&
            !userProfile.state &&
            !userProfile.country &&
            !userProfile.contact_no &&
            !userProfile.profile_photo;

          setIsEditing(isProfileEmpty);
        })
        .catch((error) => {
          setError(
            "Error fetching profile: " +
              (error.response ? error.response.data.error : error.message)
          );
        });
    } catch (error) {
      setError("Error decoding username: " + error.message);
    }
  }, [decodedUsername]);

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!emailRegex.test(editProfile.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!phoneRegex.test(editProfile.contact_no)) {
      errors.contact_no = "Please enter a valid 10-digit contact number.";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditProfile({
        name: profile.name || "",
        email: profile.email || "",
        area: profile.area || "",
        city: profile.city || "",
        state: profile.state || "",
        country: profile.country || "",
        contact_no: profile.contact_no || "",
        profile_photo: profile.profile_photo || "",
      });
    }
  };

  const handlePasswordChangeToggle = () => {
    setIsChangingPassword(!isChangingPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProfile({
      ...editProfile,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append("username", profile.username);
    formData.append("name", editProfile.name);
    formData.append("email", editProfile.email);
    formData.append("area", editProfile.area);
    formData.append("city", editProfile.city);
    formData.append("state", editProfile.state);
    formData.append("country", editProfile.country);
    formData.append("contact_no", editProfile.contact_no);
    if (photoFile) {
      formData.append("profile_photo", photoFile);
    }

    axios
      .post("http://localhost:8000/api/update-profile/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((response) => {
        setProfile(response.data.user);
        setIsEditing(false);

        const newEncodedUsername = btoa(response.data.user.username);
        navigate(`/profile/${newEncodedUsername}`);
      })
      .catch((error) => {
        setError("Error updating profile: " + error.message);
      });
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    axios
      .post("http://localhost:8000/api/change-password/", {
        username: profile.username,
        current_password: currentPassword,
        new_password: newPassword,
      })
      .then((response) => {
        if (response.status === 200) {
          setIsChangingPassword(false);
        } else {
          setError(response.data.error);
        }
      })
      .catch((error) => {
        setError("Error: " + error.message);
      });
  };

  const handleSectionClick = (section) => {
    setActiveSection(section);
    if (section === "change-password") {
      setIsChangingPassword(true);
    } else {
      setIsChangingPassword(false);
    }
  };

  const handleLogout = () => {
    navigate("/");
    window.location.reload();
  };

  const handleAddProfile = () => {
    setIsEditing(true);
    setActiveSection("profile-data");
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div
        className={`${styles.navbarDiv}`}
        // style={{ backgroundColor: navbarColor }}
      >
        <Navbar />
      </div>

      <div className={`${styles.sidebar}`}>
        <div className={styles.fullWidthProfilePhotoSection}>
          <div className={styles.fullWidthProfilePhotoContainer}>
            <img
              src={"/static/image/profilephoto/shincan.jpg"}
              alt={`/static/image/profilephoto/${profile.profile_photo}`}
              className={styles.fullWidthProfilePhoto}
            />
            <p className={styles.username}>{profile.name}</p>
          </div>
        </div>
        <div className={styles.subnavbar}>
          <div
            className={`${
              activeSection === "profile-data" ? styles.active : ""
            } ${styles.innerSubnavbar}`}
            onClick={() => handleSectionClick("profile-data")}
          >
            <i className="fa-solid fa-user"></i> Profile Details
          </div>
          <div
            className={`${
              activeSection === "change-password" ? styles.active : ""
            }  ${styles.innerSubnavbar}`}
            onClick={() => handleSectionClick("change-password")}
          >
            <i className="fa-solid fa-key"></i> Change Password
          </div>
        </div>
      </div>
      <div className={`${styles.profileBody} ${styles.fontStyle}`}>
        <div className={styles.outercontainer}>
          <div className={styles.container}>
            <div className={styles.content}>
              {activeSection === "profile-data" && (
                <div
                  className={`${styles.profileSection} ${styles.profileDetailsContainer}`}
                >
                  <div className={`${styles.profileDetailsSection}`}>
                    {isEditing ? (
                      <div className={styles.profileInputs}>
                        <input
                          type="text"
                          name="name"
                          value={editProfile.name}
                          onChange={handleInputChange}
                          placeholder="Name"
                        />
                        <input
                          type="email"
                          name="email"
                          value={editProfile.email}
                          onChange={handleInputChange}
                          placeholder="Email"
                        />
                        {validationErrors.email && (
                          <p className={styles.validationError}>
                            {validationErrors.email}
                          </p>
                        )}
                        <input
                          type="text"
                          name="area"
                          value={editProfile.area}
                          onChange={handleInputChange}
                          placeholder="Area"
                        />
                        <input
                          type="text"
                          name="city"
                          value={editProfile.city}
                          onChange={handleInputChange}
                          placeholder="City"
                        />
                        <input
                          type="text"
                          name="state"
                          value={editProfile.state}
                          onChange={handleInputChange}
                          placeholder="State"
                        />
                        <input
                          type="text"
                          name="country"
                          value={editProfile.country}
                          onChange={handleInputChange}
                          placeholder="Country"
                        />
                        <input
                          type="text"
                          name="contact_no"
                          value={editProfile.contact_no}
                          onChange={handleInputChange}
                          placeholder="Contact Number"
                        />
                        {validationErrors.contact_no && (
                          <p className={styles.validationError}>
                            {validationErrors.contact_no}
                          </p>
                        )}
                        <input
                          type="file"
                          name="profile_photo"
                          onChange={handleFileChange}
                        />
                        <div className={`${styles.buttonsDiv}`}>
                          <button
                            className={`${styles.saveButton} ${styles.fontStyle}`}
                            onClick={handleSave}
                          >
                            Save
                          </button>
                          <button
                            className={`${styles.cancelButton} ${styles.fontStyle}`}
                            onClick={handleEditToggle}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className={`${styles.profileInfo}`}>
                        <p>
                          <strong>Name:</strong> {profile.name}
                        </p>
                        <p>
                          <strong>Email:</strong> {profile.email}
                        </p>
                        <p>
                          <strong>Area:</strong> {profile.area}
                        </p>
                        <p>
                          <strong>City:</strong> {profile.city}
                        </p>
                        <p>
                          <strong>State:</strong> {profile.state}
                        </p>
                        <p>
                          <strong>Country:</strong> {profile.country}
                        </p>
                        <p>
                          <strong>Contact Number:</strong> {profile.contact_no}
                        </p>
                        <div className={`${styles.buttonsDiv}`}>
                          <button
                            className={`${styles.editButton} ${styles.fontStyle}`}
                            onClick={handleEditToggle}
                          >
                            Edit Profile
                          </button>
                          <button
                            className={`${styles.logoutButton} ${styles.fontStyle}`}
                            onClick={handleLogout}
                          >
                            Log Out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeSection === "change-password" && isChangingPassword && (
                <div
                  className={`${styles.passwordSection} ${styles.skyBlueTheme}`}
                >
                  <div className={`${styles.changePasswordSection}`}>
                    <img
                      src="/static/image/profilephoto/password1.jpg" // Replace with your image path
                      alt="Change Password"
                      className={styles.changePasswordImage}
                    />
                    <div className={styles.inputContainer}>
                      <input
                        type="password"
                        name="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Current Password"
                      />
                      <input
                        type="password"
                        name="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New Password"
                      />
                      <input
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm New Password"
                      />
                      <button
                        className={`${styles.changePassButton} ${styles.fontStyle}`}
                        onClick={handleChangePassword}
                      >
                        Change Password
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
