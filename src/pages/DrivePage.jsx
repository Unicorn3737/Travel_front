import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import driveImage from "../images/nature.jpg";
export const DrivePage = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [days, setDays] = useState("");
  const [transport, setTransport] = useState("car");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);
  const nav = useNavigate();
  async function handleDrive(e) {
    e.preventDefault();
    const userToDrive = {
      title,
      date,
      location,
      days,
      transport,
      phone,
    };
    try {
      const theToken = localStorage.getItem("authToken");
      const { data } = await axios.post(
        "http://localhost:5005/drive/create",
        userToDrive,
        { headers: { authorization: `Bearer ${theToken}` } }
      );
      console.log("successful drive", data);
      //token
      nav("/profile");
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  }
  return (
    <div>
      {}
      <img
        src={driveImage}
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
      <h3>Drive Page</h3>
      <form onSubmit={handleDrive}>
        <label>Title:</label>
        <input
          type="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
        <label>Location:</label>
        <input
          type="location"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        />
        <label>Days:</label>
        <input
          type="days"
          value={days}
          onChange={(e) => {
            setDays(e.target.value);
          }}
        />
        <label>Transport:</label>
        <select
          onChange={(e) => {
            setTransport(e.target.value);
          }}
        >
          <option value="car">car</option>
          <option value="local transport">local transport</option>
        </select>

        <label>Phone:</label>
        <input
          type="phone"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        {
          <label>
            Profile Image:
            <input
              type="file"
              name="image"
              multiple
              onChange={(e) => setImages(e.target.files)}
            />
          </label>
        }
        <button>Trip</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};
