import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/auth.context";
import { Link } from "react-router-dom";
import axios from "axios";

export const ProfilePage = () => {
  const { userDrives, setUserDrives } = useState([]);
  const { user } = useContext(AuthContext);
  console.log("here the name from the context", user);

  useEffect(() => {
    async function getUserDrives() {
      const { data } = await axios.get("http://localhost:5005/profile");
      console.log(data);
      setUserDrives(data);
    }
    getUserDrives();
  }, []);
  return (
    <div>
      {userDrives.map((userDrive) => {
        return (
          <div key={userDrive._userId} className="MyCard">
            <h3>Title:{userDrive.title}</h3>
            <h3>Date:{userDrive.date}</h3>
          </div>
        );
      })}
      ProfilePage
      <Link to="/all-drives">
        <button>All drives</button>
      </Link>
    </div>
  );
};
