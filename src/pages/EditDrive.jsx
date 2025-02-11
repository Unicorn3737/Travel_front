import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
          `http://localhost:5005/drive/edit-drive/${driveId}`
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
        `http://localhost:5005/drive/update/${driveId}`,
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
      <h3>Update Drive Page</h3>
      <form onSubmit={handleUpdateDrive}>
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
