import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/auth.context";
import { Link } from "react-router-dom";
import axios from "axios";
import profileImage from "../images/nature.jpg";
export const ProfilePage = () => {
  const [userDrives, setUserDrives] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log(user);
    async function getUserDrives() {
      try {
        const { data } = await axios.get(
          `http://localhost:5005/drive/user-drives/${user._id}`
        );
        console.log(data);
        setUserDrives(data);
      } catch (err) {
        console.log(err);
      }
    }
    getUserDrives();
  }, []);

  async function handleDelete(driveId) {
    console.log("delete clicked", driveId);
    try {
      const { data } = await axios.delete(
        "http://localhost:5005/drive/delete/${driveId}"
      );
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
};
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
    <h2>{user.username}'s ProfilePage</h2>
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
    ProfilePage
    {/*<Link to="/all-drives">
      <button>All drives</button>
    </Link>*/}
    <Link to="/drive">
      <button>Create a trip</button>
    </Link>
  </div>
);
