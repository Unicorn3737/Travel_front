import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";

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
    <nav>
      {user ? (
        <>
          <NavLink to="/all-drives">All Drives</NavLink>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <NavLink to="/">Signup</NavLink>
          <NavLink to="/login">Login</NavLink>
        </>
      )}
    </nav>
  );
};

export default Navbar;
