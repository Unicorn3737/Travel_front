import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";
import Logo from "../images/logo.png";

export const Navbar = () => {
  const { handleLogout, user } = useContext(AuthContext);
  //const nav = useNavigate();
  /*function handleLogout() {
    console.log("logging out");
    localStorage.removeItem("authToken");
    nav("/login");
  }*/
  //const { handleLogout, user } = useContext(AuthContext);
  console.log(user);
  return (
    <div>
      <nav>
        <img src={Logo} alt="Logo" />

        {user ? (
          <>
            <NavLink to="/all-drives">All Drives</NavLink>
            <NavLink to="/profile">Profile</NavLink>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <NavLink className="login" to="/">
              Signup
            </NavLink>
            <NavLink className="login" to="/login">
              Login
            </NavLink>
          </>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
