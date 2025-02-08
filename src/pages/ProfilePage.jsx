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
            <div key={userDrive.id} className="MyCard">
              <h3>Title:{userDrive.title}</h3>
              <h3>Date:{userDrive.date}</h3>
              <button>Edit</button>
              <button>Delete</button>
            </div>
          );
        })
      )}
      ProfilePage
      <Link to="/all-drives">
        <button>All drives</button>
      </Link>
      <Link to="/drive">
        <button>Create a trip</button>
      </Link>
    </div>
  );
};
