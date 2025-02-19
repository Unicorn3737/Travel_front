import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/auth.context";
import { Link } from "react-router-dom";
import axios from "axios";
import profileImage from "../images/dino.jpg";
import { API_URL } from "../config/config";
export const ProfilePage = () => {
  const [userDrives, setUserDrives] = useState([]);
  const [joinDrives, setJoinDrives] = useState([]);
  const { user, setUser } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  async function handleProfileImage(event) {
    event.preventDefault();
    try {
      const myFormData = new FormData();
      myFormData.append("imageUrl", event.target.image.files[0]);
      const { data } = await axios.post(
        `${API_URL}/auth/profileImage/${user._id}`,
        myFormData
      );
      console.log("image uploaded successfully", data);
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log(user);
    async function getUserDrives() {
      try {
        const { data } = await axios.get(
          `${API_URL}/drive/user-drives/${user._id}`
        );
        console.log(data);
        setUserDrives(data.Drives);
        setJoinDrives(data.currentUser.trips);
      } catch (err) {
        console.log(err);
      }
    }
    getUserDrives();
  }, []);

  async function handleDelete(driveId) {
    console.log("delete clicked", driveId);
    try {
      const { data } = await axios.delete(`${API_URL}/drive/delete/${driveId}`);
      console.log("successfully deleted", data);
      //update the state to reflect the changes
      const filteredDrives = userDrives.filter((driveInFilter) => {
        if (driveInFilter._id !== driveId) {
          return true;
        }
      });
      setUserDrives(filteredDrives);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {}
      <img
        src={profileImage}
        alt="Full Screen Image"
        style={{
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          position: "absolute",
          top: "0",
          left: "0",
          zIndex: "-1",
        }}
      />
      <h2>Welcome {user.username}</h2>
      <img
        src={user.profileImage}
        alt="Full Screen Image"
        className="userImage"
      />
      <form className="profileForm" onSubmit={handleProfileImage}>
        <label>
          Profile Image:
          <input
            type="file"
            name="image"
            onChange={(e) => setImage(e.target.files)}
          />
        </label>
        <button>Submit</button>
      </form>
      <h3>Your created trips</h3>
      {userDrives.length === 0 ? (
        <p>You don't have any drives</p>
      ) : (
        userDrives.map((userDrive) => {
          return (
            <div key={userDrive._id} className="MyCard">
              <h3>Title:{userDrive.title}</h3>
              <h3>Date:{userDrive.date}</h3>

              <Link to={`/edit-drive/${userDrive._id}`}>
                <button>Edit</button>
              </Link>
              <button
                onClick={() => {
                  handleDelete(userDrive._id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })
      )}
      <h3>Your join trips</h3>
      {joinDrives.length === 0 ? (
        <p>No trips yet</p>
      ) : (
        joinDrives.map((userDrive) => {
          return (
            <div key={userDrive._id} className="MyCard">
              <h3>Title:{userDrive.title}</h3>
              <h3>Date:{userDrive.date}</h3>
            </div>
          );
        })
      )}
      {/*<Link to="/all-drives">
      <button>All drives</button>
    </Link>*/}
      <Link to="/drive">
        <button className="btn-create">Create a trip</button>
      </Link>
    </div>
  );
};
