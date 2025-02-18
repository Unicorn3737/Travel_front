import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import editImage from "../images/dino.jpg";
export const EditDrive = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const { driveId } = useParams();

  const nav = useNavigate();

  useEffect(() => {
    async function getOneDrive() {
      try {
        const { data } = await axios.get(
          `${API_URL}5005/drive/edit-drive/${driveId}`
        );
        console.log("here is the one drive on the front", data);
        setTitle(data.title);
        setDate(data.date);
        setLocation(data.location);
      } catch (error) {
        console.log(error);
      }
    }
    getOneDrive();
  }, [driveId]);

  async function handleUpdateDrive(event) {
    event.preventDefault();
    const driveToUpdate = {
      title,
      date,
    };
    try {
      const { data } = await axios.put(
        `${API_URL}5005/drive/update/${driveId}`,
        driveToUpdate
      );
      console.log("successful updating the drive", data);
      nav("/profile");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {}
      <img
        src={editImage}
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
      <h3></h3>
      <form className="editForm" onSubmit={handleUpdateDrive}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </label>
        <label>
          Location
          <input
            type="text"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
        </label>
        <div>
          <label>Drive Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </div>
        <button>Update</button>
      </form>
    </div>
  );
};
