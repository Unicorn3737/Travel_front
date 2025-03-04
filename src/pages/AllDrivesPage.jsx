import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/auth.context";
import allDrivesImage from "../images/dino.jpg";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../config/config";
import axios from "axios";

export const AllDrivesPage = () => {
  const [allDrives, setAllDrives] = useState([]);
  const [join, setJoin] = useState(false);
  const { user } = useContext(AuthContext);
  const nav = useNavigate();
  console.log("here all trips", user);
  async function handleJoin(driveId) {
    try {
      const { data } = await axios.get(
        `${API_URL}/drive/join/${user._id}/${driveId}`
      );
      console.log(data);
      setJoin(true);
      setTimeout(() => {
        nav("/profile");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    async function getAllDrives() {
      const { data } = await axios.get(`${API_URL}/drive/all-drives`);
      console.log(data);
      setAllDrives(data);
    }
    getAllDrives();
  }, []);
  return (
    <div>
      {join && <p>Nice choice!</p>}
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
