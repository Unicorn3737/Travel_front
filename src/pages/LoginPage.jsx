import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const nav = useNavigate();
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
      nav("/profile");
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  }
  return (
    <div>
      <h3>Login Page</h3>
      <form onSubmit={handleLogin}>
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
        <button>Login</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};
