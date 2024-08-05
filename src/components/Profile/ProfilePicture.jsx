import React, { useState, useEffect } from "react";
import {
  getProfilePicture,
  uploadProfilePicture,
  deleteProfilePicture,
} from "../../api/ApiService";
import { useAuth } from "../../context/AuthContext";
import Dashboard from "../Dashboard/Dashboard";

const ProfilePicture = () => {
  const { loginUserId } = useAuth();
  const [profilePicture, setProfilePicture] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const response = await getProfilePicture(loginUserId);
        console.log('Profile picture URL:', response.data.profilePictureUrl);
        setProfilePicture(response.data.profilePictureUrl);
      } catch (error) {
        console.error("Error fetching profile picture", error);
        setError("Failed to load profile picture.");
      }
    };

    fetchProfilePicture();
  }, [loginUserId]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const response = await uploadProfilePicture(loginUserId, file);
      console.log('Upload response:', response);
      setProfilePicture(response.data.profilePictureUrl);
    } catch (error) {
      console.error("Error uploading profile picture", error);
      setError("Failed to upload profile picture.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    try {
      await deleteProfilePicture(loginUserId);
      setProfilePicture(null);
    } catch (error) {
      console.error("Error deleting profile picture", error);
      setError("Failed to delete profile picture.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dashboard>
      <h2>Profile Picture</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {profilePicture ? (
        <div>
          <img src={profilePicture} alt="Profile" width={150} height={150} />
          <br />
          <button onClick={handleDelete}>Delete Profile Picture</button>
        </div>
      ) : (
        <p>No profile picture uploaded.</p>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={loading}
      />
    </Dashboard>
  );
};


export default ProfilePicture;
