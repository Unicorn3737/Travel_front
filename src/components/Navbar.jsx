import { useContext } from "react";
import { NavLink } from "react-router-dom";
//import { AuthContext } from "../contexts/auth.context";

export const Navbar = () => {
  //const { handleLogout, user } = useContext(AuthContext);
  return (
    <nav>
      <NavLink to="/Drives">All Drives</NavLink>

      <NavLink to="/">Signup</NavLink>
      <NavLink to="/login">Login</NavLink>
    </nav>
  );
};
export default Navbar;
