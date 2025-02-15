import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import signupImage from "../images/dino.jpg";
export const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  async function handleSignup(e) {
    e.preventDefault();
    const userToCreate = {
      username: name,
      email,
      password,
    };
    try {
      const { data } = await axios.post(
        "http://localhost:5005/auth/signup",
        userToCreate
      );
      console.log("successful signup up", data);
      nav("/login");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      {}
      <img
        src={signupImage}
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
      <form className="signForm" onSubmit={handleSignup}>
        <label>Username:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {/*<label>
          Profile Image:
          <input
            type="file"
            name="image"
            multiple
            onChange={(e) => setImages(e.target.files)}
          />
        </label>*/}
        <button>Signup</button>
      </form>
    </div>
  );
};
