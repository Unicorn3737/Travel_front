import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/auth.context";
import allDrivesImage from "../images/dino.jpg";
import { Link } from "react-router-dom";
import axios from "axios";

export const AllDrivesPage = () => {
  const [allDrives, setAllDrives] = useState([]);
  const { user } = useContext(AuthContext);
  console.log("here all trips", user);
  async function handleJoin(driveId) {
    try {
      const { data } = await axios.get(
        `http://localhost:5005/drive/join/${user._id}/${driveId}`
      );
    } catch (error) {
      console.log(error);
    }
  }
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
      {}
      <img
        src={allDrivesImage}
        alt="Full Screen Image"
        style={{
          width: "100vw",
          height: "150vh",
          objectFit: "cover",
          position: "absolute",
          top: "0",
          left: "0",
          zIndex: "-1",
        }}
      />
      {allDrives.map((oneDrive) => {
        return (
          <div key={oneDrive._id} className="Card">
            <h3>Title:{oneDrive.title}</h3>
            <h3>Date:{oneDrive.date}</h3>
            <h3>Owner:{oneDrive.owner.username}</h3>
            <button
              onClick={() => {
                handleJoin(oneDrive._id);
              }}
            >
              Join
            </button>
            <Link to={`/details/${oneDrive._id}`}>
              <button>Details</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
