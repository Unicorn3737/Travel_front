import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";
import loginImage from "../images/dino.jpg";
export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const nav = useNavigate();
  const { authenticateUser } = useContext(AuthContext);
  async function handleLogin(e) {
    e.preventDefault();
    const userToLogin = {
      email,
      password,
    };
    try {
      const { data } = await axios.post(
        "http://localhost:5005/auth/login",
        userToLogin
      );
      console.log("successful login", data);
      //token
      localStorage.setItem("authToken", data.authToken);
      await authenticateUser();
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
        src={loginImage}
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
      <h3>Log In</h3>
      <form className="loginForm" onSubmit={handleLogin}>
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
              onChange={(e) =>
                setImages(URL.createObjectURL(e.target.files[0]))
              }
            />
            {}
            {image && (
              <img
                src={image}
                alt="Preview"
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            )}
          </label>*/}
        <button>Login</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};
