import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const DrivePage = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [days, setDays] = useState("");
  const [transport, setTransport] = useState("");
  const [phone, setPhone] = useState("");
  const [owner, setOwner] = useState("");
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
      owner,
    };
    try {
      const { data } = await axios.post(
        "http://localhost:5005/drive",
        userToDrive
      );
      console.log("successful drive", data);
      //token
      localStorage.setItem("authToken", data.authToken);
      nav("/drive");
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  }
  return (
    <div>
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
        <input
          type="transport"
          value={transport}
          onChange={(e) => {
            setTransport(e.target.value);
          }}
        />
        <label>Phone:</label>
        <input
          type="phone"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <label>Owner:</label>
        <input
          type="owner"
          value={owner}
          onChange={(e) => {
            setOwner(e.target.value);
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
