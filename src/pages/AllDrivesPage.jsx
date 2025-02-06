import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/auth.context";

import { Link } from "react-router-dom";
import axios from "axios";

export const AllDrivesPage = () => {
  const [allDrives, setAllDrives] = useState([]);
  const { user } = useContext(AuthContext);
  console.log("here all trips", user);

  useEffect(() => {
    async function getAllDrives() {
      const { data } = await axios.get(
        "http://localhost:5005/drive/all-drives"
      );
      console.log(data);
      setAllDrives(data);
    }
    getAllDrives();
  }, []);
  return (
    <div>
      {allDrives.map((oneDrive) => {
        return (
          <div key={oneDrive._id} className="Card">
            <h3>Title:{oneDrive.title}</h3>
            <h3>Date:{oneDrive.date}</h3>
            <h3>Owner:{oneDrive.owner.username}</h3>
          </div>
        );
      })}
    </div>
  );
};
